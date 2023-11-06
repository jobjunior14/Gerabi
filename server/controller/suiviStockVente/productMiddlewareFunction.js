const catchAssynch = require(`../../utils/catchAssynch.js`);
const AppError = require(`../../utils/appError.js`);
const { request } = require("express");

function loopingData(array, year, month, day) {

  let dayData = [];
  let id = [];

  for (let i of array) {
    for (let j of i.data) {
      //check if the year is true of false
      if (j.annee === year) {
        for (let o of j.data) {
          //cheking of the month
          if (o.mois === month) {
            for (let p of o.data) {
              //cheking of the day
              if (Number(JSON.stringify(p.createdAt).slice(9, 11)) === day) {
                //then push the product id in a array if there is a correspondance in (it's true every where)
                id.push(i._id);
                p.name = i.name;
                dayData.push(p);
              }
            }
          }
        }
      }
    }
  }

  return { id: id, day: dayData };
};

exports.getCollection = async (collection, request, response) =>{

  const data = await collection.find();


  response.status(200).json({

    status: 'success',
    data: loopingData(data , Number (request.params.year), Number (request.params.month), Number (request.params.day))
  }); 
};

exports.pushDataCollection = catchAssynch (async (request, collection, response ) => {

  //data  from collection
  const collectionData = await collection.find();

  //body's request
  const body = request.body;

  //current date
  const year = Number (request.query.year);
  const month = Number (request.query.month);
  const day = Number (request.query.day);

  //storing the looping data in a variabe
  const dataBralima = [];

  if (collectionData.length > 0) {
    for (let o = 0; o < body.length; o++) {

      //check the index of name's product
      const indexMainName = collectionData.findIndex( el => el.name.toUpperCase() === body[o].name.toUpperCase());
      
      //if the index exist
      if ( indexMainName !== -1 ) {
        
        const el1 = collectionData[indexMainName].data.length - 1;
        const el2 = collectionData[indexMainName].data[el1].data.length - 1;
        const el3 = collectionData[indexMainName].data[el1].data[el2].data.length - 1;
        
        ///////////////////////////// stats For every data/////////////////////////////////////////

        const yearindex = collectionData[indexMainName].data.findIndex(el => el.annee === year );

        if (yearindex !== -1) {
          const monthindex = collectionData[indexMainName].data[yearindex].data.findIndex( el => el.mois === month );

          if (monthindex !== -1) {
            //verify if the data exist or not coz we cant push many data with the same day information
            const dayIndex =  collectionData[indexMainName].data[yearindex].data[monthindex].data.findIndex( el => Number(JSON.stringify(el.createdAt).slice(9, 11)) === day);

            if (dayIndex === -1){
              
              collectionData[indexMainName].data[yearindex].data[monthindex].data.push( body[o].data.data.data );
            } 
            
          } else {

            collectionData[indexMainName].data[yearindex].data.push({

              mois: month,
              data: { ...body[o].data.data.data, name: collectionData[indexMainName].name },

            });
          }
        } else {
          collectionData[indexMainName].data.push({

            annee: year,
            data: {
              mois: month,
              data: { ...body[o].data.data.data, name: collectionData[indexMainName].name },
            },

          });
        }

        //saving the data in the server so we can work with the new data ///////////////////////////
        await collectionData[indexMainName].save();

        const index1 =  collectionData[indexMainName].stats.findIndex( el => el.annee === year );

        ///Statistics
        if (index1 !== -1) {

          const index2 =  collectionData[indexMainName].stats[index1].data.findIndex(el => el.mois === Number(new Date().toLocaleDateString().slice(3, 5)) );

          if (index2 !== -1) {
            ////////////searching suivi's index data /////////////////////

            for (let i = 1; i <= 14; i++) {
              if ( collectionData[indexMainName].data[el1].data[el2].data[el3][`suivi${i}`]["name"] !== ""){

                const indexDataSuivi1 = collectionData[indexMainName].suiviApprovisionnement[index1].data[index2].data.findIndex( el => el.name.toUpperCase() === collectionData[indexMainName].data[el1].data[el2].data[el3][`suivi${i}`]["name"].toUpperCase());

                if (indexDataSuivi1 !== -1) {

                  collectionData[indexMainName].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                    name: collectionData[indexMainName].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                    valeur: Number(collectionData[indexMainName].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (collectionData[indexMainName].data[el1].data[el2].data[el3][`suivi${i}`]["valeur"]),

                  };

                } else {

                  collectionData[indexMainName].suiviApprovisionnement[index1].data[index2].data.push({

                    name: collectionData[indexMainName].data[el1].data[el2].data[el3][`suivi${i}`]["name"],
                    valeur: Number( collectionData[indexMainName].data[el1].data[el2].data[el3][`suivi${i}`]["valeur"]),

                  });
                };
              };
            };

            ///stats //////////
            const statsObj = {

              name: collectionData[indexMainName].name,
              mois: collectionData[indexMainName].stats[index1].data[index2].mois,
              vente_bar: Number(collectionData[indexMainName].stats[index1].data[index2].vente_bar) + Number( collectionData[indexMainName].data[el1].data[el2].data[el3].vente_journaliere.valeur),
              approvionnement: Number(collectionData[indexMainName].stats[index1].data[index2].approvionnement) + Number(collectionData[indexMainName].data[el1].data[el2].data[el3].benefice_sur_achat.val_gros_approvisionnement),
              benefice: Number(collectionData[indexMainName].stats[index1].data[index2].benefice) + Number( collectionData[indexMainName].data[el1].data[el2].data[el3].benefice_sur_vente),
               
            };

            collectionData[indexMainName].stats[index1].data[index2] = statsObj;

          } else {
            //////////////////////////////////////////////////suiviAppro
            for (let i = 1; i <= 15; i++) {

              if (collectionData[indexMainName].data[el1].data[el2].data[el3][`suivi${i}`]["name"] !== "") {

                collectionData[indexMainName].suiviApprovisionnement[index1].data.push({

                  mois: Number(new Date().toLocaleDateString().slice(3, 5)),
                  data: [
                    {
                      name: collectionData[indexMainName].data[el1].data[el2].data[el3][`suivi${i}`]["name"],
                      valeur: Number( collectionData[indexMainName].data[el1].data[el2].data[el3][`suivi${i}`]["valeur"]

                      ),
                    },
                  ],
                });
              };
            };

            /////stats///////////////////////
            const statsObj = {
              name: collectionData[indexMainName].name,
              mois: Number(new Date().toLocaleDateString().slice(3, 5)),
              vente_bar: Number( collectionData[indexMainName].data[el1].data[el2].data[el3].vente_journaliere.valeur),
              approvionnement: Number( collectionData[indexMainName].data[el1].data[el2].data[el3].benefice_sur_achat.val_gros_approvisionnement),
              benefice: Number( collectionData[indexMainName].data[el1].data[el2].data[el3].benefice_sur_vente),

            };

            collectionData[indexMainName].stats[index1].data.push(statsObj);

          };
        } else {
          //////suiviAppro
          for (let i = 1; i <= 14; i++) {

            if ( collectionData[indexMainName].data[el1].data[el2].data[el3][`suivi${i}`]["name"] !== "") {

              collectionData[indexMainName].suiviApprovisionnement.push({

                annee: year,
                data: [
                  {
                    mois: month,
                    data: [
                      {
                        name: collectionData[indexMainName].data[el1].data[el2].data[el3][`suivi${i}`]["name"],
                        valeur: Number( collectionData[indexMainName].data[el1].data[el2].data[el3][`suivi${i}`]["valeur"]),

                      },
                    ],
                  },
                ],
              });
            }
          }

          /////////stats/////////////////////////////
          const statsObj = {
            annee: year,
            data: [
              {
                name: collectionData[indexMainName].name,
                mois: Number(new Date().toLocaleDateString().slice(3, 5)),
                vente_bar: Number(collectionData[indexMainName].data[el1].data[el2].data[el3].vente_journaliere.valeur),
                approvionnement: Number(collectionData[indexMainName].data[el1].data[el2].data[el3].benefice_sur_achat.val_gros_approvisionnement),
                benefice: Number( collectionData[indexMainName].data[el1].data[el2].data[el3].benefice_sur_vente),

              },
            ],
          };

          collectionData[indexMainName].stats.push(statsObj);
        }

        dataBralima.push(collectionData[indexMainName]);
        await collectionData[indexMainName].save();

      } else {
        /////If the name that we push don't match with no one else///////////
        ////////We creat It//////////////////////////////////and must be different to ""

        if (body[o].name !== "") {

          const newBralimaData = await collection.create(body[o]);
  
          //initialize the stats object and doing some calcul
          const statsObj = {
            annee: year,
            data: [
              {
                name: body[o].name,
                mois: month,
  
                //working with the last data created in this product
                vente_bar: Number( newBralimaData.data[0].data[0].data[0].vente_journaliere.valeur),
                approvionnement: Number( newBralimaData.data[0].data[0].data[0].benefice_sur_achat.val_gros_approvisionnement),
                benefice: Number( newBralimaData.data[0].data[0].data[0].benefice_sur_vente),
  
              },
            ],
          };
  
          ///////////////////////////////////////////pushing data in our suivi Object
  
          for (let i = 1; i <= 14; i++) {
            if ( newBralimaData.data[0].data[0].data[0][`suivi${i}`][`name`] !== "") {
  
              newBralimaData.suiviApprovisionnement.push({
  
                annee: year,
                data: [
                  {
                    mois: month,
                    data: [
                      {
                        name: newBralimaData.data[0].data[0].data[0][`suivi${i}`]["name"],
                        valeur: Number( newBralimaData.data[0].data[0].data[0][`suivi${i}`]["valeur"]),
  
                      },
                    ],
                  },
                ],
              });
            }
          }
  
          //then save again the data
          newBralimaData.stats.push(statsObj);
          dataBralima.push(newBralimaData);
          await newBralimaData.save();
        };
      }
    }; 

    response.status(200).json({
      status: 'success',
      data: loopingData(dataBralima, year,month, day),
    });

  } else {
    /////////else the Data base is completely empty///////////////////

    // initiaze the array of data
    //i didn't creat many data and save it once coz i need to work with every product apart
    //and as a response we need to send all the data
    const createadData = [];

    for (let o of body) {

      if ( o.name !== "") {

        const newBralimaData = await collection.create(o);
  
        //pushing the stats of every name in our Suivi Object
        for (let i = 1; i <= 14; i++) {
          if ( newBralimaData.data[0].data[0].data[0][`suivi${i}`]["name"] !== "") {
  
            newBralimaData.suiviApprovisionnement.push({
  
              annee: year,
              data: [
                {
                  mois: month,
                  data: [
                    {
                      name: newBralimaData.data[0].data[0].data[0][`suivi${i}`]["name"],
                      valeur: Number( newBralimaData.data[0].data[0].data[0][`suivi${i}`]["valeur"]),
                    },
                  ],
                },
              ],
            });
          };
        };
  
        //initialize the stats object and doing some calcul
        const statsObj = {
          annee: year,
          data: [
            {
              name: o.name,
              mois: month,
  
              //working with the last data created in this product
              vente_bar: Number( newBralimaData.data[0].data[0].data[0].vente_journaliere.valeur),
              approvionnement: Number( newBralimaData.data[0].data[0 ].data[0].benefice_sur_achat.val_gros_approvisionnement),
              benefice: Number( newBralimaData.data[0].data[0].data[newBralimaData.data[0].data[0 ].data.length - 1].benefice_sur_vente),
            },
          ],
        };
  
        newBralimaData.stats.push(statsObj);
        createadData.push(newBralimaData);
        await newBralimaData.save();
      };
    }

    // then the response ....
    response.status(200).json({
      status: 'success',
      data: loopingData(createadData,  year,  month, day)
    });

}});

