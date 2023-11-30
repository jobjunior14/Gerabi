const AppError = require('../../utils/appError');

const {statsDetail, statsAll} = require('./suiviDetteReuseFucntions')

const loopingData = (array, year, month, day) => {

    const dayData = {
        fournisseurs: [],
    };
    
    for (let i of array) {
        if (i.annee === year) {

            for (let j of i.data) {

                if (j.mois === month) {
                    for (let fournisseurs of j.data.fournisseurs) {

                        for (let data of fournisseurs.data) {

                            if (Number (JSON.stringify(data.createdAt).slice (9, 11)) === day) {

                                dayData.fournisseurs.push ({
                                    name: fournisseurs.name,
                                    data: data
                                });
                            };
                        };
                    };
                };
            };
        };
    };
    return dayData;
};

exports.getSuiviDetteCollection = async (data) => {

    const year = Number (data.req.params.year);
    const month = Number (data.req.params.month);
    const day = Number (data.req.params.day);

    const nowDay = Number ( new Date().getDate());
    //if we are the first day of the month, we must dispaly the information about the previous month but not save it 
    if (nowDay === 1 && day === 1) {

        const prevDate = new Date(year, month -1, day);

        //get the previous date
        const prevYear = prevDate.getFullYear();
        const prevMonth = prevDate.getMonth() + 1;

        const fournisseurs = await statsDetail(prevYear, prevMonth,'fournisseurs',data.collection);
        
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
        
        data.res.status(200).json({
            status: 'success',
            data: loopingData (Newdata, year, month, day)
        });
    } else {
        
        const suiviDette = await data.collection.find();
        
        data.res.status(200).json({
            status: 'success',
            data: loopingData (suiviDette, year, month, day)
        });
    };
};

exports.pushSuiviDetteCollection = async (data) => {

    const suiviDette = await data.collection.find();

    //data from body request
    const body = data.req.body.data.data;
    //query's date
    const year = Number (data.req.query.year);
    const month = Number (data.req.query.month);
    const day = Number (data.req.query.day);

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
                            
                            return data.next (new AppError ('La section nom ne doit pas etre vide'), 404);
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
                
                data.res.status(200).json({
                    status: 'success',
                    data: loopingData(suiviDette, year, month, day)
                });
    
            } else {
                
                //creating the data it's a new year
                const newSuiviDette = await data.collection.create(data.req.body);
    
                data.res.status(200).json({
                    status: 'success',
                    data: loopingData([newSuiviDette], year, month, day)
                });
            };
        };
    } else {
        
        //creating the data if collection is empty
        const newSuiviDette = await data.collection.create(data.req.body);
        
        data.res.status(200).json({
            status: 'success',
            data: loopingData([newSuiviDette], year, month, day)
        });
    };
};

exports.updateSuiviDetteCollection = async (data) => {
    
    const suiviDette = await data.collection.find();
    
    const year = Number (data.req.params.year);
    const month = Number (data.req.params.month);
    const day = Number (data.req.params.day);

    const body = data.req.body.data.data;
    
    
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

                                return data.next (new AppError ('cette donnee est inexistante', 404))
                            }
    
                        } else {
                            return data.next (new AppError ('cette donnee est inexistante', 404));
                        };
    
                    } else {
                        
                        return data.next (new AppError ('La section nom ne doit pas etre vide'), 404);
                    };
                };

                //save data if no error
                await suiviDette[yearIndex].save();
    
            } else {
    
                return data.next (new AppError ('Ce mois est inexistant dans la base des donnees', 404));
            };
            
        } else {
            
            return data.next (new AppError ('Cette annee est inexistante dans la base des donnees', 404));
        };
    };
    
    data.res.status(200).json({
        status: 'success',
        data: loopingData(suiviDette, year, month, day)
    });
};

exports.lastCreatedDataSuiviDetteCollection = async (data) => {

    const suiviDette = await data.collection.find();
    
    const year = Number (data.req.params.year);
    const month = Number (data.req.params.month);

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

        data.res.status(200).json({
            status: 'success',
            data: dayData
        });

    } else {

        data.res.status(200).json({
            status: 'success',
            data: null
        })
    };
};

exports.mensualStastSuiviDetteCollection = async (data) => {

    const year = Number (data.req.params.year);
    const month = Number (data.req.params.month);

    const fournisseurs = statsAll(year, month, 'fournisseurs', data.collection);

    data.res.status(200).json({
        status: 'success',
        data: {
            fournisseurs: fournisseurs,
        }
    });
};

exports.mensualStastSuiviDetteDetailCollection = async (data) => {

    const year = Number (data.req.params.year);
    const month = Number (data.req.params.month);

    const fournisseurs = await statsDetail(year, month,'fournisseurs',data.collection);

    data.res.status(200).json({
        status: 'success',
        data: {
            fournisseurs: fournisseurs,
        }
    });
};

exports.totalDetteCollection = async (data) => {

    const suiviDette = await data.collection.find();

    const year = Number (data.req.params.year);
    const month = Number (data.req.params.month);
    const day = Number (data.req.params.day);
    const dataDay = loopingData(suiviDette, year, month, day);
    let totDette = 0;
    if (dataDay.fournisseurs.length > 0  ) {
        
        for (let i of dataDay.fournisseurs) {

            totDette += i.data.amount - i.data.payment;
        };
    };

    data.res.status(200).json({
        status: 'success',
        data: totDette
    })
};

