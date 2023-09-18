const AppError = require ( `${__dirname}/../utils/appError.js` );
const apiFeatures = require ( `${__dirname}/../utils/apiFutures.js`);
const AutreProduit = require ( `${__dirname}/../models/autreProduitModel.js`);
const catchAssynch = require ( `${__dirname}/../utils/catchAssynch.js`);

exports.getAutreProduit = catchAssynch ( async (req, res, next) =>
{
        
    let bralima = await AutreProduit.find();

    const year = Number ( req.query.date.slice(0, 4));
    const month = Number (req.query.date.slice(4, 6));
    const day = Number (req.query.day);
    let nombrepage = 0;

    let dayData = [];
    let suiviDayData = [];
    const id = [];

    for ( let i of bralima )
    {
        for ( let j of i.data)
        {
            if ( j.annee === year)
            {
                for ( let o of j.data)
                {
                    if (o.mois === month)
                    {
                        for (let p of o.data)
                        {
                            if (  Number ( JSON.stringify (p.createdAt).slice(9, 11)) === day)
                            {
                                id.push(i._id);
                                p.name = i.name;
                                dayData.push(p);
                            };
                        };
                    };
                };
            };
        };

        for ( let j of i.suiviApprovisionnement)
        {
            if (j.annee === year)
            {
                for (let o of j.data)
                {
                    if ( o.mois === month)
                    { 
                        let d = [];

                        for (let p of o.data)
                        {
                            let g = null;

                            for ( let m of p.data)
                            {
                                if ( Number( JSON.stringify(m.createdAt).slice (9, 11)) === day)
                                {
                                    g = m;
                                };

                                d.push(
                                    {
                                        name: p.name,
                                        data: g
                                    }
                                );
                            };

                        };

                        suiviDayData.push(d);
                    };
                };
            };
        };
    };

    res.status (200).json({
        status: 'success',
        data:{
            id: id,
            month: dayData,
            suivi: suiviDayData
        }
       
    });
});

exports.createAutreProduit = catchAssynch ( async ( req, res, next) =>
{
    const createadData =[];

    for (let o of req.body)
    {

        const newBralimaData = await AutreProduit.create(o);
    
        const statsObj = 
        {
            annee: Number ( new Date().toLocaleDateString().slice(6) ),
            data:[{
                name: o.name,
                mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                vente_bar: Number (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].vente_journaliere.valeur),
                approvionnement: Number (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].benefice_sur_achat.val_gros_approvisionnement) ,
                benefice:  Number (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].benefice_sur_vente),
            }]
        };
        const achat = Number ( newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].achat_journalier.prix_achat_gros);
    
        if (Array.isArray ( o.suiviApprovisionnement.data.data.data))
        {
            const data = []
            for ( let i of o.suiviApprovisionnement.data.data.data )
            {
                const dataDetail = 
                {
                    name: i.name,
                    data:[
                        {
                            mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                            qt_caisse: Number (i.data.qt_caisse),
                            valeur: Number (i.data.qt_caisse) * achat
                        }
                    ],
                    stats: [{
                        annee: Number ( new Date().toLocaleDateString().slice(6) ),
                        data: [{
                            name: i.name,
                            mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                            qt_caisse: Number (i.data.qt_caisse),
                            valeur: Number (i.data.qt_caisse) * achat
                        }]
                    }]
                };
                data.push(dataDetail);
            };
    
            const suivi = 
            {
                annee: Number (new Date().toLocaleDateString().slice(6)),
                data:
                {
                    mois: Number ( new Date().toLocaleDateString().slice(3, 5)),
                    data: data
                }
            };
    
            newBralimaData.suiviApprovisionnement[0] = suivi
        }
        else
        {
            const suivi = 
            {
                annee: Number (new Date().toLocaleDateString().slice(6)),
                data:
                {
                    mois: Number ( new Date().toLocaleDateString().slice(3, 5)),
                    data:
                    {
                        name: o.suiviApprovisionnement.data.data.data.name,
                        data: [{
                            mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                            qt_caisse: Number(o.suiviApprovisionnement.data.data.data.data.qt_caisse ),
                            valeur: Number (o.suiviApprovisionnement.data.data.data.data.qt_caisse ) * achat
                        }],
                        stats: [{
                            annee: Number ( new Date().toLocaleDateString().slice(6) ),
                            data: [{
                                name: o.suiviApprovisionnement.data.data.data.name,
                                mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                                qt_caisse: Number(o.suiviApprovisionnement.data.data.data.data.qt_caisse ),
                                valeur: Number (o.suiviApprovisionnement.data.data.data.data.qt_caisse ) * achat
                            }]
                        }]
                    }
                }
            };
    
            newBralimaData.suiviApprovisionnement[0] = suivi
        }
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
});