exports.updateDataCollection = catchAssynch (async (collection, request, response ) => {

  //send the error to the client 
  function ErrorResponse(){

    response.status(404).json({
      status: "faild",
      message: "Cette donnée est inexistante, veillez tapez une autre date"
    });

  };

  const updatedDocument = [];

  const year = Number (request.params.year);
  const month = Number (request.params.month);
  const day = Number (request.params.day);


  for (let i = 0; i < request.body.id.length; i++) {

    const collectionData = await collection.findById(request.body.id[i]);

    const yearIndex = collectionData.data.findIndex( el => el.annee === year);
    
    if (yearIndex !== -1) {
      
      const monthIndex = collectionData.data[yearIndex].data.findIndex( el => el.mois === month);
      
      if (monthIndex !== -1) {
        //indexof it's an index of our data (suivi stock)
        const indexof = collectionData.data[yearIndex].data[monthIndex].data.findIndex( el => Number(JSON.stringify(el.createdAt).slice(9, 11)) === day);

        //index1 it's an index of year in stats
        const index1 = collectionData.stats.findIndex( el => el.annee === year);

        if (indexof !== -1 && index1 !== -1) {
          //Month index Stats
          const index2 = collectionData.stats[index1].data.findIndex( el => el.mois === month);

          ////array to store all suivi data
          const suiviObj = [];
          ///////suivi////////////////
          for (let i = 1; i <= 14; i++) {

            const indexSuivi = collectionData.suiviApprovisionnement[index1].data[index2].data.findIndex( el => el.name === collectionData.data[yearIndex].data[monthIndex].data[indexof][`suivi${i}`]["name"]);

            if (indexSuivi !== -1) {

              suiviObj.push({

                name: collectionData.data[yearIndex].data[monthIndex].data[indexof][`suivi${i}`]["name"],
                valeur: Number( collectionData.suiviApprovisionnement[index1].data[index2].data[indexSuivi].valeur) - Number( collectionData.data[yearIndex].data[monthIndex].data[indexof][`suivi${i}`]["valeur"]),});

              } else {

              suiviObj.push({
                name: "",
                valeur: 0,
              });
            };
          };

          if (index2 !== -1) {
            ////////stats/////////////////////////
            const statsObj1 = {

              name: collectionData.name,
              mois: collectionData.stats[index1].data[index2].mois,
              vente_bar: Number(collectionData.stats[index1].data[index2].vente_bar) - Number( collectionData.data[yearIndex].data[monthIndex].data[indexof].vente_journaliere.valeur),
              approvionnement: Number(collectionData.stats[index1].data[index2].approvionnement) - Number( collectionData.data[yearIndex].data[monthIndex].data[indexof].benefice_sur_achat.val_gros_approvisionnement),
              benefice: Number(collectionData.stats[index1].data[index2].benefice) - Number( collectionData.data[yearIndex].data[monthIndex].data[indexof].benefice_sur_vente),

            };

            collectionData.data[yearIndex].data[monthIndex].data[indexof] = {
              ...request.body.data[i].data.data.data,
              createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
            };

            await collectionData.save();

            ///////suivi //////////////////
            for (let i = 1; i <= 14; i++) {

              const indexSuivi = collectionData.suiviApprovisionnement[index1].data[index2].data.findIndex( el => el.name.toUpperCase() === collectionData.data[yearIndex].data[monthIndex].data[indexof][`suivi${i}`]["name"].toUpperCase());

              if (indexSuivi !== -1) {

                collectionData.suiviApprovisionnement[index1].data[index2].data[indexSuivi] = {

                  name: collectionData.data[yearIndex].data[monthIndex].data[indexof][`suivi${i}`]["name"],
                  valeur: Number( collectionData.data[yearIndex].data[monthIndex].data[indexof][`suivi${i}`]["valeur"]) + suiviObj[i].valeur,

                };
              }
            }

            //////stats////////////////////////
            const statsObj2 = {
              name: collectionData.name,
              mois: statsObj1.mois,
              vente_bar: Number( collectionData.data[yearIndex].data[monthIndex].data[indexof].vente_journaliere.valeur) + Number(statsObj1.vente_bar),
              approvionnement: Number( collectionData.data[yearIndex].data[monthIndex].data[indexof].benefice_sur_achat.val_gros_approvisionnement) + Number(statsObj1.approvionnement),
              benefice: Number( collectionData.data[yearIndex].data[monthIndex].data[indexof].benefice_sur_vente) + Number(statsObj1.benefice),

            };

            collectionData.stats[index1].data[index2] = statsObj2;
            await collectionData.save();

          } else {
            
            return ErrorResponse();
          };
        } else {
          
         return ErrorResponse();
        };
      } else {
        
       return ErrorResponse();
      };

    } else {
      
      return ErrorResponse();
    };

    updatedDocument.push(collectionData);
  };


  //if there is no error send the response
  response.status(200).json({

    status: "success",
    data: loopingData( updatedDocument, year, month, day ),

  });

});

