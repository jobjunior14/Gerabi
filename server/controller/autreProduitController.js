const AppError = require ( `${__dirname}/../utils/appError.js` );
const apiFeatures = require ( `${__dirname}/../utils/apiFutures.js`);
const AutreProduit = require ( `${__dirname}/../models/autreProduitModel.js`);
const catchAssynch = require ( `${__dirname}/../utils/catchAssynch.js`);

exports.getAutreProduit = catchAssynch ( async (req, res, next) =>
{
        
    let bralima = await AutreProduit.find();


    const year = Number ( req.query.date.slice(0, 4));
    const month = Number (req.query.date.slice(4, 6));
    const page = Number (req.query.page) - 1;

    let monthData = [];
    let suiviMonthdata = [];
    const name = [];

        for ( let i of bralima)
        {
            name.push(
                {
                    name: i.name,
                    id: i._id
                }
            );
        };
    


    bralima = await bralima.filter( el =>
        { 
            if ( el.data.filter( el => {return el.annee === year;}).length)
            {
                el.data.filter( el =>
                    {
                       monthData.push(el.data.filter(el => el.mois === month))
                    });
            };
            if ( el.suiviApprovisionnement.filter( el => {return el.annee === year;}).length)
            {
                el.suiviApprovisionnement.filter( el =>
                    {
                        suiviMonthdata.push(el.data.filter(el => el.mois === month))
                    });
            };
        }
    );

    for ( let i = 0; i < monthData.length; i++)
    {
        monthData[i][0].name = name[i];
        suiviMonthdata[i][0].name = name[i];
       
    };
    
    for ( let i = 0; i < monthData.length; i++)
    
    {
        monthData[i][0].data = await [ monthData[i][0].data[page] ];
    }
    console.log (suiviMonthdata[0][0].name )
    res.status (200).json({
        status: 'success',
        data:{
            name: name,
            month: monthData,
            suivi: suiviMonthdata
        }
       
    });
});

exports.createAutreProduit = catchAssynch ( async ( req, res, next) =>
{

    const newBralimaData = await AutreProduit.create(req.body);

    const statsObj = 
    {
        annee: Number ( new Date().toLocaleDateString().slice(6) ),
        data:[{
            name: req.body.name,
            mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
            vente_bar: Number (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].vente_journaliere.valeur),
            approvionnement: Number (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].benefice_sur_achat.val_gros_approvisionnement) ,
            benefice:  Number (newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].benefice_sur_vente),
        }]
    };
    const achat = Number ( newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data[newBralimaData.data[newBralimaData.data.length - 1].data[newBralimaData.data[newBralimaData.data.length - 1].data.length -1].data.length -1].achat_journalier.prix_achat_gros);

    if (Array.isArray ( req.body.suiviApprovisionnement.data.data.data))
    {
        const data = []
        for ( let i of req.body.suiviApprovisionnement.data.data.data )
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
                    name: req.body.suiviApprovisionnement.data.data.data.name,
                    data: [{
                        mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                        qt_caisse: Number(req.body.suiviApprovisionnement.data.data.data.data.qt_caisse ),
                        valeur: Number (req.body.suiviApprovisionnement.data.data.data.data.qt_caisse ) * achat
                    }],
                    stats: [{
                        annee: Number ( new Date().toLocaleDateString().slice(6) ),
                        data: [{
                            name: req.body.suiviApprovisionnement.data.data.data.name,
                            mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                            qt_caisse: Number(req.body.suiviApprovisionnement.data.data.data.data.qt_caisse ),
                            valeur: Number (req.body.suiviApprovisionnement.data.data.data.data.qt_caisse ) * achat
                        }]
                    }]
                }
            }
        };

    newBralimaData.suiviApprovisionnement[0] = suivi
    }

    newBralimaData.stats.push(statsObj);
    await newBralimaData.save();
    res.status(201).json ({
        status: "sucess",
        data:{
             newBralimaData
        }
    });
});

