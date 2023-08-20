const AppError = require ( `${__dirname}/../utils/appError.js` );
const apiFeatures = require ( `${__dirname}/../utils/apiFutures.js`);
const Liqueurs = require ( `${__dirname}/../models/liqueursModel.js`);
const catchAssynch = require ( `${__dirname}/../utils/catchAssynch.js`);

exports.getLiqueurs = catchAssynch ( async (req, res, next) =>
{
    
    const features = new apiFeatures (Liqueurs.find(), req.body).filter();
    const bralima = await features;

    res.status (200).json({
        data: { bralima}
    })
});

exports.createLiqueurs = catchAssynch ( async ( req, res, next) =>
{
    const newBralimaData = await Liqueurs.create(req.body);

    const statsObj = 
    {
        annee: JSON.stringify(newBralimaData.data[newBralimaData.data.length - 1].createdAt).slice (1, 5) + newBralimaData.name,
        data:[{
            mois: JSON.stringify(newBralimaData.data[newBralimaData.data.length - 1].createdAt).slice (6, 8) + newBralimaData.name,
            vente_bar: Number (newBralimaData.data[newBralimaData.data.length - 1].vente_journaliere.valeur),
            approvionnement: Number (newBralimaData.data[newBralimaData.data.length - 1].benefice_sur_achat.val_gros_approvisionnement) ,
            benefice:  Number (newBralimaData.data[newBralimaData.data.length - 1].benefice_sur_vente),
        }]
    };

    newBralimaData.stats.push(statsObj);
    
   await newBralimaData.save();
    res.status(201).json ({
        status: "sucess",
        data:{
             newBralimaData
        }
    });
});

exports.pushDataLiqueurs = catchAssynch ( async (req, res, next) =>
{
    const bralima = await Liqueurs.findById (req.params.id );
    
    if ( !bralima)
    {
        return next( new AppError ( 'There is no data ', 404));
    };
  
  ///////////////////////////// stats For every object/////////////////////////////////////////

    bralima.data.push (req.body);

    //saving the data in the server so we can work with the new data ///////////////////////////
    await  bralima.save()

    const index1 = await bralima.stats.findIndex (el => el.annee.slice(0, 4) === JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (1, 5) );

    if ( index1 !== -1 ) 
    {
        const index2 = await bralima.stats[index1].data.findIndex (el => el.mois.slice(0, 2) === JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (6, 8));

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
                mois: JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (6, 8) + bralima.stats[index1].data[index2].mois.slice(0, 2),
                vente_bar: Number (bralima.data[bralima.data.length - 1].vente_journaliere.valeur) ,
                approvionnement:  Number ( bralima.data[bralima.data.length - 1].benefice_sur_achat.val_gros_approvisionnement),
                benefice: Number (bralima.data[bralima.data.length - 1].benefice_sur_vente)
            };

            bralima.stats[index1].data.push (statsObj);
        }
    }
    else
    {
        const statsObj =  
        {
            annee: JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (1, 5) + bralima.stats[0].name.slice(4),
            data:[{
                mois: JSON.stringify (bralima.data[bralima.data.length - 1].createdAt).slice (5, 7) + bralima.stats[0].data[0].mois.slice (2),
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

exports.updateDataLiqueurs = catchAssynch ( async ( req, res, next) =>
{
    const bralima = await Liqueurs.findById ( req.params.id1);

    const indexof = await bralima.data.findIndex( el => el.id === req.params.id2);
    let index1 = await bralima.stats.findIndex (el => el.annee.slice(0, 4) === JSON.stringify (bralima.data[indexof].createdAt).slice (1, 5) );

    if ( indexof !== -1)
    {
        if ( index1 !== -1 )
        {

            let index2 = await bralima.stats[index1].data.findIndex (el => el.mois.slice(0, 2) === JSON.stringify (bralima.data[indexof].createdAt).slice (6, 8));

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

exports.getOneDataLiqueurs = catchAssynch ( async  ( req, res, next) =>
{
    const bralimaOneData = await Liqueurs.findById( req.params.id );

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


exports.stastLiqueurs  = catchAssynch ( async ( req, res, next) =>
{
    const stats = await Liqueurs.aggregate([
    { 
        $unwind: { path: "$stats"}
    },
    ]);

   
    res.status(200).json (
        {
            status: 'success',
            stats: {
                stats
            }
        }
    );
});