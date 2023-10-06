const AppError = require ( `${__dirname}/../utils/appError.js` );
const AutreProduit = require ( `${__dirname}/../models/autreProduitModel.js`);
const catchAssynch = require ( `${__dirname}/../utils/catchAssynch.js`);

exports.getAutreProduit = catchAssynch ( async (req, res, next) =>
{
        
    //we didn't work with stats data coz front don't need it daily
    let bralima = await AutreProduit.find();

    //Get informartion from the query
    const year = Number ( req.params.year);
    const month = Number (req.params.month);
    const day = Number (req.params.day);
    let nombrepage = 0;

    //add data to a new array for fast reading
    let dayData = [];

    //pushing id of every Product in a new array for just "delete" Option
    const id = [];

    //Reading of all data to filter it
    for ( let i of bralima )
    {
        for ( let j of i.data)
        {
            //check if the year is true of false 
            if ( j.annee === year)
            {
                for ( let o of j.data)
                {
                    //cheking of the month
                    if (o.mois === month)
                    {
                        for (let p of o.data)
                        {
                            //cheking of the day
                            if (  Number ( JSON.stringify (p.createdAt).slice(9, 11)) === day)
                            {
                                //then push the product id in a array if there is a correspondance in (it's true every where)
                                id.push(i._id);
                                p.name = i.name;
                                dayData.push(p);
                            };
                        };
                    };
                };
            };
        };

        // doing the same thing to suivi appro
        //check days, month, year...
    };

    // then the response ....
    res.status (200).json({
        status: 'success',
        data:{
            // id: id,
            // month: dayData,
            bralima
        }
       
    });
});