//the last created data 
exports.lastCreatedData = catchAssynch (async (collection, request, response) => {

  //data from collection
  const collectionData = await collection.find();
  
  if (collectionData.length > 0) {
    const lastCreatedData = [];
    for (let i = 0; i < collectionData.length; i++) {
      
      const el1 = collectionData[i].data.length - 1;
      const el2 = collectionData[i].data[el1].data.length - 1;
      const el3 = collectionData[i].data[el1].data[el2].data.length - 1;
      const data = collectionData[i].data[el1].data[el2].data[el3];
      data.name = collectionData[i].name;
      lastCreatedData.push (data);
    };
  
    
    response.status(200).json({
      status: 'success',
      data: lastCreatedData
    })
  } else {

    response.status(200).json ({
      status: 'success',
      data: null
    })
  }

});

exports.stastAutreCollection = catchAssynch (async (collection, request, response) => {

  const year = Number(request.params.year);
  const mois = Number(request.params.month);

  let stats = await collection.aggregate([
    {
      $project: {
        stats: {
          $filter: {
            input: "$stats",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.annee", year] },
                { $lte: ["$$data.annee", year] },
              ],
            },
          },
        },
      },
    },

    {
      $unwind: { path: "$stats" },
    },

    {
      $project: {
        stats: {
          $filter: {
            input: "$stats.data",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.mois", mois] },
                { $lte: ["$$data.mois", mois] },
              ],
            },
          },
        },
      },
    },
  ]);

  response.status(200).json({
    status: "success",
    stats: {
      stats,
    },
  });
});

