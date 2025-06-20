const AppError = require('../../utils/appError');
const loopingData = require('../../utils/loopingData');
const {statsDetail, statsAll} = require('./suiviDetteReuseFucntions')


exports.getSuiviDetteCollection = async ({collection, res, req}) => {

    const year = Number (req.params.year);
    const month = Number (req.params.month);
    const day = Number (req.params.day);

    const nowDay = Number ( new Date().getDate());
    //if we are the first day of the month, we must dispaly the information about the previous month but not save it 
    if (nowDay === 1 && day === 1) {

        const prevDate = new Date(year, month -1, day);

        //get the previous date
        const prevYear = prevDate.getFullYear();
        const prevMonth = prevDate.getMonth() + 1;

        const fournisseurs = await statsDetail(prevYear, prevMonth,'fournisseurs',collection);
        
        const newFournisseurs = [];

        let createdAt = `${year}-${month}-${day}T07:22:54.930Z`;

        //set date to the rigth format
        if ( month >= 10 && day >= 10){
        createdAt = `${year}-${month}-${day}T07:22:54.930Z`;
        } else if (month >= 10 && day < 10) {
            createdAt = `${year}-${month}-0${day}T07:22:54.930Z`;       
        } else if (month < 10 && day >= 10) {
            createdAt = `${year}-0${month}-${day}T07:22:54.930Z`;     
        } else {
            createdAt = `${year}-0${month}-0${day}T07:22:54.930Z`;
        };

        for (let i of fournisseurs) {
            
            const valeurDette = i.valeurDette - i.valeurPayment;

            if (valeurDette !== 0 ) {

                newFournisseurs.push({name: i._id, data: [{ amount: valeurDette, createdAt: createdAt }]});
            };
        };

        const Newdata = [{
            annee: year,
            data: [{
                mois: month,
                data: {
                    fournisseurs: newFournisseurs,
                }
            }]
        }];
        
        res.status(200).json({
            status: 'success',
            data: new loopingData (Newdata, year, month, day).loopingDataYourSuiviDette()
        });
    } else {
        
        const suiviDette = await collection.find();
        
        res.status(200).json({
            status: 'success',
            data: new loopingData (suiviDette, year, month, day).loopingDataYourSuiviDette()
        });
    };
};

exports.pushSuiviDetteCollection = async ({collection, res, req, next}) => {

    const suiviDette = await collection.find();

    //data from body request
    const body = req.body.data.data;
    //query's date
    const year = Number (req.query.year);
    const month = Number (req.query.month);
    const day = Number (req.query.day);

    if (suiviDette.length > 0){
        
        for ( let i = 0; i < suiviDette.length; i++) {
    
            const yearIndex = suiviDette.findIndex (el => el.annee === year);
    
            if (yearIndex !== -1) {
                
                const monthIndex = suiviDette[yearIndex].data.findIndex ( el => el.mois === month);
    
                if (monthIndex !== -1) {
    
                    for (let p = 0; p < body.fournisseurs.length; p ++){
    
                        if (body.fournisseurs[p].name !== "") {
                            
                            const indexName = suiviDette[yearIndex].data[monthIndex].data.fournisseurs.findIndex ( el => el.name.toUpperCase () === body.fournisseurs[p].name.toUpperCase());
    
                            
                            if (indexName !== -1){
                                
                                const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.fournisseurs[indexName].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                                if (existingDataIndex === -1) {
    
                                    suiviDette[yearIndex].data[monthIndex].data.fournisseurs[indexName].data.push(body.fournisseurs[p].data);
                                };
    
                            } else {
                                suiviDette[yearIndex].data[monthIndex].data.fournisseurs.push(body.fournisseurs[p]);
                            };
    
                        } else {
                            
                            return next (new AppError ('La section nom ne doit pas etre vide'), 404);
                        };
                    };
    
                } else {
    
                    //if it's a new month we push data in existing year
                    suiviDette[yearIndex].data.push({
                        mois: month,
                        data: {
                            fournisseurs: body.fournisseurs,
                        }
                    });
                };
                await suiviDette[yearIndex].save();
                
                res.status(200).json({
                    status: 'success',
                    data: new loopingData(suiviDette, year, month, day).loopingDataYourSuiviDette()
                });
    
            } else {
                
                //creating the data it's a new year
                const newSuiviDette = await collection.create(req.body);
    
                res.status(200).json({
                    status: 'success',
                    data: new loopingData([newSuiviDette], year, month, day).loopingDataYourSuiviDette()
                });
            };
        };
    } else {
        
        //creating the data if collection is empty
        const newSuiviDette = await collection.create(req.body);
        
        res.status(200).json({
            status: 'success',
            data: new loopingData([newSuiviDette], year, month, day).loopingDataYourSuiviDette()
        });
    };
};