exports.pushDataAutreProduit = catchAssynch ( async (req, res, next) =>
{
    //first we need all data
    const bralima = await AutreProduit.find();
    //loop of the request Body(All data )
    const dataBralima =[];
    
    if (bralima.length > 0 )
    {
        for ( o = 0; o < req.body.length; o++)
        {

            //have to check if new data was adding or not by checking the name
            if (bralima[o].name.toUpperCase() === req.body[o].name.toUpperCase())
            {

                ///////////////////////////// stats For every data/////////////////////////////////////////

                const yearindex =  await bralima[o].data.findIndex ( el => el.annee === Number (new Date().toLocaleDateString().slice(6)));
            
                if ( yearindex !== -1)
                {
                    const monthindex = await bralima[o].data[yearindex].data.findIndex( el => el.mois === Number (new Date().toLocaleDateString().slice(3, 5)));
            
                    if ( monthindex !== -1)
                    {
                        bralima[o].data[yearindex].data[monthindex].data.push (req.body[o].data.data.data);

                    } else {

                        bralima[o].data[yearindex].data.push
                        (
                            {
                                "mois": Number ( new Date().toLocaleDateString().slice(3, 5) ),
                                "data":
                                {
                                    "name": bralima[o].name,
                                    "achat_journalier":
                                    {
                                        "qt_caisse": req.body[o].data.data.data.achat_journalier.qt_caisse,
                                        "nbr_btll": req.body[o].data.data.data.achat_journalier.nbr_btll,
                                        "prix_achat_gros": req.body[o].data.data.data.achat_journalier.prix_achat_gros
                                    },
                                    "vente_journaliere":
                                    {
                                        "ref_prix_det": req.body[o].data.data.data.vente_journaliere.ref_prix_det,
                                    },
                                    "business_projection":
                                    {
                                        "sortie_cave": req.body[o].data.data.data.business_projection.sortie_cave
                                    },
                                    "stock_consignaions":
                                    {
                                        "qt": req.body[o].data.data.data.stock_consignaions.qt
                                    },
                                    "stock_apres_vente":
                                    {
                                        "reste_stock_comptoir":
                                        {
                                            "qt_btll": req.body[o].data.data.data.stock_apres_vente.reste_stock_comptoir.qt_btll
                                        },
                                        "reste_stock_depot":
                                        {
                                            "qt_caisses": req.body[o].data.data.data.stock_apres_vente.reste_stock_depot.qt_caisses
                                        }
                                    },
                                    "val_precedente":
                                    {
                                        "stock_apres_ventente_rest_stock_comptoir_qt_btll": req.body[o].data.data.data.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll,
                                        "stock_apres_ventente_rest_stock_depot_qt_btll": req.body[o].data.data.data.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll
                                    },

                                    "suivi1": {

                                        "name": req.body[o].data.data.data.suivi1.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi1.qt_caisse
                                    },
                                
                                    "suivi2": {

                                        "name": req.body[o].data.data.data.suivi2.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi2.qt_caisse
                                    },
                                
                                    "suivi3": {

                                        "name": req.body[o].data.data.data.suivi3.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi3.qt_caisse
                                    },
                                
                                    "suivi4": {

                                        "name": req.body[o].data.data.data.suivi4.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi4.qt_caisse
                                    },
                                
                                    "suivi5": {

                                        "name": req.body[o].data.data.data.suivi5.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi5.qt_caisse
                                    },
                                
                                    "suivi6": {

                                        "name": req.body[o].data.data.data.suivi6.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi6.qt_caisse
                                    },
                                
                                    "suivi7": {

                                        "name": req.body[o].data.data.data.suivi7.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi7.qt_caisse
                                    },
                                
                                    "suivi8": {

                                        "name": req.body[o].data.data.data.suivi8.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi8.qt_caisse
                                    },
                                
                                    "suivi9": {

                                        "name": req.body[o].data.data.data.suivi9.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi9.qt_caisse
                                    },
                                
                                    "suivi10": {

                                        "name": req.body[o].data.data.data.suivi10.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi10.qt_caisse
                                    },
                                
                                    "suivi11": {

                                        "name": req.body[o].data.data.data.suivi11.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi11.qt_caisse
                                    },
                                
                                    "suivi12": {

                                        "name": req.body[o].data.data.data.suivi12.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi12.qt_caisse
                                    },
                                
                                    "suivi13": {

                                        "name": req.body[o].data.data.data.suivi13.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi13.qt_caisse
                                    },
                                
                                    "suivi14": {

                                        "name": req.body[o].data.data.data.suivi14.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi14.qt_caisse
                                    },

                                }
                            }
                        );
                    };
                    
                }
                else
                {
                    bralima[o].data.push(
                        {
                            "annee": Number ( new Date().toLocaleDateString().slice (6)),
                            "data": 
                            {
                                "mois": Number ( new Date().toLocaleDateString().slice(3, 5) ),
                                "data":
                                {
                                    "name": bralima[o].name,
                                    "achat_journalier":
                                    {
                                        "qt_caisse": req.body[o].data.data.data.achat_journalier.qt_caisse,
                                        "nbr_btll": req.body[o].data.data.data.achat_journalier.nbr_btll,
                                        "prix_achat_gros": req.body[o].data.data.data.achat_journalier.prix_achat_gros
                                    },
                                    "vente_journaliere":
                                    {
                                        "ref_prix_det": req.body[o].data.data.data.vente_journaliere.ref_prix_det,
                                    },
                                    "business_projection":
                                    {
                                        "sortie_cave": req.body[o].data.data.data.business_projection.sortie_cave
                                    },
                                    "stock_consignaions":
                                    {
                                        "qt": req.body[o].data.data.data.stock_consignaions.qt
                                    },
                                    "stock_apres_vente":
                                    {
                                        "reste_stock_comptoir":
                                        {
                                            "qt_btll": req.body[o].data.data.data.stock_apres_vente.reste_stock_comptoir.qt_btll
                                        },
                                        "reste_stock_depot":
                                        {
                                            "qt_caisses": req.body[o].data.data.data.stock_apres_vente.reste_stock_depot.qt_caisses
                                        }
                                    },
                                    "val_precedente":
                                    {
                                        "stock_apres_ventente_rest_stock_comptoir_qt_btll": req.body[o].data.data.data.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll,
                                        "stock_apres_ventente_rest_stock_depot_qt_btll": req.body[o].data.data.data.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll
                                    },

                                    "suivi1": {

                                        "name": req.body[o].data.data.data.suivi1.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi1.qt_caisse
                                    },
                                
                                    "suivi2": {

                                        "name": req.body[o].data.data.data.suivi2.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi2.qt_caisse
                                    },
                                
                                    "suivi3": {

                                        "name": req.body[o].data.data.data.suivi3.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi3.qt_caisse
                                    },
                                
                                    "suivi4": {

                                        "name": req.body[o].data.data.data.suivi4.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi4.qt_caisse
                                    },
                                
                                    "suivi5": {

                                        "name": req.body[o].data.data.data.suivi5.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi5.qt_caisse
                                    },
                                
                                    "suivi6": {

                                        "name": req.body[o].data.data.data.suivi6.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi6.qt_caisse
                                    },
                                
                                    "suivi7": {

                                        "name": req.body[o].data.data.data.suivi7.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi7.qt_caisse
                                    },
                                
                                    "suivi8": {

                                        "name": req.body[o].data.data.data.suivi8.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi8.qt_caisse
                                    },
                                
                                    "suivi9": {

                                        "name": req.body[o].data.data.data.suivi9.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi9.qt_caisse
                                    },
                                
                                    "suivi10": {

                                        "name": req.body[o].data.data.data.suivi10.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi10.qt_caisse
                                    },
                                
                                    "suivi11": {

                                        "name": req.body[o].data.data.data.suivi11.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi11.qt_caisse
                                    },
                                
                                    "suivi12": {

                                        "name": req.body[o].data.data.data.suivi12.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi12.qt_caisse
                                    },
                                
                                    "suivi13": {

                                        "name": req.body[o].data.data.data.suivi13.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi13.qt_caisse
                                    },
                                
                                    "suivi14": {

                                        "name": req.body[o].data.data.data.suivi14.name,
                                        "qt_caisse": req.body[o].data.data.data.suivi14.qt_caisse
                                    },
                                }
                            }
                        }
                    );
                };
            
            
            
                //saving the data in the server so we can work with the new data ///////////////////////////
                await  bralima[o].save();
            
                const index1 = await bralima[o].stats.findIndex (el => el.annee === Number ( new Date().toLocaleDateString().slice (6)));

            
                ///Statistics 
                if ( index1 !== -1 ) 
                {
                    const index2 = await bralima[o].stats[index1].data.findIndex (el => el.mois === Number ( new Date().toLocaleDateString().slice (3, 5)));

                    
                    if ( index2 !== -1)
                    {
                        ////////////searching suivi's index data /////////////////////
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi1.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi1.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi1.valeur)
                                };
                            };
                            
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi2.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi2.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi2.valeur)
                                };
                            };
                            
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi3.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi3.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi3.valeur)
                                };
                            };
                            
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi4.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi4.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi4.valeur)
                                };
                            };
                            
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi5.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi5.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi5.valeur)
                                };
                            };
                            
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi6.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi6.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi6.valeur)
                                };
                            };
                            
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi7.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi7.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi7.valeur)
                                };
                            };
                            
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi8.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi8.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi8.valeur)
                                };
                            };
                            
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi9.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi9.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi9.valeur)
                                };
                            };
                            
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi10.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi10.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi10.valeur)
                                };
                            };
                            
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi11.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi11.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi11.valeur)
                                };
                            };
                            
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi12.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi12.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi12.valeur)
                                };
                            };
                            
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi13.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi13.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi13.valeur)
                                };
                            };
                            
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi14.name !== '')
                        {
                            const indexDataSuivi1 = await bralima[o].suiviApprovisionnement[index1].data[index2].data.findIndex (el => el.name.toUpperCase() === bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi14.name.toUpperCase());

                            if (indexDataSuivi1 !== -1)
                            {
                                bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1] = {

                                    name: bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].name,
                                    valeur: Number (bralima[o].suiviApprovisionnement[index1].data[index2].data[indexDataSuivi1].valeur) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi14.valeur)
                                };
                            };
                            
                        };
                        


                        ///stats //////////
                        const statsObj = 
                        {
                            name: bralima[o].name,
                            mois: bralima[o].stats[index1].data[index2].mois,
                            vente_bar: Number ( bralima[o].stats[index1].data[index2].vente_bar) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].vente_journaliere.valeur),
                            approvionnement:  Number (bralima[o].stats[index1].data[index2].approvionnement) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].benefice_sur_achat.val_gros_approvisionnement),
                            benefice:  Number (bralima[o].stats[index1].data[index2].benefice) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].benefice_sur_vente)
                        };
            
                        bralima[o].stats[index1].data[index2] = statsObj;
                    }
                    else
                    {
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi1.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi1.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi1.valeur)
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi2.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi2.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi2.valeur)
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi3.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi3.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi3.valeur)
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi4.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi4.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi4.valeur)
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi5.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi5.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi5.valeur)
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi6.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi6.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi6.valeur)
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi7.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi7.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi7.valeur)
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi8.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi8.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi8.valeur)
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi9.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi9.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi9.valeur)
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi10.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi10.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi10.valeur)
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi11.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi11.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi11.valeur)
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi12.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi12.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi12.valeur)
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi13.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi13.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi13.valeur)
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi14.name !== '')
                        {

                            bralima[o].suiviApprovisionnement[index1].data.push ({
                                
                                mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                data:[{

                                    name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi14.name ,
                                    valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi14.valeur)
                                }]
                            });
                        };


                        /////stats///////////////////////
                        const statsObj =  
                        {
                            name: bralima[o].name,
                            mois: Number ( new Date().toLocaleDateString().slice (3, 5)) ,
                            vente_bar: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].vente_journaliere.valeur) ,
                            approvionnement: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].benefice_sur_achat.val_gros_approvisionnement),
                            benefice: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].benefice_sur_vente)
                        };
            
                        bralima[o].stats[index1].data.push (statsObj);
                    }
                }
                else
                {

                    if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi1.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi1.name ,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi1.valeur)
                                    }]
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi2.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi2.name ,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi2.valeur)
                                    }]
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi3.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi3.name ,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi3.valeur)
                                    }]
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi4.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi4.name ,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi4.valeur)
                                    }]
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi5.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi5.name ,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi5.valeur)
                                    }]
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi6.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi6.name ,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi6.valeur)
                                    }]
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi7.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi7.name ,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi7.valeur)
                                    }]
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi8.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi8.name ,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi8.valeur)
                                    }]
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi9.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi9.name ,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi9.valeur)
                                    }]
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi10.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi10.name ,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi10.valeur)
                                    }]
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi11.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi11.name ,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi11.valeur)
                                    }]
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi12.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi12.name,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi12.valeur)
                                    }]
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi13.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi13.name,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi13.valeur)
                                    }]
                                }]
                            });
                        };
                        if ( bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi14.name !== '')
                        {

                            bralima[o].suiviApprovisionnement.push ({
                                
                                annee: Number (new Date().toLocalDateString().slice(6)),
                                data:[{
                                    mois: Number (new Date().toLocaleDateString().slice(3, 5)),
                                    data:[{

                                        name: bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi14.name ,
                                        valeur: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].suivi14.valeur)
                                    }]
                                }]
                            });
                        };

                    /////////stats/////////////////////////////
                    const statsObj =  
                    {
                        annee: Number ( new Date().toLocaleDateString().slice (6)) ,
                        data:[{
                            name: bralima[o].name,
                            mois: Number ( new Date().toLocaleDateString().slice (3, 5)) ,
                            vente_bar: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].vente_journaliere.valeur) ,
                            approvionnement: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].benefice_sur_achat.val_gros_approvisionnement),
                            benefice: Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].benefice_sur_vente)
                        }]
                    };
                    bralima[o].stats.push(statsObj);
                };
                
                dataBralima.push(bralima[o]);
                await bralima[o].save();
            } else {

                /////If the name that we push don't match with no one else///////////
                ////////We creat It//////////////////////////////////

                const newBralimaData = await AutreProduit.create(req.body[o]);
        
                //initialize the stats object and doing some calcul
                const statsObj = 
                {
                    annee: Number ( new Date().toLocaleDateString().slice(6) ),
                    data:[{
                        name: o.name,
                        mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                        
                        //working with the last data created in this product
                        vente_bar: Number (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].vente_journaliere.valeur),
                        approvionnement: Number (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].benefice_sur_achat.val_gros_approvisionnement) ,
                        benefice:  Number (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].benefice_sur_vente),
                    }]
                };

                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi1.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi1.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi1.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi2.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi2.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi2.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi3.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi3.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi3.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi3.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi3.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi3.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi4.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi4.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi4.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi5.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi5.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi5.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi6.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi6.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi6.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi7.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi7.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi7.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi8.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi8.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi8.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi9.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi9.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi9.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi10.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi10.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi10.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi11.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi11.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi11.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi12.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi12.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi12.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi13.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi13.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi13.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };
                if (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi14.name !== '')
                {
                    const suiviStatsObj = {
                        annee: Number ( new Date().toLocaleDateString().slice (6) ),
                        data: [{
                            
                            mois: Number ( new Date.toLocaleDateString().slice (3, 5)),
                            data: [{
                                
                                name: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi14.name,
                                valeur: newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].suivi14.valeur
                            }]
                        }]
                    };

                    newBralimaData.suiviApprovisionnement.push(suiviStatsObj);
                };

                newBralimaData.stats.push(statsObj);
                dataBralima.push(newBralimaData);
                await newBralimaData.save();
            };
        };

        res.status(200).json
        (
            {
                status: 'success',
                data: {
                    dataBralima
                }
            }
        );

    } else {
        
        /////////else the Data base is completely empty///////////////////

        // initiaze the array of data 
        //i didn't creat many data and save it once coz i need to work with every product apart
        //and as a response we need to send all the data
        const createadData =[];

        for (let o of req.body)
        {
            
            const newBralimaData = await AutreProduit.create(o);
        
            //initialize the stats object and doing some calcul
            const statsObj = 
            {
                annee: Number ( new Date().toLocaleDateString().slice(6) ),
                data:[{
                    name: o.name,
                    mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                    
                    //working with the last data created in this product
                    vente_bar: Number (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].vente_journaliere.valeur),
                    approvionnement: Number (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].benefice_sur_achat.val_gros_approvisionnement) ,
                    benefice:  Number (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].benefice_sur_vente),
                }]
            };
            
            newBralimaData.stats.push(statsObj);
            createadData.push(newBralimaData);
            await newBralimaData.save();
            
        };

        
        res.status(201).json ({
            status: "sucess",
            data:{
                createadData
            }
        });
    };
});