exports.pushDataAutreProduit = catchAssynch ( async (req, res, next) =>
{
    const bralima = await AutreProduit.findById (req.params.id );
    
    if ( !bralima)
    {
        return next( new AppError ( 'There is no data ', 404));
    };
  
  ///////////////////////////// stats For every object/////////////////////////////////////////
    const yearindex =  await bralima.data.findIndex ( el => el.annee === Number (req.query.date.slice(0, 4)));

    if ( yearindex !== -1)
    {
        const monthindex = await bralima.data[yearindex].data.findIndex( el => el.mois === Number (req.query.date.slice(4, 6)));

        if ( monthindex !== -1)
        {
            bralima.data[yearindex].data[monthindex].data.push (req.body.data.data.data);
        }
        else
        {
            bralima.data[yearindex].data.push
            (
                {
                    "mois": Number ( new Date().toLocaleDateString().slice(3, 5) ),
                    "data":
                    {
                        "achat_journalier":
                        {
                            "qt_caisse": req.body.data.data.data.achat_journalier.qt_caisse,
                            "nbr_btll": req.body.data.data.data.achat_journalier.nbr_btll,
                            "prix_achat_gros": req.body.data.data.data.achat_journalier.prix_achat_gros
                        },
                        "vente_journaliere":
                        {
                            "ref_prix_det": req.body.data.data.data.vente_journaliere.ref_prix_det,
                        },
                        "stock_consignaions":
                        {
                            "qt": req.body.data.data.data.stock_consignaions.qt
                        },
                        "stock_apres_vente":
                        {
                            "reste_stock_comptoir":
                            {
                                "qt_btll": req.body.data.data.data.stock_apres_vente.reste_stock_comptoir.qt_btll
                            },
                            "reste_stock_depot":
                            {
                                "qt_caisses": req.body.data.data.data.stock_apres_vente.reste_stock_depot.qt_caisses
                            }
                        },
                        "val_precedente":
                        {
                            "stock_apres_ventente_rest_stock_comptoir_qt_btll": req.body.data.data.data.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll,
                            "stock_apres_ventente_rest_stock_depot_qt_btll": req.body.data.data.data.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll
                        }
                    }
                }
            );
        };
        
    }
    else
    {
        bralima.data.push(
            {
                "annee": Number ( new Date().toLocaleDateString().slice (6)),
                "data": 
                {
                    "mois": Number ( new Date().toLocaleDateString().slice(3, 5) ),
                    "data":
                    {
                        "achat_journalier":
                        {
                            "qt_caisse": req.body.data.data.data.achat_journalier.qt_caisse,
                            "nbr_btll": req.body.data.data.data.achat_journalier.nbr_btll,
                            "prix_achat_gros": req.body.data.data.data.achat_journalier.prix_achat_gros
                        },
                        "vente_journaliere":
                        {
                            "ref_prix_det": req.body.data.data.data.vente_journaliere.ref_prix_det,
                        },
                        "stock_consignaions":
                        {
                            "qt": req.body.data.data.data.stock_consignaions.qt
                        },
                        "stock_apres_vente":
                        {
                            "reste_stock_comptoir":
                            {
                                "qt_btll": req.body.data.data.data.stock_apres_vente.reste_stock_comptoir.qt_btll
                            },
                            "reste_stock_depot":
                            {
                                "qt_caisses": req.body.data.data.data.stock_apres_vente.reste_stock_depot.qt_caisses
                            }
                        },
                        "val_precedente":
                        {
                            "stock_apres_ventente_rest_stock_comptoir_qt_btll": req.body.data.data.data.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll,
                            "stock_apres_ventente_rest_stock_depot_qt_btll": req.body.data.data.data.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll
                        }
                    }
                }
            }
        );
    };



    //saving the data in the server so we can work with the new data ///////////////////////////
    await  bralima.save();

    const index1 = await bralima.stats.findIndex (el => el.annee === Number ( new Date().toLocaleDateString().slice (6)));
    const yearIndexsuivi = await bralima.suiviApprovisionnement.findIndex( el => el.annee === Number ( new Date().toLocaleDateString().slice (6)));
    if ( yearIndexsuivi !== -1)
    {
        const monthIndexSuvi = await bralima.suiviApprovisionnement[yearIndexsuivi].data.findIndex ( el => el.mois === Number ( new Date().toLocaleDateString().slice(3, 5)));
        
        if ( monthIndexSuvi !== -1)
        {
            if (Array.isArray ( req.body.suiviApprovisionnement.data.data.data))
            {
                
                for ( let i of req.body.suiviApprovisionnement.data.data.data)
                {
                    const index1SuiviName = await bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data.findIndex ( el => el.name === i.name);
                    
                    if (index1SuiviName !== -1)
                    {
                        //for data of Name 
                        const objSuivi = 
                        {
                            qt_caisse: Number (i.qt_caisse),
                            valeur: Number (i.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                        };
                        bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].data.push(objSuivi);
                
                        //for statistics
                        const indexStatsSuiviAnnee = bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats.findIndex(el => el.annee === Number ( new Date().toLocaleDateString().slice(6)));
    
                        if ( indexStatsSuiviAnnee !== -1 )
                        {
                            const indexStatsSuiviMois = bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data.findIndex (el => el.mois === Number ( new Date().toLocaleDateString().slice (3, 5)));
                            if ( indexStatsSuiviMois !== -1)
                            {
                                const objStatsSuivi = 
                                {
                                    name: i.name,
                                    mois: bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].mois,
                                    qt_caisse:  Number (i.qt_caisse) + bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].qt_caisse,
                                    valeur: (Number (i.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)) + bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].valeur
                                };
                                bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois] = objStatsSuivi;
                            }
                            else
                            {
                                const objSuivi2 = 
                                {
                                    name: i.name,
                                    mois: Number ( new Date().toLocaleDateString().slice (3, 5)) , 
                                    qt_caisse: Number (i.qt_caisse),
                                    valeur: Number (i.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                                };
                                bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data.push(objSuivi2);
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
                                    valeur: Number (i.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                                }]
                            };
                            bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats.push(newStats);
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
                                valeur:  Number (i.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                            }],
                            stats: [{
                                
                                annee: Number ( new Date().toLocaleDateString().slice (6)),
                                data: [{
                                    name: i.name,
                                    mois: Number ( new Date().toLocaleDateString().slice (3, 5)),
                                    qt_caisse: Number (i.qt_caisse),
                                    valeur:  Number (i.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                                }]
                            }]
                        };
                        bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data.push( suivi);
                    };

                }
            }
            else
            {
                const index1SuiviName = await bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data.findIndex ( el => el.name === req.body.suiviApprovisionnement.data.data.data.name);
                
                if (index1SuiviName !== -1)
                {
                    //for data of Name 
                    const objSuivi = 
                    {
                        qt_caisse: Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse),
                        valeur: Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                    };
                    bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].data.push(objSuivi);
            
                    //for statistics
                    const indexStatsSuiviAnnee = bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats.findIndex(el => el.annee === Number ( new Date().toLocaleDateString().slice(6)));
    
                    if ( indexStatsSuiviAnnee !== -1 )
                    {
                        const indexStatsSuiviMois = bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data.findIndex (el => el.mois === Number ( new Date().toLocaleDateString().slice (3, 5)));
                        if ( indexStatsSuiviMois !== -1)
                        {
                            const objStatsSuivi = 
                            {
                                name: req.body.suiviApprovisionnement.data.data.data.name,
                                mois: bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].mois,
                                qt_caisse:  Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse) + bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].qt_caisse,
                                valeur: (Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)) + bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].valeur
                            };
                            bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois] = objStatsSuivi;
                        }
                        else
                        {
                            const objSuivi2 = 
                            {
                                name: req.body.suiviApprovisionnement.data.data.data.name,
                                mois: Number ( new Date().toLocaleDateString().slice (3, 5)) , 
                                qt_caisse: Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse),
                                valeur: Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                            };
                            bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats[indexStatsSuiviAnnee].data.push(objSuivi2);
                        };
                        
                    }
                    else
                    {
                        const newStats = 
                        {
                            annee: Number ( new Date().toLocaleDateString().slice (6)) ,
                            data: [{
                                name: req.body.suiviApprovisionnement.name,
                                mois:  Number ( new Date().toLocaleDateString().slice (3, 5)),
                                qt_caisse: Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse),
                                valeur: Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                            }]
                        };
                        bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data[index1SuiviName].stats.push(newStats);
                    };
            
                }
                else
                {
                    const suivi = 
                    {
                        
                        name: req.body.suiviApprovisionnement.data.data.data.name,
                        data: [{
                            mois: Number ( new Date().toLocaleDateString().slice (3, 5)) , 
                            qt_caisse:  Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse),
                            valeur:  Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                        }],
                        stats: [{
                            
                            annee: Number ( new Date().toLocaleDateString().slice (6)),
                            data: [{
                                name: req.body.suiviApprovisionnement.data.data.data.name,
                                mois: Number ( new Date().toLocaleDateString().slice (3, 5)),
                                qt_caisse: Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse),
                                valeur:  Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                            }]
                        }]
                    };
                    bralima.suiviApprovisionnement[yearIndexsuivi].data[monthIndexSuvi].data.push( suivi);
                };

            }
        }
        else
        {
            if (Array.isArray ( req.body.suiviApprovisionnement.data.data.data)) 
            {
                const data = []

                for ( let i of req.body.suiviApprovisionnement.data.data.data )
                {
                    const dataDetail = 
                    {
                        name: i.name,
                        data:[
                            {
                                mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                                qt_caisse: Number (i.qt_caisse),
                                valeur: Number (i.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                            }
                        ],
                        stats: [{
                            annee: Number ( new Date().toLocaleDateString().slice(6) ),
                            data: [{
                                name: i.name,
                                mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                                qt_caisse: Number (i.qt_caisse),
                                valeur: Number (i.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
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
                bralima.suiviApprovisionnement[indexStatsSuiviAnnee].data.push(suivi2);
            }
            else
            {

                const suivi2 = 
                {
                    mois: Number ( new Date().toLocaleTimeString().slice(3, 5)),
                    data:
                    {
                        name: req.body.suiviApprovisionnement.data.data.data.name,
                        data: [{
                            mois: Number ( new Date().toLocaleDateString().slice (3, 5)) , 
                            qt_caisse:  Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse),
                            valeur:  Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                        }],
                        stats: [{
                            
                            annee: Number ( new Date().toLocaleDateString().slice (6)),
                            data: [{
                                name: req.body.suiviApprovisionnement.data.data.data.name,
                                mois: Number ( new Date().toLocaleDateString().slice (3, 5)),
                                qt_caisse: Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse),
                                valeur:  Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                            }]
                        }]
                    }
    
                };
    
                bralima.suiviApprovisionnement[indexStatsSuiviAnnee].data.push(suivi2);
            }
        }
    }

    else
    {
        if (Array.isArray ( req.body.suiviApprovisionnement.data.data.data))
        {
            const data = []
            for ( let i of req.body.suiviApprovisionnement.data.data.data )
            {
                const dataDetail = 
                {
                    name: i.name,
                    data:[
                        {
                            mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                            qt_caisse: Number (i.qt_caisse),
                            valeur: Number (i.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                        }
                    ],
                    stats: [{
                        annee: Number ( new Date().toLocaleDateString().slice(6) ),
                        data: [{
                            name: i.name,
                            mois: Number ( new Date().toLocaleDateString().slice(3, 5) ),
                            qt_caisse: Number (i.qt_caisse),
                            valeur: Number (i.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
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

            bralima.suiviApprovisionnement.push(suivi);
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
                        name: req.body.suiviApprovisionnement.data.data.data.name,
                        data: [{
                            mois: Number ( new Date().toLocaleDateString().slice (3, 5)) , 
                            qt_caisse:  Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse),
                            valeur:  Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                        }],
                        stats: [{
                            
                            annee: Number ( new Date().toLocaleDateString().slice (6)),
                            data: [{
                                name: req.body.suiviApprovisionnement.data.data.data.name,
                                mois: Number ( new Date().toLocaleDateString().slice (3, 5)),
                                qt_caisse: Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse),
                                valeur:  Number (req.body.suiviApprovisionnement.data.data.data.qt_caisse) * Number (req.body.data.data.data.achat_journalier.prix_achat_gros)
                            }]
                        }]
                    }
                }
            }
            bralima.suiviApprovisionnement.push(suivi);
        }
    }

    ///Statistics 
    if ( index1 !== -1 ) 
    {
        const index2 = await bralima.stats[index1].data.findIndex (el => el.mois === Number ( new Date().toLocaleDateString().slice (3, 5)));

        if ( index2 !== -1)
        {
            const statsObj = 
            {
                name: bralima.name,
                mois: bralima.stats[index1].data[index2].mois,
                vente_bar: Number ( bralima.stats[index1].data[index2].vente_bar) + Number (bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data[bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data.length -1].vente_journaliere.valeur),
                approvionnement:  Number (bralima.stats[index1].data[index2].approvionnement) + Number (bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data[bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data.length -1].benefice_sur_achat.val_gros_approvisionnement),
                benefice:  Number (bralima.stats[index1].data[index2].benefice) + Number (bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data[bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data.length -1].benefice_sur_vente)
            }

            bralima.stats[index1].data[index2] = statsObj;
        }
        else
        {
            const statsObj =  
            {
                name: bralima.name,
                mois: Number ( new Date().toLocaleDateString().slice (3, 5)) ,
                vente_bar: Number (bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data[bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data.length -1].vente_journaliere.valeur) ,
                approvionnement: Number (bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data[bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data.length -1].benefice_sur_achat.val_gros_approvisionnement),
                benefice: Number (bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data[bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data.length -1].benefice_sur_vente)
            };

            bralima.stats[index1].data.push (statsObj);
        }
    }
    else
    {
        const statsObj =  
        {
            annee: Number ( new Date().toLocaleDateString().slice (6)) ,
            data:[{
                name: bralima.name,
                mois: Number ( new Date().toLocaleDateString().slice (3, 5)) ,
                vente_bar: Number (bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data[bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data.length -1].vente_journaliere.valeur) ,
                approvionnement: Number (bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data[bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data.length -1].benefice_sur_achat.val_gros_approvisionnement),
                benefice: Number (bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data[bralima.data[bralima.data.length - 1].data[bralima.data[bralima.data.length - 1].data.length -1].data.length -1].benefice_sur_vente)
            }]
        };
        bralima.stats.push(statsObj);
    };

    
    await bralima.save();

    res.status(200).json
    (
        {
            status: 'success',
            data: {
                bralima
            }
        }
    );
});

exports.updateDataAutreProduit = catchAssynch ( async ( req, res, next) =>
{
    const bralima = await AutreProduit.findById ( req.params.id1);
    
    const yearIndex = await bralima.data.findIndex ( el => el.annee === req.query.date.slice(0, 4));

    if ( yearIndex !== -1 ) 
    {
        const monthIndex = await bralima.data[yearIndex].data.findIndex( el => el.mois === req.query.date.slice(4, 6));

        if ( monthIndex !== -1 )
        {

            const indexof = await bralima.data[yearIndex].data[monthIndex].data.findIndex( el => el.id === req.params.id2);
            let index1 = await bralima.stats.findIndex (el => el.annee === Number (JSON.stringify(bralima.data[yearIndex].data[monthIndex].data[indexof].createdAt).slice (1, 5) ));
        
            if ( indexof !== -1)
            {
                if ( index1 !== -1 )
                {
                    let index2 = await bralima.stats[index1].data.findIndex (el => el.mois === Number (JSON.stringify (bralima.data[yearIndex].data[monthIndex].data[indexof].createdAt).slice (6, 8)));
        
                    if ( index2 !== -1)
                    {
                        const statsObj1 =  
                        {
                            name: bralima.name,
                            mois: bralima.stats[index1].data[index2].mois,
                            vente_bar: Number (bralima.stats[index1].data[index2].vente_bar) - Number (bralima.data[yearIndex].data[monthIndex].data[indexof].vente_journaliere.valeur),
                            approvionnement: Number ( bralima.stats[index1].data[index2].approvionnement) - Number ( bralima.data[yearIndex].data[monthIndex].data[indexof].benefice_sur_achat.val_gros_approvisionnement),
                            benefice: Number (bralima.stats[index1].data[index2].benefice) -  Number (bralima.data[yearIndex].data[monthIndex].data[indexof].benefice_sur_vente)
                        };
        
                        bralima.data[yearIndex].data[monthIndex].data[indexof] = req.body;
                        await bralima.save();
         /////////////////////////////////////recherche d'Id apres la modificaton du document///////////////////////////////////////////////////////////
                       
                        
                        const statsObj2 =  
                        {
                            name: bralima.name,
                            mois: statsObj1.mois,
                            vente_bar: Number (bralima.data[yearIndex].data[monthIndex].data[indexof].vente_journaliere.valeur) + Number (statsObj1.vente_bar),
                            approvionnement: Number ( bralima.data[yearIndex].data[monthIndex].data[indexof].benefice_sur_achat.val_gros_approvisionnement) + Number (statsObj1.approvionnement),
                            benefice: Number (bralima.data[yearIndex].data[monthIndex].data[indexof].benefice_sur_vente) + Number (statsObj1.benefice)
                        };
                        
                        bralima.stats[index1].data[index2] = statsObj2;
                        await bralima.save();
                        
                        res.status(200).json
                        ({
                            status: 'success',
                            data: bralima.data[yearIndex].data[monthIndex].data[indexof]
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

        // {
        //     $unwind: {path: "$suiviApprovisionnement"}
        // },

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
    })
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
    })
});