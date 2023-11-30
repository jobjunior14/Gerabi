
const {loopingData} = require ('../suiviStockEtVenteFunction');


exports.pushDataCollection =  async (request, collection, response ) => {

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

}};

exports.updateDataCollection = async (collection, request, response ) => {

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
            };

            await collectionData.save();

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

};