exports.updateDataAutreProduit = catchAssynch ( async ( req, res, next) =>
{
    // we recieve data as an array....so we have to iterate it ...

    //firt we're gonna findById any data who is avaible
    const updatedDocument = [];

    for (let i = 0; i < req.body.id.length; i++) {

        const bralima = await AutreProduit.findById( req.body.id[i]);
        
        const yearIndex = await bralima.data.findIndex( el => el.annee === Number (req.params.year));
        
        if (yearIndex !== -1) {
            
            const monthIndex = await bralima.data[yearIndex].data.findIndex(el => el.mois === Number (req.params.month));
            
            if ( monthIndex !== -1) {
                
                //index of it's an index of our data (suivi stock)
                const indexof = await bralima.data[yearIndex].data[monthIndex].data.findIndex( el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === Number (req.params.day));
                
                //index1 it's an index of year in stats 
                const index1 = await bralima.stats.findIndex ( el => el.annee === Number (req.params.year));
                

                
                if ( indexof !== -1 && index1 !== -1) {
                    
                    //Month index Stats
                    const index2 = await bralima.stats[index1].data.findIndex ( el => el.mois === Number (req.params.month));
                    
                        
                    if ( index2 !== -1) {
                        
                        const statsObj1 = {
                            
                            name: bralima.name,
                            mois: bralima.stats[index1].data[index2].mois,
                            vente_bar: Number ( bralima.stats[index1].data[index2].vente_bar) - Number (bralima.data[yearIndex].data[monthIndex].data[indexof].vente_journaliere.valeur),
                            approvionnement: Number ( bralima.stats[index1].data[index2].approvionnement) - Number ( bralima.data[yearIndex].data[monthIndex].data[indexof].benefice_sur_achat.val_gros_approvisionnement),
                            benefice: Number (bralima.stats[index1].data[index2].benefice) -  Number (bralima.data[yearIndex].data[monthIndex].data[indexof].benefice_sur_vente)
                        };
                        
                        bralima.data[yearIndex].data[monthIndex].data[indexof] = req.body.data[i].data.data.data;
                        await bralima.save();
                        
                        const statsObj2 = {
                            
                            name: bralima.name,
                            mois: statsObj1.mois,
                            vente_bar: Number (bralima.data[yearIndex].data[monthIndex].data[indexof].vente_journaliere.valeur) + Number (statsObj1.vente_bar),
                            approvionnement: Number ( bralima.data[yearIndex].data[monthIndex].data[indexof].benefice_sur_achat.val_gros_approvisionnement) + Number (statsObj1.approvionnement),
                            benefice: Number (bralima.data[yearIndex].data[monthIndex].data[indexof].benefice_sur_vente) + Number (statsObj1.benefice)
                        };
                        
                        bralima.stats[index1].data[index2] = statsObj2;
                        await bralima.save();

                        
                    } else {
                        
                        return ( next (new AppError ('Cette donnee est inexistante', 404)));
                    };
                    
                } else {
                    
                    return ( next (new AppError ('Cette donnee est inexistante', 404)));
                };
                
            } else {

                return ( next (new AppError ('Cette donnee est inexistante', 404)));
            };

        } else {
            
            return ( next (new AppError ('Cette donnee est inexistante', 404)));
        };

        updatedDocument.push(bralima);
    };
    res.status(200).json({
        
        status: 'Success',
        data: {
            updatedDocument
        }
    })
});