exports.updateSuiviDetteCollection = async ({collection, res, req, next}) => {
    
    const suiviDette = await collection.find();
    
    const year = Number (req.params.year);
    const month = Number (req.params.month);
    const day = Number (req.params.day);

    const body = req.body.data.data;
    
    
    for ( let i = 0; i < suiviDette.length; i++) {
    
        const yearIndex = suiviDette.findIndex (el => el.annee === year);
        
        if (yearIndex !== -1) {
            
            const monthIndex = suiviDette[yearIndex].data.findIndex ( el => el.mois === month);
    
            if (monthIndex !== -1) {
    
                //for fournisseurs
                for (let p = 0; p < body.fournisseurs.length; p ++){
    
                    if (body.fournisseurs[p].name !== "") {

                        const indexName = suiviDette[yearIndex].data[monthIndex].data.fournisseurs.findIndex ( el => el.name.toUpperCase () === body.fournisseurs[p].name.toUpperCase());
                        
                        if (indexName !== -1){
                            
                            const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.fournisseurs[indexName].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
                            
                            if (existingDataIndex !== -1) {
                                
                                suiviDette[yearIndex].data[monthIndex].data.fournisseurs[indexName].data[existingDataIndex] = {

                                    amount: body.fournisseurs[p].data.amount,
                                    payment: body.fournisseurs[p].data.payment,
                                    createdAt: body.fournisseurs[p].data.createdAt
                                };       
                                
                            } else {

                                return next (new AppError ('cette donnee est inexistante', 404))
                            }
    
                        } else {
                            return next (new AppError ('cette donnee est inexistante', 404));
                        };
    
                    } else {
                        
                        return next (new AppError ('La section nom ne doit pas etre vide'), 404);
                    };
                };

                //save data if no error
                await suiviDette[yearIndex].save();
    
            } else {
    
                return next (new AppError ('Ce mois est inexistant dans la base des donnees', 404));
            };
            
        } else {
            
            return next (new AppError ('Cette annee est inexistante dans la base des donnees', 404));
        };
    };
    
    res.status(200).json({
        status: 'success',
        data: new loopingData(suiviDette, year, month, day).loopingDataYourSuiviDette()
    });
};

exports.lastCreatedDataSuiviDetteCollection = async ({collection, res, req}) => {

    const suiviDette = await collection.find();
    
    const year = Number (req.params.year);
    const month = Number (req.params.month);

    if (suiviDette.length > 0) {
        
        
        const dayData = {
            fournisseurs:[],
        };

        for (let i of suiviDette){

            if( i.annee === year){
                for ( let j of i.data){
                    
                    if (j.mois === month) {
                        for (let fournisseurs of j.data.fournisseurs) {

                            dayData.fournisseurs.push({
                                name: fournisseurs.name,
                                data: {
                                    amount: 0,
                                    payment: 0
                                }
                            });
                        };
                    };
                };
            };
        };

        res.status(200).json({
            status: 'success',
            data: dayData
        });

    } else {

        res.status(200).json({
            status: 'success',
            data: null
        })
    };
};

exports.mensualStastSuiviDetteCollection = async ({collection, res, req}) => {

    const year = Number (req.params.year);
    const month = Number (req.params.month);

    const fournisseurs = statsAll(year, month, 'fournisseurs', collection);

    res.status(200).json({
        status: 'success',
        data: {
            fournisseurs: fournisseurs,
        }
    });
};

exports.mensualStastSuiviDetteDetailCollection = async ({collection, res, req}) => {

    const year = Number (req.params.year);
    const month = Number (req.params.month);

    const fournisseurs = await statsDetail(year, month,'fournisseurs',collection);

    res.status(200).json({
        status: 'success',
        data: {
            fournisseurs: fournisseurs,
        }
    });
};

exports.totalDetteCollection = async ({collection, res, req}) => {

    const suiviDette = await collection.find();

    const year = Number (req.params.year);
    const month = Number (req.params.month);
    const day = Number (req.params.day);
    const dataDay = new loopingData(suiviDette, year, month, day).loopingDataYourSuiviDette();
    let totDette = 0;
    if (dataDay.fournisseurs.length > 0  ) {
        
        for (let i of dataDay.fournisseurs) {

            totDette += i.data.amount - i.data.payment;
        };
    };

    res.status(200).json({
        status: 'success',
        data: totDette
    })
};