exports.AllProductStatsCollection = catchAssynch( async (collection, request, response) => {

  const year = Number(request.params.year);
  const mois = Number(request.params.month);

  let stats = await collection.aggregate([
    {
      $project: {
        stats: {
          $filter: {
            input: "$stats",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.annee", year] },
                { $lte: ["$$data.annee", year] },
              ],
            },
          },
        },
      },
    },

    {
      $unwind: { path: "$stats" },
    },

    {
      $project: {
        stats: {
          $filter: {
            input: "$stats.data",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.mois", mois] },
                { $lte: ["$$data.mois", mois] },
              ],
            },
          },
        },
      },
    },

    {
      $unwind: { path: "$stats" },
    },

    {
      $group: {
        _id: { mois: "$stats.mois" },
        vente_bar: { $sum: "$stats.vente_bar" },
        approvionnement: { $sum: "$stats.approvionnement" },
        benefice: { $sum: "$stats.benefice" },
      },
    },
  ]);

  response.status(200).json({
    status: "success",
    stats: {
      stats,
    },
  });

});

exports.suiviAllStatsCollection = catchAssynch (async (collection, request, response) => {

  const year = Number(request.params.year);
  const mois = Number(request.params.month);

  const stats = await collection.aggregate([
    {
      $project: {
        suivi: {
          $filter: {
            input: "$suiviApprovisionnement",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.annee", year] },
                { $lte: ["$$data.annee", year] },
              ],
            },
          },
        },
      },
    },

    {
      $unwind: { path: "$suivi" },
    },

    {
      $project: {
        suivi: {
          $filter: {
            input: "$suivi.data",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.mois", mois] },
                { $lte: ["$$data.mois", mois] },
              ],
            },
          },
        },
      },
    },

    {
      $unwind: { path: "$suivi" },
    },

    {
      $unwind: { path: "$suivi.data" },
    },

    {
      $group: {
        _id: null,
        valeur: { $sum: "$suivi.data.valeur" },
      },
    },
  ]);

  response.status(200).json({
    status: "Success",
    stats: {
      stats,
    },
  });

});