exports.getOneDataAutreProduit = catchAssynch ( async  ( req, res, next) =>
{
    const bralimaOneData = await AutreProduit.findById( req.params.id );

    if (!bralimaOneData)
    {
        return next( new AppError ( "Cette donné n'existe pas sur ce serveur", 404));
    };
    
    res.status(200).json(
        {
            status: 'success',
            data:{
                bralimaOneData
            }
        }
    );
});

// A voir si l'on pourra l'utiliser pour les stats////////////////////////////////////////////////
exports.stastAutreProduit  = catchAssynch ( async ( req, res, next) =>
{
    const year = Number (req.params.year);
    const mois = Number ( req.params.month);

    let stats = await AutreProduit.aggregate ([
        {
            $project:
            {
                stats:
                {
                    $filter:
                    {
                        input: "$stats",
                        as: "data",
                        cond: { $and: [
                            { $gte: [ "$$data.annee", year ]},
                            { $lte: [ "$$data.annee", year]}
                        ]}
                    }
                }
            }
        },

        {
            $unwind: { path: "$stats"}
        },

        {
            $project:
            {
                stats:
                {
                    $filter:
                    {
                        input: "$stats.data",
                        as: "data",
                        cond: { $and: [
                            { $gte: [ "$$data.mois", mois ]},
                            { $lte: [ "$$data.mois", mois]}
                        ]}
                    }
                }
            }
        },
       
    ]);

    res.status(200).json({
        status: "success",
        stats:{
            stats
        }
    });
});

