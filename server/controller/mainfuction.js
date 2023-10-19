const catchAssynch = require(`${__dirname}/../utils/catchAssynch.js`);


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

exports.getCollection = (year, month, day, collection) =>{

    return loopingData(collection, year, month, day);
};

exports.pushDataCollection = catchAssynch (async (body, AutreProduit, next) => {
  //first we need all data
  const bralima = await AutreProduit.find();
  //loop of the request Body(All data )
  const dataBralima = [];

  if (bralima.length > 0) {
    for (let o = 0; o < body.length; o++) {
      //have to check if new data was adding or not by checking the name
      if (bralima[o].name.toUpperCase() === body[o].name.toUpperCase()) {
        ///////////////////////////// stats For every data/////////////////////////////////////////

        const yearindex = await bralima[o].data.findIndex(
          (el) => el.annee === Number(new Date().getFullYear())
        );

        if (yearindex !== -1) {
          const monthindex = await bralima[o].data[yearindex].data.findIndex( el => el.mois === Number(new Date().getMonth() + 1) );

          if (monthindex !== -1) {
            //verify if the data exist or not coz we cant push many data with the same day information
            const dayIndex = await bralima[o].data[yearindex].data[monthindex].data.findIndex( el => Number(JSON.stringify(el.createdAt).slice(9, 11)) ===Number(new Date().getDate()));

            if (dayIndex === -1) bralima[o].data[yearindex].data[monthindex].data.push( body[o].data.data.data );
            
          } else {

            bralima[o].data[yearindex].data.push({

              mois: Number(new Date().getMonth() + 1),
              data: { ...body[o].data.data.data, name: bralima[o].name },

            });
          }
        } else {
          bralima[o].data.push({

            annee: Number(new Date().getFullYear()),
            data: {
              mois: Number(new Date().getMonth() + 1),
              data: { ...body[o].data.data.data, name: bralima[o].name },
            },

          });
        }

        //saving the data in the server so we can work with the new data ///////////////////////////
        await bralima[o].save();

        const index1 = await bralima[o].stats.findIndex( el => el.annee === Number(new Date().getFullYear()) );

        ///Statistics
        if (index1 !== -1) {

          const index2 = await bralima[o].stats[index1].data.findIndex(el => el.mois === Number(new Date().toLocaleDateString().slice(3, 5)) );

          if (index2 !== -1) {
            ////////////searching suivi's index data /////////////////////

            for (let i = 1; i <= 14; i++) {
              if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data.length - 1][`suivi${i}`]["name"] !== ""){

                const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex( el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data.length - 1][`suivi${i}`]["name"].toUpperCase());

                if (indexDataSuivi1 !== -1) {

                  bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                    valeur: Number(bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data.length - 1][`suivi${i}`]["valeur"]),

                  };

                } else {

                  bralima[o].suiviApprovisionnement[index1].data[index2].data.push({

                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data.length - 1][`suivi${i}`]["name"],
                    valeur: Number( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data.length - 1][`suivi${i}`]["valeur"]),

                  });
                };
              };
            };

            ///stats //////////
            const statsObj = {

              name: bralima[o].name,
              mois: bralima[o].stats[index1].data[index2].mois,
              vente_bar: Number(bralima[o].stats[index1].data[index2].vente_bar) + Number( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length ].data.length - 1].vente_journaliere.valeur),
              approvionnement: Number(bralima[o].stats[index1].data[index2].approvionnement) + Number(bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length - 1].benefice_sur_achat.val_gros_approvisionnement),
              benefice: Number(bralima[o].stats[index1].data[index2].benefice) + Number( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length ].data.length - 1].benefice_sur_vente),
               
            };

            bralima[o].stats[index1].data[index2] = statsObj;

          } else {
            //////////////////////////////////////////////////suiviAppro
            for (let i = 1; i <= 15; i++) {

              if (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data.length - 1][`suivi${i}`]["name"] !== "") {

                bralima[o].suiviApprovisionnement[index1].data.push({

                  mois: Number(new Date().toLocaleDateString().slice(3, 5)),
                  data: [
                    {
                      name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data.length - 1][`suivi${i}`]["name"],
                      valeur: Number( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data.length - 1][`suivi${i}`]["valeur"]

                      ),
                    },
                  ],
                });
              };
            };

            /////stats///////////////////////
            const statsObj = {
              name: bralima[o].name,
              mois: Number(new Date().toLocaleDateString().slice(3, 5)),
              vente_bar: Number( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data.length - 1].vente_journaliere.valeur),
              approvionnement: Number( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data.length - 1].benefice_sur_achat.val_gros_approvisionnement),
              benefice: Number( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length - 1].data.length - 1].benefice_sur_vente),

            };

            bralima[o].stats[index1].data.push(statsObj);

          };
        } else {
          //////suiviAppro
          for (let i = 1; i <= 14; i++) {
            if (
              bralima[o].data[bralima[o].data.length - 1].data[
                bralima[o].data[bralima[o].data.length - 1].data.length - 1
              ].data[
                bralima[o].data[bralima[o].data.length - 1].data[
                  bralima[o].data[bralima[o].data.length - 1].data.length - 1
                ].data.length - 1
              ][`suivi${i}`]["name"] !== ""
            ) {
              bralima[o].suiviApprovisionnement.push({
                annee: Number(new Date().getFullYear()),
                data: [
                  {
                    mois: Number(new Date().getMonth() + 1),
                    data: [
                      {
                        name: bralima[o].data[bralima[o].data.length - 1].data[
                          bralima[o].data[bralima[o].data.length - 1].data
                            .length - 1
                        ].data[
                          bralima[o].data[bralima[o].data.length - 1].data[
                            bralima[o].data[bralima[o].data.length - 1].data
                              .length - 1
                          ].data.length - 1
                        ][`suivi${i}`]["name"],
                        valeur: Number(
                          bralima[o].data[bralima[o].data.length - 1].data[
                            bralima[o].data[bralima[o].data.length - 1].data
                              .length - 1
                          ].data[
                            bralima[o].data[bralima[o].data.length - 1].data[
                              bralima[o].data[bralima[o].data.length - 1].data
                                .length - 1
                            ].data.length - 1
                          ][`suivi${i}`]["valeur"]
                        ),
                      },
                    ],
                  },
                ],
              });
            }
          }

          /////////stats/////////////////////////////
          const statsObj = {
            annee: Number(new Date().getFullYear()),
            data: [
              {
                name: bralima[o].name,
                mois: Number(new Date().toLocaleDateString().slice(3, 5)),
                vente_bar: Number(
                  bralima[o].data[bralima[o].data.length - 1].data[
                    bralima[o].data[bralima[o].data.length - 1].data.length - 1
                  ].data[
                    bralima[o].data[bralima[o].data.length - 1].data[
                      bralima[o].data[bralima[o].data.length - 1].data.length -
                        1
                    ].data.length - 1
                  ].vente_journaliere.valeur
                ),
                approvionnement: Number(
                  bralima[o].data[bralima[o].data.length - 1].data[
                    bralima[o].data[bralima[o].data.length - 1].data.length - 1
                  ].data[
                    bralima[o].data[bralima[o].data.length - 1].data[
                      bralima[o].data[bralima[o].data.length - 1].data.length -
                        1
                    ].data.length - 1
                  ].benefice_sur_achat.val_gros_approvisionnement
                ),
                benefice: Number(
                  bralima[o].data[bralima[o].data.length - 1].data[
                    bralima[o].data[bralima[o].data.length - 1].data.length - 1
                  ].data[
                    bralima[o].data[bralima[o].data.length - 1].data[
                      bralima[o].data[bralima[o].data.length - 1].data.length -
                        1
                    ].data.length - 1
                  ].benefice_sur_vente
                ),
              },
            ],
          };
          bralima[o].stats.push(statsObj);
        }

        dataBralima.push(bralima[o]);
        await bralima[o].save();
      } else {
        /////If the name that we push don't match with no one else///////////
        ////////We creat It//////////////////////////////////

        const newBralimaData = await AutreProduit.create(body[o]);

        //initialize the stats object and doing some calcul
        const statsObj = {
          annee: Number(new Date().getFullYear()),
          data: [
            {
              name: o.name,
              mois: Number(new Date().getMonth() + 1),

              //working with the last data created in this product
              vente_bar: Number(
                newBralimaData.data[newBralimaData.data.length - 1].data[
                  newBralimaData.data[newBralimaData.data.length - 1].data
                    .length - 1
                ].data[
                  newBralimaData.data[newBralimaData.data.length - 1].data[
                    newBralimaData.data[newBralimaData.data.length - 1].data
                      .length - 1
                  ].data.length - 1
                ].vente_journaliere.valeur
              ),
              approvionnement: Number(
                newBralimaData.data[newBralimaData.data.length - 1].data[
                  newBralimaData.data[newBralimaData.data.length - 1].data
                    .length - 1
                ].data[
                  newBralimaData.data[newBralimaData.data.length - 1].data[
                    newBralimaData.data[newBralimaData.data.length - 1].data
                      .length - 1
                  ].data.length - 1
                ].benefice_sur_achat.val_gros_approvisionnement
              ),
              benefice: Number(
                newBralimaData.data[newBralimaData.data.length - 1].data[
                  newBralimaData.data[newBralimaData.data.length - 1].data
                    .length - 1
                ].data[
                  newBralimaData.data[newBralimaData.data.length - 1].data[
                    newBralimaData.data[newBralimaData.data.length - 1].data
                      .length - 1
                  ].data.length - 1
                ].benefice_sur_vente
              ),
            },
          ],
        };

        ///////////////////////////////////////////pushing data in our suivi Object

        for (let i = 1; i <= 14; i++) {
          if (
            newBralimaData.data[newBralimaData.data.length - 1].data[
              newBralimaData.data[newBralimaData.data.length - 1].data.length -
                1
            ].data[
              newBralimaData.data[newBralimaData.data.length - 1].data[
                newBralimaData.data[newBralimaData.data.length - 1].data
                  .length - 1
              ].data.length - 1
            ][`suivi${i}`][`name`] !== ""
          ) {
            newBralimaData.suiviApprovisionnement.push({
              annee: Number(new Date().getFullYear()),
              data: [
                {
                  mois: Number(new Date().getMonth() + 1),
                  data: [
                    {
                      name: newBralimaData.data[newBralimaData.data.length - 1]
                        .data[
                        newBralimaData.data[newBralimaData.data.length - 1].data
                          .length - 1
                      ].data[
                        newBralimaData.data[newBralimaData.data.length - 1]
                          .data[
                          newBralimaData.data[newBralimaData.data.length - 1]
                            .data.length - 1
                        ].data.length - 1
                      ][`suivi${i}`]["name"],
                      valeur: Number(
                        newBralimaData.data[newBralimaData.data.length - 1]
                          .data[
                          newBralimaData.data[newBralimaData.data.length - 1]
                            .data.length - 1
                        ].data[
                          newBralimaData.data[newBralimaData.data.length - 1]
                            .data[
                            newBralimaData.data[newBralimaData.data.length - 1]
                              .data.length - 1
                          ].data.length - 1
                        ][`suivi${i}`]["valeur"]
                      ),
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
      }
    };

    const data =  loopingData(dataBralima, Number(new Date().getFullYear()), Number(new Date().getMonth() + 1), Number(new Date().getDate()));
    return data;
  } else {
    /////////else the Data base is completely empty///////////////////

    // initiaze the array of data
    //i didn't creat many data and save it once coz i need to work with every product apart
    //and as a response we need to send all the data
    const createadData = [];

    for (let o of body) {
      const newBralimaData = await AutreProduit.create(o);

      //pushing the stats of every name in our Suivi Object
      for (let i = 1; i <= 14; i++) {
        if (
          newBralimaData.data[newBralimaData.data.length - 1].data[
            newBralimaData.data[newBralimaData.data.length - 1].data.length - 1
          ].data[
            newBralimaData.data[newBralimaData.data.length - 1].data[
              newBralimaData.data[newBralimaData.data.length - 1].data.length -
                1
            ].data.length - 1
          ][`suivi${i}`]["name"] !== ""
        ) {
          newBralimaData.suiviApprovisionnement.push({
            
            annee: Number(new Date().getFullYear()),
            data: [
              {
                mois: Number(new Date().getMonth() + 1),
                data: [
                  {
                    name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length - 1].data.length - 1][`suivi${i}`]["name"],
                    valeur: Number( newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length - 1].data.length - 1][`suivi${i}`]["valeur"]),
                  },
                ],
              },
            ],
          });
        }
      }

      //initialize the stats object and doing some calcul
      const statsObj = {
        annee: Number(new Date().getFullYear()),
        data: [
          {
            name: o.name,
            mois: Number(new Date().getMonth() + 1),

            //working with the last data created in this product
            vente_bar: Number( newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length - 1].data.length - 1].vente_journaliere.valeur),
            approvionnement: Number( newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length - 1 ].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length - 1].data.length - 1].benefice_sur_achat.val_gros_approvisionnement),
            benefice: Number( newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length - 1 ].data.length - 1].benefice_sur_vente),
          },
        ],
      };

      newBralimaData.stats.push(statsObj);
      createadData.push(newBralimaData);
      await newBralimaData.save();
    }

    // then the response ....
    const data = loopingData(createadData,  Number(new Date().getFullYear()),  Number(new Date().getMonth() + 1), Number(new Date().getDate()));
    console.log(data);
    return data;
}});