exports.suiviDetailStatsCollection = catchAssynch (async ( collection, request, response) =>{

   const year = Number(request.params.year);
  const mois = Number(request.params.month);

  const stats = await collection.aggregate([
    {
      $project: {
        suivi: {
          $filter: {
            input: "$suiviApprovisionnement",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.annee", year] },
                { $lte: ["$$data.annee", year] },
              ],
            },
          },
        },
      },
    },

    {
      $unwind: { path: "$suivi" },
    },

    {
      $project: {
        suivi: {
          $filter: {
            input: "$suivi.data",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.mois", mois] },
                { $lte: ["$$data.mois", mois] },
              ],
            },
          },
        },
      },
    },

    {
      $unwind: { path: "$suivi" },
    },

    {
      $unwind: { path: "$suivi.data" },
    },

    {
      $group: {
        _id: { name: { $toUpper: "$suivi.data.name" }, mois: "$suivi.mois" },
        valeur: { $sum: `$suivi.data.valeur` },
      },
    },
  ]);

  response.status(200).json({
    status: "Success",
    stats: {
      stats,
    },
  });

});

exports.yearStatsCollection = catchAssynch (async (collection, request, response) => {

  const year = Number(request.params.year);

  const stats = await collection.aggregate([
    {
      $project: {
        stats: {
          $filter: {
            input: "$stats",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.annee", year] },
                { $lte: ["$$data.annee", year] },
              ],
            },
          },
        },
      },
    },

    {
      $unwind: { path: "$stats" },
    },

    {
      $unwind: { path: "$stats.data" },
    },

    {
      $group: {
        _id: { mois: "$stats.data.mois" },
        vente_bar: { $sum: "$stats.data.vente_bar" },
        approvionnement: { $sum: "$stats.data.approvionnement" },
        benefice: { $sum: "$stats.data.benefice" },
      },
    },
  ]);

  response.status(200).json({
    status: "success",
    stats: {
      stats,
    },
  });

});