exports.pushDataAutreProduit = catchAssynch ( async (req, res, next) =>
{
    const bralima = await AutreProduit.find();
    const dataBralima =[];

    for ( o = 0; o < req.body.length; o++)
    {
        
        if ( !bralima[o])
        {
            return next( new AppError ( 'There is no data ', 404));
        };
      
      ///////////////////////////// stats For every object/////////////////////////////////////////
        const yearindex =  await bralima[o].data.findIndex ( el => el.annee === Number (req.query.date.slice(0, 4)));
    
        if ( yearindex !== -1)
        {
            const monthindex = await bralima[o].data[yearindex].data.findIndex( el => el.mois === Number (req.query.date.slice(4, 6)));
    
            if ( monthindex !== -1)
            {
                bralima[o].data[yearindex].data[monthindex].data.push (req.body[o].data.data.data);
            }
            else
            {
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
                            }
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
                            }
                        }
                    }
                }
            );
        };
    
    
    
        //saving the data in the server so we can work with the new data ///////////////////////////
        await  bralima[o].save();
    
        const index1 = await bralima[o].stats.findIndex (el => el.annee === Number ( new Date().toLocaleDateString().slice (6)));
        const yearIndexsuivi = await bralima[o].suiviApprovisionnement.findIndex( el => el.annee === Number ( new Date().toLocaleDateString().slice (6)));
        if ( yearIndexsuivi !== -1)
        {
            const monthIndexSuvi = await bralima[o].suiviApprovisionnement[yearIndexsuivi].data.findIndex ( el => el.mois === Number ( new Date().toLocaleDateString().slice(3, 5)));
            
            if ( monthIndexSuvi !== -1)
            {
                if (Array.isArray ( req.body[o].suiviApprovisionnement.data.data.data))
                {
                    
                    for ( let i of req.body[o].suiviApprovisionnement.data.data.data)
                    {
                        const index1SuiviName = await bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data.findIndex ( el => el.name === i.name);
                        
                        if (index1SuiviName !== -1)
                        {
                            //for data of Name 
                            const objSuivi = 
                            {
                                qt_caisse: Number (i.qt_caisse),
                                valeur: Number (i.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                            };
                            bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].data.push(objSuivi);
                    
                            //for statistics
                            const indexStatsSuiviAnnee = bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats.findIndex(el => el.annee === Number ( new Date().toLocaleDateString().slice(6)));
        
                            if ( indexStatsSuiviAnnee !== -1 )
                            {
                                const indexStatsSuiviMois = bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data.findIndex (el => el.mois === Number ( new Date().toLocaleDateString().slice (3, 5)));
                                if ( indexStatsSuiviMois !== -1)
                                {
                                    const objStatsSuivi = 
                                    {
                                        name: i.name,
                                        mois: bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].mois,
                                        qt_caisse:  Number (i.qt_caisse) + bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].qt_caisse,
                                        valeur: (Number (i.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)) + bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].valeur
                                    };
                                    bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois] = objStatsSuivi;
                                }
                                else
                                {
                                    const objSuivi2 = 
                                    {
                                        name: i.name,
                                        mois: Number ( new Date().toLocaleDateString().slice (3, 5)) , 
                                        qt_caisse: Number (i.qt_caisse),
                                        valeur: Number (i.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                                    };
                                    bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data.push(objSuivi2);
                                };
                                
                            }
                            else
                            {
                                const newStats = 
                                {
                                    annee: Number ( new Date().toLocaleDateString().slice (6)) ,
                                    data: [{
                                        name: i.name,
                                        mois:  Number ( new Date().toLocaleDateString().slice (3, 5)),
                                        qt_caisse: Number (i.qt_caisse),
                                        valeur: Number (i.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                                    }]
                                };
                                bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats.push(newStats);
                            };
                    
                        }
                        else
                        {
                            const suivi = 
                            {
                                
                                name: i.name,
                                data: [{
                                    mois: Number ( new Date().toLocaleDateString().slice (3, 5)) , 
                                    qt_caisse:  Number (i.qt_caisse),
                                    valeur:  Number (i.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                                }],
                                stats: [{
                                    
                                    annee: Number ( new Date().toLocaleDateString().slice (6)),
                                    data: [{
                                        name: i.name,
                                        mois: Number ( new Date().toLocaleDateString().slice (3, 5)),
                                        qt_caisse: Number (i.qt_caisse),
                                        valeur:  Number (i.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                                    }]
                                }]
                            };
                            bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data.push( suivi);
                        };
    
                    }
                }
                else
                {
                    const index1SuiviName = await bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data.findIndex ( el => el.name === req.body[o].suiviApprovisionnement.data.data.data.name);
                    
                    if (index1SuiviName !== -1)
                    {
                        //for data of Name 
                        const objSuivi = 
                        {
                            qt_caisse: Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse),
                            valeur: Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                        };
                        bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].data.push(objSuivi);
                
                        //for statistics
                        const indexStatsSuiviAnnee = bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats.findIndex(el => el.annee === Number ( new Date().toLocaleDateString().slice(6)));
        
                        if ( indexStatsSuiviAnnee !== -1 )
                        {
                            const indexStatsSuiviMois = bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data.findIndex (el => el.mois === Number ( new Date().toLocaleDateString().slice (3, 5)));
                            if ( indexStatsSuiviMois !== -1)
                            {
                                const objStatsSuivi = 
                                {
                                    name: req.body[o].suiviApprovisionnement.data.data.data.name,
                                    mois: bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].mois,
                                    qt_caisse:  Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse) + bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].qt_caisse,
                                    valeur: (Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)) + bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].valeur
                                };
                                bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois] = objStatsSuivi;
                            }
                            else
                            {
                                const objSuivi2 = 
                                {
                                    name: req.body[o].suiviApprovisionnement.data.data.data.name,
                                    mois: Number ( new Date().toLocaleDateString().slice (3, 5)) , 
                                    qt_caisse: Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse),
                                    valeur: Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                                };
                                bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data.push(objSuivi2);
                            };
                            
                        }
                        else
                        {
                            const newStats = 
                            {
                                annee: Number ( new Date().toLocaleDateString().slice (6)) ,
                                data: [{
                                    name: req.body[o].suiviApprovisionnement.name,
                                    mois:  Number ( new Date().toLocaleDateString().slice (3, 5)),
                                    qt_caisse: Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse),
                                    valeur: Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                                }]
                            };
                            bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats.push(newStats);
                        };
                
                    }
                    else
                    {
                        const suivi = 
                        {
                            
                            name: req.body[o].suiviApprovisionnement.data.data.data.name,
                            data: [{
                                mois: Number ( new Date().toLocaleDateString().slice (3, 5)) , 
                                qt_caisse:  Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse),
                                valeur:  Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                            }],
                            stats: [{
                                
                                annee: Number ( new Date().toLocaleDateString().slice (6)),
                                data: [{
                                    name: req.body[o].suiviApprovisionnement.data.data.data.name,
                                    mois: Number ( new Date().toLocaleDateString().slice (3, 5)),
                                    qt_caisse: Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse),
                                    valeur:  Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                                }]
                            }]
                        };
                        bralima[o].suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data.push( suivi);
                    };
    
                }
            }
            else
            {
                if (Array.isArray ( req.body[o].suiviApprovisionnement.data.data.data)) 
                {
                    const data = []
    
                    for ( let i of req.body[o].suiviApprovisionnement.data.data.data )
                    {
                        const dataDetail = 
                        {
                            name: i.name,
                            data:[
                                {
                                    mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                                    qt_caisse: Number (i.qt_caisse),
                                    valeur: Number (i.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                                }
                            ],
                            stats: [{
                                annee: Number ( new Date().toLocaleDateString().slice(6) ),
                                data: [{
                                    name: i.name,
                                    mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                                    qt_caisse: Number (i.qt_caisse),
                                    valeur: Number (i.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                                }]
                            }]
                        };
                        data.push(dataDetail);
                    };
    
                    const suivi2 =
                    {
                        mois: Number ( new Date().toLocaleTimeString().slice(3, 5)),
                        data: data 
                    };
                    bralima[o].suiviApprovisionnement[indexStatsSuiviAnnee].data.push(suivi2);
                }
                else
                {
    
                    const suivi2 = 
                    {
                        mois: Number ( new Date().toLocaleTimeString().slice(3, 5)),
                        data:
                        {
                            name: req.body[o].suiviApprovisionnement.data.data.data.name,
                            data: [{
                                mois: Number ( new Date().toLocaleDateString().slice (3, 5)) , 
                                qt_caisse:  Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse),
                                valeur:  Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                            }],
                            stats: [{
                                
                                annee: Number ( new Date().toLocaleDateString().slice (6)),
                                data: [{
                                    name: req.body.suiviApprovisionnement.data.data.data.name,
                                    mois: Number ( new Date().toLocaleDateString().slice (3, 5)),
                                    qt_caisse: Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse),
                                    valeur:  Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                                }]
                            }]
                        }
        
                    };
        
                    bralima[o].suiviApprovisionnement[indexStatsSuiviAnnee].data.push(suivi2);
                }
            }
        }
    
        else
        {
            if (Array.isArray ( req.body[o].suiviApprovisionnement.data.data.data))
            {
                const data = [];

                for ( let i of req.body[o].suiviApprovisionnement.data.data.data )
                {
                    const dataDetail = 
                    {
                        name: i.name,
                        data:[
                            {
                                mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                                qt_caisse: Number (i.qt_caisse),
                                valeur: Number (i.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                            }
                        ],
                        stats: [{
                            annee: Number ( new Date().toLocaleDateString().slice(6) ),
                            data: [{
                                name: i.name,
                                mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                                qt_caisse: Number (i.qt_caisse),
                                valeur: Number (i.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                            }]
                        }]
                    };
                    data.push(dataDetail);
                };
    
                const suivi = 
                {
                    annee: Number (new Date().toLocaleDateString().slice(6)),
                    data:
                    {
                        mois: Number ( new Date().toLocaleDateString().slice(3, 5)),
                        data: data
                    }
                };
    
                bralima[o].suiviApprovisionnement.push(suivi);
            }
    
            else
            {
                const suivi = 
                {
                    annee: Number (new Date().toLocaleDateString().slice(6)),
                    data:
                    {
                        mois: Number ( new Date().toLocaleTimeString().slice(3, 5)),
                        data:
                        {
                            name: req.body[o].suiviApprovisionnement.data.data.data.name,
                            data: [{
                                mois: Number ( new Date().toLocaleDateString().slice (3, 5)) , 
                                qt_caisse:  Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse),
                                valeur:  Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                            }],
                            stats: [{
                                
                                annee: Number ( new Date().toLocaleDateString().slice (6)),
                                data: [{
                                    name: req.body[o].suiviApprovisionnement.data.data.data.name,
                                    mois: Number ( new Date().toLocaleDateString().slice (3, 5)),
                                    qt_caisse: Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse),
                                    valeur:  Number (req.body[o].suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body[o].data.data.data.achat_journalier.prix_achat_gros)
                                }]
                            }]
                        }
                    }
                }
                bralima[o].suiviApprovisionnement.push(suivi);
            }
        }
    
        ///Statistics 
        if ( index1 !== -1 ) 
        {
            const index2 = await bralima[o].stats[index1].data.findIndex (el => el.mois === Number ( new Date().toLocaleDateString().slice (3, 5)));
    
            if ( index2 !== -1)
            {
                const statsObj = 
                {
                    name: bralima[o].name,
                    mois: bralima[o].stats[index1].data[index2].mois,
                    vente_bar: Number ( bralima[o].stats[index1].data[index2].vente_bar) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].vente_journaliere.valeur),
                    approvionnement:  Number (bralima[o].stats[index1].data[index2].approvionnement) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].benefice_sur_achat.val_gros_approvisionnement),
                    benefice:  Number (bralima[o].stats[index1].data[index2].benefice) + Number (bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data[bralima[o].data[bralima[o].data.length - 1].data[bralima[o].data[bralima[o].data.length - 1].data.length -1].data.length -1].benefice_sur_vente)
                }
    
                bralima[o].stats[index1].data[index2] = statsObj;
            }
            else
            {
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
    }

    res.status(200).json
    (
        {
            status: 'success',
            data: {
                dataBralima
            }
        }
    );
});

