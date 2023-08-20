const AppError = require ( `${__dirname}/../utils/appError.js` );
const apiFeatures = require ( `${__dirname}/../utils/apiFutures.js`);
const AutreProduit = require ( `${__dirname}/../models/autreProduitModel.js`);
const catchAssynch = require ( `${__dirname}/../utils/catchAssynch.js`);

exports.getAutreProduit = catchAssynch ( async (req, res, next) =>
{
    
    const features = new apiFeatures (AutreProduit.find(), req.body).filter();
    const bralima = await features;

    res.status (200).json({
        data: { bralima}
    })
});

exports.createAutreProduit = catchAssynch ( async ( req, res, next) =>
{
    const newBralimaData = await AutreProduit.create(req.body);

    const statsObj = 
    {
        annee: Number (JSON.stringify(newBralimaData.data[newBralimaData.data.length - 1].createdAt).slice (1, 5)) ,
        data:[{
            mois: Number (JSON.stringify(newBralimaData.data[newBralimaData.data.length - 1].createdAt).slice (6, 8)) ,
            vente_bar: Number (newBralimaData.data[newBralimaData.data.length - 1].vente_journaliere.valeur),
            approvionnement: Number (newBralimaData.data[newBralimaData.data.length - 1].benefice_sur_achat.val_gros_approvisionnement) ,
            benefice:  Number (newBralimaData.data[newBralimaData.data.length - 1].benefice_sur_vente),
        }]
    };
    const achat = Number ( newBralimaData.data[newBralimaData.data.length -1].achat_journalier.prix_achat_gros);

    const suivi = 
    {
        name: newBralimaData.suiviApprovisionnement[0].name ,
        data: [{
            mois: Number (JSON.stringify(newBralimaData.data[newBralimaData.data.length - 1].createdAt).slice (6, 8)) , 
            qt_caisse: Number( newBralimaData.suiviApprovisionnement[0].data[0].qt_caisse ),
            valeur: Number ( newBralimaData.suiviApprovisionnement[0].data[0].qt_caisse ) * achat
        }],
        stats: [{
            annee: Number (JSON.stringify(newBralimaData.data[newBralimaData.data.length - 1].createdAt).slice (1, 5)) ,
            data: [{
                mois: Number (JSON.stringify(newBralimaData.data[newBralimaData.data.length - 1].createdAt).slice (6, 8)),
                qt_caisse: Number( newBralimaData.suiviApprovisionnement[0].data[0].qt_caisse ),
                valeur: Number ( newBralimaData.suiviApprovisionnement[0].data[0].qt_caisse) * achat,
            }]
        }]
    };

    newBralimaData.suiviApprovisionnement[0] = suivi
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

    bralima.data.push (req.body.data);

    //saving the data in the server so we can work with the new data ///////////////////////////
    await  bralima.save()

    const index1 = await bralima.stats.findIndex (el => el.annee === Number (JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (1, 5)) );
    const index1SuiviName = await bralima.suiviApprovisionnement.findIndex ( el => el.name === req.body.suiviApprovisionnement.name);

    if (index1SuiviName !== -1)
    {
        //for data of Name 
        const objSuivi = 
        {
            qt_caisse: Number (req.body.suiviApprovisionnement.qt_caisse),
            valeur: Number (req.body.suiviApprovisionnement.qt_caisse) * Number (req.body.data.achat_journalier.prix_achat_gros)
        };
        bralima.suiviApprovisionnement[index1SuiviName].data.push(objSuivi);

        //for statistics
        const indexStatsSuiviAnnee = bralima.suiviApprovisionnement[index1SuiviName].stats.findIndex(el => el.annee === Number (JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (1, 5)));
        if ( indexStatsSuiviAnnee !== -1 )
        {
            const indexStatsSuiviMois = bralima.suiviApprovisionnement[index1SuiviName].stats[indexStatsSuiviAnnee].data.findIndex (el => el.mois === Number (JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (6, 8)));
            if ( indexStatsSuiviMois !== -1)
            {
                const objStatsSuivi = 
                {
                    mois: bralima.suiviApprovisionnement[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].mois,
                    qt_caisse:  Number (req.body.suiviApprovisionnement.qt_caisse) + bralima.suiviApprovisionnement[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].qt_caisse,
                    valeur: (Number (req.body.suiviApprovisionnement.qt_caisse) * Number (req.body.data.achat_journalier.prix_achat_gros)) + bralima.suiviApprovisionnement[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois].valeur
                };
                bralima.suiviApprovisionnement[index1SuiviName].stats[indexStatsSuiviAnnee].data[indexStatsSuiviMois] = objStatsSuivi;
            }
            else
            {
                const objSuivi2 = 
                {
                    qt_caisse: Number (req.body.suiviApprovisionnement.qt_caisse),
                    valeur: Number (req.body.suiviApprovisionnement.qt_caisse) * Number (req.body.data.achat_journalier.prix_achat_gros)
                };
                bralima.suiviApprovisionnement[index1SuiviName].stats[indexStatsSuiviAnnee].data.push(objSuivi2);
            };
            
        }
        else
        {
            const newStats = 
            {
                annee: Number (JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (1, 5)) ,
                data: [{
                    mois:  Number (JSON.stringify(bralima.data[bralima.data.length - 1].createdAt).slice (6, 8)),
                    qt_caisse: Number (req.body.suiviApprovisionnement.qt_caisse),
                    valeur: Number (req.body.suiviApprovisionnement.qt_caisse) * Number (req.body.data.achat_journalier.prix_achat_gros)
                }]
            };
            bralima.suiviApprovisionnement[index1SuiviName].stats.push(newStats);
        };

    }
    else
    {
        const suivi = 
        {
            name: req.body.suiviApprovisionnement.name,
            data: [{
                mois: Number (JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (5, 7)) , 
                qt_caisse:  Number (req.body.suiviApprovisionnement.qt_caisse),
                valeur:  Number (req.body.suiviApprovisionnement.qt_caisse) * Number (req.body.data.achat_journalier.prix_achat_gros)
            }],
            stats: [{
                annee: Number (JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (1, 5)),
                data: [{
                    mois: Number (JSON.stringify(bralima.data[bralima.data.length - 1].createdAt).slice (6, 8)),
                    qt_caisse: Number (req.body.suiviApprovisionnement.qt_caisse),
                    valeur:  Number (req.body.suiviApprovisionnement.qt_caisse) * Number (req.body.data.achat_journalier.prix_achat_gros)
                }]
            }]
        };
        bralima.suiviApprovisionnement.push( suivi);
    };

    if ( index1 !== -1 ) 
    {
        const index2 = await bralima.stats[index1].data.findIndex (el => el.mois === Number (JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (6, 8)));

        if ( index2 !== -1)
        {
            const statsObj = 
            {
                mois: bralima.stats[index1].data[index2].mois,
                vente_bar: Number ( bralima.stats[index1].data[index2].vente_bar) + Number (bralima.data[bralima.data.length - 1].vente_journaliere.valeur),
                approvionnement:  Number (bralima.stats[index1].data[index2].approvionnement) + Number ( bralima.data[bralima.data.length - 1].benefice_sur_achat.val_gros_approvisionnement),
                benefice:  Number (bralima.stats[index1].data[index2].benefice) + Number (bralima.data[bralima.data.length - 1].benefice_sur_vente)
            }

            bralima.stats[index1].data[index2] = statsObj;
        }
        else
        {
            const statsObj =  
            {
                mois: Number (JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (6, 8)) ,
                vente_bar: Number (bralima.data[bralima.data.length - 1].vente_journaliere.valeur) ,
                approvionnement: Number ( bralima.data[bralima.data.length - 1].benefice_sur_achat.val_gros_approvisionnement),
                benefice: Number (bralima.data[bralima.data.length - 1].benefice_sur_vente)
            };

            bralima.stats[index1].data.push (statsObj);
        }
    }
    else
    {
        const statsObj =  
        {
            annee: Number (JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (1, 5)) ,
            data:[{
                mois: Number (JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (5, 7)) ,
                vente_bar: Number (bralima.data[bralima.data.length - 1].vente_journaliere.valeur) ,
                approvionnement: Number ( bralima.data[bralima.data.length - 1].benefice_sur_achat.val_gros_approvisionnement),
                benefice: Number (bralima.data[bralima.data.length - 1].benefice_sur_vente)
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

    const indexof = await bralima.data.findIndex( el => el.id === req.params.id2);
    let index1 = await bralima.stats.findIndex (el => el.annee === Number (JSON.stringify (bralima.data[indexof].createdAt).slice (1, 5) ));

    if ( indexof !== -1)
    {
        if ( index1 !== -1 )
        {

            let index2 = await bralima.stats[index1].data.findIndex (el => el.mois === Number (JSON.stringify (bralima.data[indexof].createdAt).slice (6, 8)));

            if ( index2 !== -1)
            {
                const statsObj1 =  
                {
                    mois: bralima.stats[index1].data[index2].mois,
                    vente_bar: Number (bralima.stats[index1].data[index2].vente_bar) - Number (bralima.data[indexof].vente_journaliere.valeur),
                    approvionnement: Number ( bralima.stats[index1].data[index2].approvionnement) - Number ( bralima.data[indexof].benefice_sur_achat.val_gros_approvisionnement),
                    benefice: Number (bralima.stats[index1].data[index2].benefice) -  Number (bralima.data[indexof].benefice_sur_vente)
                };

                bralima.data[indexof] = req.body;
                await bralima.save();
 /////////////////////////////////////recherche d'Id apres la modificaton du document///////////////////////////////////////////////////////////
               
                
                const statsObj2 =  
                {
                    mois: statsObj1.mois,
                    vente_bar: Number (bralima.data[indexof].vente_journaliere.valeur) + Number (statsObj1.vente_bar),
                    approvionnement: Number ( bralima.data[indexof].benefice_sur_achat.val_gros_approvisionnement) + Number (statsObj1.approvionnement),
                    benefice: Number (bralima.data[indexof].benefice_sur_vente) + Number (statsObj1.benefice)
                };
                
                bralima.stats[index1].data[index2] = statsObj2;
                await bralima.save();
                
                res.status(200).json
                ({
                    status: 'success',
                    data: bralima.data[indexof]
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
                _id: null,
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
            $unwind: {path: "$suiviApprovisionnement"}
        },

        {
            $project:
            {
                stats:
                {
                    $filter:
                    {
                        input: "$suiviApprovisionnement.stats",
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
                _id: null,
                valeur: { $sum: "$stats.valeur"}
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

        // {
        //     $unwind: {path: "$suiviApprovisionnement"}
        // },

        {
            $project:
            {
                stats:
                {
                    $filter:
                    {
                        input: "$suiviApprovisionnement",
                        as: "data",
                        cond: { $gt: ['data.nom', 1]}
                    }
                }
            }
        },

        {
            $unwind: { path: "$stats"}
        },

        {
            $unwind: { path: "$stats.stats"}
        },

        {
            $unwind: { path: "$stats.stats.data"}
        },

        {
            $group: 
            {
                _id: {$toUpper: "$stats.name"},
                qt_caisse: { $sum: `$stats.stats.data.qt_caisse` },
                valeur: { $sum: `$stats.stats.data.valeur` },
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