exports.AllProductStatsAutreProduit = catchAssynch ( async ( req, res, next) =>
{
    const year = Number (req.params.year);
    const mois = Number ( req.params.month);

    let stats = await AutreProduit.aggregate ([
        {
            $project:
            {
                stats:
                {
                    $filter:
                    {
                        input: "$stats",
                        as: "data",
                        cond: { $and: [
                            { $gte: [ "$$data.annee", year ]},
                            { $lte: [ "$$data.annee", year]}
                        ]}
                    }
                }
            }
        },

        {
            $unwind: { path: "$stats"}
        },

        {
            $project:
            {
                stats:
                {
                    $filter:
                    {
                        input: "$stats.data",
                        as: "data",
                        cond: { $and: [
                            { $gte: [ "$$data.mois", mois ]},
                            { $lte: [ "$$data.mois", mois]}
                        ]}
                    }
                }
            }
        },

        {
            $unwind: { path: "$stats"}
        },

        {
            $group:
            {
                _id: { mois: "$stats.mois"},
                vente_bar: { $sum: "$stats.vente_bar"},
                approvionnement: { $sum: "$stats.approvionnement"},
                benefice: { $sum: "$stats.benefice"}
            }
        }
    ]);

    res.status(200).json({
        status: "success",
        stats:{
            stats
        }
    });
});