exports.updateDataAutreProduit = catchAssynch ( async ( req, res, next) =>
{
    const bralima = await AutreProduit.find();
    const dataBralima = [];
    const year = Number (req.query.date.slice(0, 4 ) );
    const month = Number (req.query.date.slice(4, 6 ));
    const day = Number (req.query.date.slice(4, 8 ));

    for (let i = 0; i < bralima.length; i++)
    {
        const yearIndex = await bralima[i].data.findIndex ( el => el.annee === year );

        if ( yearIndex !== -1 ) 
        {
            const monthIndex = await bralima[i].data[yearIndex].data.findIndex( el => el.mois === month );
    
            if ( monthIndex !== -1 )
            {
                const dayIndex = await bralima[i].data[yearIndex].data[monthIndex].data.findIndex( el => Number (JSON.stringify(el.createdAt).slice (9, 11)) === day);
    
                let index1 = await bralima[i].stats.findIndex (el => el.annee === Number (JSON.stringify( i.data[yearIndex].data[monthIndex].data[dayIndex].createdAt).slice (1, 5) ));

                //Index Suivi (Year, Month and Day );
                const yearIndexSuivi = await bralima[i].suiviApprovisionnement.findIndex (el => el.annee === year);
                const monthIndexSuivi = await bralima[i].suiviApprovisionnement[yearIndexSuivi].data.findIndex (el => el.mois === month);
                //day index suivi i'm try to find a way to find coz it's so difficult to find isn't on the top of an object
                for (let g = 0; g < bralima[i].suiviApprovisionnement[yearIndexSuivi].data[monthIndexSuivi].data.length; g++)
                {
                    //must work with indexs not iterations
                    for (let a = 0; a < bralima[i].suiviApprovisionnement[yearIndexSuivi].data[monthIndexSuivi].data[g].data.length; a++ )  
                    {
                        if (bralima[i].suiviApprovisionnement[yearIndexSuivi].data[monthIndexSuivi].data[g].name === req.body[i].suiviApprovisionnement.data.data.data[] )
                        // const dayIndexSuivi = await bralima[i].suiviApprovisionnement[yearIndexSuivi].data[monthIndexSuivi].data[g].data[a].findIndex(el => Number (JSON.stringify(el.createdAt)) === day );

                    }
                }





                if ( dayIndex !== -1)
                {
                    if ( index1 !== -1 )
                    {
                        let index2 = await bralima[i].stats[index1].data.findIndex (el => el.mois === Number (JSON.stringify (bralima[i].data[yearIndex].data[monthIndex].data[dayIndex].createdAt).slice (6, 8)));
            
                        if ( index2 !== -1)
                        {
                            const statsObj1 =  
                            {
                                name: bralima.name,
                                mois: bralima.stats[index1].data[index2].mois,
                                vente_bar: Number (bralima.stats[index1].data[index2].vente_bar) - Number (bralima.data[yearIndex].data[monthIndex].data[dayIndex].vente_journaliere.valeur),
                                approvionnement: Number ( bralima.stats[index1].data[index2].approvionnement) - Number ( bralima.data[yearIndex].data[monthIndex].data[dayIndex].benefice_sur_achat.val_gros_approvisionnement),
                                benefice: Number (bralima.stats[index1].data[index2].benefice) -  Number (bralima.data[yearIndex].data[monthIndex].data[dayIndex].benefice_sur_vente)
                            };
            
                            bralima.data[yearIndex].data[monthIndex].data[dayIndex] = req.body;
                            await bralima.save();
             /////////////////////////////////////recherche d'Id apres la modificaton du document///////////////////////////////////////////////////////////
                           
                            
                            const statsObj2 =  
                            {
                                name: bralima.name,
                                mois: statsObj1.mois,
                                vente_bar: Number (bralima.data[yearIndex].data[monthIndex].data[dayIndex].vente_journaliere.valeur) + Number (statsObj1.vente_bar),
                                approvionnement: Number ( bralima.data[yearIndex].data[monthIndex].data[dayIndex].benefice_sur_achat.val_gros_approvisionnement) + Number (statsObj1.approvionnement),
                                benefice: Number (bralima.data[yearIndex].data[monthIndex].data[dayIndex].benefice_sur_vente) + Number (statsObj1.benefice)
                            };
                            
                            bralima.stats[index1].data[index2] = statsObj2;
                            await bralima.save();
                            
                            res.status(200).json
                            ({
                                status: 'success',
                                data: bralima.data[yearIndex].data[monthIndex].data[dayIndex]
                            });
                        }
                        else
                        {
                            res.status(404).json(
                                {
                                    message: 'Invalid id input'
                                }
                            )
                            next();
                        }
                    }
                    else
                    {
                        res.status(404).json(
                            {
                                message: 'Invalid id input'
                            }
                        )
                        next();
                    };
                }
                else
                {
                    res.status(404).json(
                        {
                            message: 'Invalid id input'
                        }
                    )
                    next();
                };
            }
        }
        else
        {
            res.status(404).json({
                message: 'Bad request, cette donnée n"exist pas '
            })
        };
    }
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
    const year = Number (req.query.date.slice(0, 4));
    const mois = Number ( req.query.date.slice (4, 6));

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
    const year = Number (req.query.date.slice(0, 4));
    const mois = Number ( req.query.date.slice (4, 6));

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
    const year = Number (req.query.date.slice(0, 4));
    const mois = Number ( req.query.date.slice (4, 6));

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
    const year = Number (req.query.date.slice(0, 4));
    const mois = Number ( req.query.date.slice (4, 6));

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
    const year = Number (req.query.date);

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