exports.suiviAllStatsAutreProduit = catchAssynch ( async ( req, res, next) =>
{
    const year = Number (req.params.year);
    const mois = Number ( req.params.month);

    const stats = await AutreProduit.aggregate([

        {
            $project:
            {
                suivi:
                {
                    $filter:
                    {
                        input: "$suiviApprovisionnement",
                        as: "data",
                        cond: { $and: [
                            { $gte: [ "$$data.annee", year]},
                            { $lte: [ "$$data.annee", year]}
                        ]}
                    }
                }
            }
        },

        {
            $unwind: { path: "$suivi"}
        },

        {
            $project:
            {
                suivi:
                {
                    $filter:
                    {
                        input: "$suivi.data",
                        as: "data",
                        cond: { $and: [
                            { $gte: [ "$$data.mois", mois]},
                            { $lte: [ "$$data.mois", mois]}
                        ]}
                    }
                }
            }
        },

        {
            $unwind: { path: "$suivi"}
        },

        {
            $unwind: { path: "$suivi.data"}
        },

        {
            $unwind: { path: "$suivi.data"}
        },

        {
            $unwind: { path: "$suivi.data.stats"}
        },

        {
            $unwind: {path: "$suivi.data.stats.data"}
        },

        {
            $group:
            {
                _id: null,
                valeur: { $sum: "$suivi.data.stats.data.valeur"}
            }
        }
    ]);

    res.status(200).json({
        status: 'Success',
        stats:{
            stats
        }
    });
});

exports.suiviDetailStatsAutreProduit = catchAssynch ( async ( req, res, next) =>
{
    const year = Number (req.params.year);
    const mois = Number ( req.params.month);

    const stats = await AutreProduit.aggregate([
        {
            $project:
            {
                suivi:
                {
                    $filter:
                    {
                        input: "$suiviApprovisionnement",
                        as: "data",
                        cond: { $and: [
                            { $gte: [ "$$data.annee", year]},
                            { $lte: [ "$$data.annee", year]}
                        ]}
                    }
                }
            }
        },

        {
            $unwind: { path: "$suivi"}
        },

        {
            $project:
            {
                suivi:
                {
                    $filter:
                    {
                        input: "$suivi.data",
                        as: "data",
                        cond: { $and: [
                            { $gte: [ "$$data.mois", mois]},
                            { $lte: [ "$$data.mois", mois]}
                        ]}
                    }
                }
            }
        },

        {
            $unwind: { path: "$suivi"}
        },

        {
            $unwind: { path: "$suivi.data"}
        },

        {
            $unwind: {path: "$suivi.data.stats"}
        },

        {
            $unwind: {path: "$suivi.data.stats.data"}
        },

        {
            $group: 
            {
                _id: {name: {$toUpper: "$suivi.data.stats.data.name"}, mois: "$suivi.data.stats.data.mois" },
                qt_caisse: { $sum: `$suivi.data.stats.data.qt_caisse` },
                valeur: { $sum: `$suivi.data.stats.data.valeur` },
            }
        }
       
    ]);

    res.status(200).json({
        status: 'Success',
        stats:{
            stats
        }
    });
});


exports.yearStatsAutreProduit = catchAssynch ( async ( req, res, next ) => 
{
   const year = Number (req.params.year);

    const stats = await AutreProduit.aggregate([
        {
            $project:
            {
                stats:
                {
                    $filter:
                    {
                        input: "$stats",
                        as: "data",
                        cond: { $and: [
                            { $gte: [ "$$data.annee", year]},
                            { $lte: [ "$$data.annee", year]}
                        ]}
                    }
                }
            }
        },

        {
            $unwind: { path: "$stats"}
        },

        {
            $unwind: { path: "$stats.data"}
        },

        {
            $group:
            {
                _id: { mois: "$stats.data.mois"},
                vente_bar: { $sum: "$stats.data.vente_bar"},
                approvionnement: { $sum: "$stats.data.approvionnement"},
                benefice: { $sum: "$stats.data.benefice"}
            }
        }


    ]);

    res.status(200).json({
        status: 'success',
        stats: {
            stats
        }
    });
});