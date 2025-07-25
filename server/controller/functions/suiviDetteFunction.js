const AppError = require('../../utils/appError');
const loopingData = require ('../../utils/loopingData');

const {statsDetail, statsAll} = require('./suiviDetteReuseFucntions');


exports.getSuiviDetteCollection = async ({collection, req, res}) => {

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

        const agents = await statsDetail(prevYear, prevMonth,'agents',collection);
        const musiciens = await statsDetail(prevYear, prevMonth,'musiciens',collection);
        const clients = await statsDetail(prevYear, prevMonth,'clients',collection);
        
        const newAgent = [];
        const newClients = [];
        const newMusiciens = [];

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

        for (let i of agents) {
            
            const valeurDette = i.valeurDette - i.valeurPayment;

            if (valeurDette !== 0 ) {

                newAgent.push({name: i._id, data: [{ amount: valeurDette, createdAt: createdAt }]});
            };
        };
        for (let i of musiciens) {
            
            const valeurDette = i.valeurDette - i.valeurPayment;

            if (valeurDette !== 0 ) {

                newMusiciens.push({name: i._id, data: [{ amount: valeurDette, createdAt: createdAt }]});
            };
        };
        for (let i of clients) {
            
            const valeurDette = i.valeurDette - i.valeurPayment;

            if (valeurDette !== 0 ) {

                newClients.push({name: i._id, data: [{ amount: valeurDette, createdAt: createdAt }]});
            };
        };

        const Newdata = [{
            annee: year,
            data: [{
                mois: month,
                data: {
                    agents: newAgent,
                    musiciens: newMusiciens,
                    clients: newClients,
                }
            }]
        }];
        
        res.status(200).json({
            status: 'success',
            data:  new loopingData(Newdata, year, month, day).loopingDataSuiviDette()
        });
    } else {
        
        const suiviDette = await collection.find();
        
        res.status(200).json({
            status: 'success',
            data:  new loopingData (suiviDette, year, month, day).loopingDataSuiviDette()
        });
    };
};

exports.pushSuiviDetteCollection = async ({collection, req, res, next}) => {

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
    
                    //for agent
                    for (let p = 0; p < body.agents.length; p ++){
    
                        if (body.agents[p].name !== "") {
                            
                            const indexName = suiviDette[yearIndex].data[monthIndex].data.agents.findIndex ( el => el.name.toUpperCase () === body.agents[p].name.toUpperCase());
    
                            
                            if (indexName !== -1){
                                
                                const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.agents[indexName].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                                if (existingDataIndex === -1) {
    
                                    suiviDette[yearIndex].data[monthIndex].data.agents[indexName].data.push(body.agents[p].data);
                                };
    
                            } else {
                                suiviDette[yearIndex].data[monthIndex].data.agents.push(body.agents[p]);
                            };
    
                        } else {
                            
                            return next (new AppError ('La section nom ne doit pas etre vide'), 404);
                        };
                    };
                    //for clients
                    for (let p = 0; p < body.clients.length; p ++){
    
                        if (body.clients[p].name !== "") {
                            
                            const indexName = suiviDette[yearIndex].data[monthIndex].data.clients.findIndex ( el => el.name.toUpperCase () === body.clients[p].name.toUpperCase());
    
                            
                            if (indexName !== -1){
                                
                                const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.clients[indexName].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                                if (existingDataIndex === -1) {
    
                                    suiviDette[yearIndex].data[monthIndex].data.clients[indexName].data.push(body.clients[p].data);
                                };
    
                            } else {
                                suiviDette[yearIndex].data[monthIndex].data.clients.push(body.clients[p]);
                            };
    
                        } else {
                            
                            return next (new AppError ('La section nom ne doit pas etre vide'), 404);
                        };
                    };
                    //for musiciens
                    for (let p = 0; p < body.musiciens.length; p ++){
    
                        if (body.musiciens[p].name !== "") {
                            
                            const indexName = suiviDette[yearIndex].data[monthIndex].data.musiciens.findIndex ( el => el.name.toUpperCase () === body.musiciens[p].name.toUpperCase());
    
                            
                            if (indexName !== -1){
                                
                                const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.musiciens[indexName].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                                if (existingDataIndex === -1) {
    
                                    suiviDette[yearIndex].data[monthIndex].data.musiciens[indexName].data.push(body.musiciens[p].data);
                                };
    
                            } else {
                                suiviDette[yearIndex].data[monthIndex].data.musiciens.push(body.musiciens[p]);
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
                            agents: body.agents,
                            clients: body.clients,
                            musiciens: body.musiciens,
                        }
                    });
                };
                await suiviDette[yearIndex].save();
                
                res.status(200).json({
                    status: 'success',
                    data:  new loopingData(suiviDette, year, month, day).loopingDataSuiviDette()
                });
    
            } else {
                
                //creating the data it's a new year
                const newSuiviDette = await collection.create(req.body);
    
                res.status(200).json({
                    status: 'success',
                    data:  new loopingData([newSuiviDette], year, month, day).loopingDataSuiviDette()
                });
            };
        };
    } else {
        
        //creating the data if collection is empty
        const newSuiviDette = await collection.create(req.body);
        
        res.status(200).json({
            status: 'success',
            data:  new loopingData([newSuiviDette], year, month, day).loopingDataSuiviDette()
        });
    };
};

exports.updateSuiviDetteCollection = async ({collection, req, res, next}) => {
    
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
    
                //for agents
                for (let p = 0; p < body.agents.length; p ++){
    
                    if (body.agents[p].name !== "") {

                        const indexName = suiviDette[yearIndex].data[monthIndex].data.agents.findIndex ( el => el.name.toUpperCase () === body.agents[p].name.toUpperCase());
                        
                        if (indexName !== -1){
                            
                            const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.agents[indexName].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
                            
                            if (existingDataIndex !== -1) {
                                
                                suiviDette[yearIndex].data[monthIndex].data.agents[indexName].data[existingDataIndex] = {

                                    amount: body.agents[p].data.amount,
                                    payment: body.agents[p].data.payment,
                                    createdAt: body.agents[p].data.createdAt
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
                //for clients
                for (let p = 0; p < body.clients.length; p ++){
    
                    if (body.clients[p].name !== "") {

                        const indexName = suiviDette[yearIndex].data[monthIndex].data.clients.findIndex ( el => el.name.toUpperCase () === body.clients[p].name.toUpperCase());
                        
                        if (indexName !== -1){
                            
                            const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.clients[indexName].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
                            
                            
                            if (existingDataIndex !== -1) {
                                
                                suiviDette[yearIndex].data[monthIndex].data.clients[indexName].data[existingDataIndex] = {

                                    amount: body.clients[p].data.amount,
                                    payment: body.clients[p].data.payment,
                                    createdAt: body.clients[p].data.createdAt

                                };
                            } else {

                                return next (new AppError ('cette donnee est inexistante', 404));
                            }
    
                        } else {
                            return next (new AppError ('cette donnee est inexistante', 404));
                        };
    
                    } else {
                        
                        return next (new AppError ('La section nom ne doit pas etre vide'), 404);
                    };
                };
                //for musiciens
                for (let p = 0; p < body.musiciens.length; p ++){
    
                    if (body.musiciens[p].name !== "") {

                        const indexName = suiviDette[yearIndex].data[monthIndex].data.musiciens.findIndex ( el => el.name.toUpperCase () === body.musiciens[p].name.toUpperCase());
                        
                        if (indexName !== -1){
                            
                            const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.musiciens[indexName].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
                            
                            
                            if (existingDataIndex !== -1) {
                                
                                suiviDette[yearIndex].data[monthIndex].data.musiciens[indexName].data[existingDataIndex] = {

                                    amount: body.musiciens[p].data.amount,
                                    payment: body.musiciens[p].data.payment,
                                    createdAt: body.musiciens[p].data.createdAt

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
        data:  new loopingData(suiviDette, year, month, day).loopingDataSuiviDette()
    });
};

exports.lastCreatedDataSuiviDetteCollection = async ({collection, req, res}) => {

    const suiviDette = await collection.find();
    
    const year = Number (req.params.year);
    const month = Number (req.params.month);

    if (suiviDette.length > 0) {
        
        
        const dayData = {
            
            agents:[],
            clients: [],
            musiciens: [],
        };

        for (let i of suiviDette){

            if( i.annee === year){
                for ( let j of i.data){
                    
                    if (j.mois === month) {
                        for (let agents of j.data.agents) {

                            dayData.agents.push({
                                name: agents.name,
                                data: {
                                    amount: 0,
                                    payment: 0
                                }
                            });
                        };
                        for (let clients of j.data.clients) {

                            dayData.clients.push({
                                name: clients.name,
                                data: {
                                    amount: 0,
                                    payment: 0
                                }
                            });
                        };
                        for (let musiciens of j.data.musiciens) {

                            dayData.musiciens.push({
                                name: musiciens.name,
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

exports.mensualStastSuiviDetteCollection = async ({collection, req, res}) => {

    const year = Number (req.params.year);
    const month = Number (req.params.month);

    const agents = statsAll(year, month, 'agents', collection);
    const musiciens = statsAll(year, month, 'musiciens', collection);
    const clients = statsAll(year, month, 'clients', collection);

    res.status(200).json({
        status: 'success',
        data: {
            agents: agents,
            musiciens: musiciens,
            clients: clients
        }
    });
};

exports.mensualStastSuiviDetteDetailCollection = async ({collection, req, res}) => {

    const year = Number (req.params.year);
    const month = Number (req.params.month);

    const agents = await statsDetail(year, month,'agents',collection);
    const musiciens = await statsDetail(year, month,'musiciens',collection);
    const clients = await statsDetail(year, month,'clients',collection);

    res.status(200).json({
        status: 'success',
        data: {
            clients: clients,
            musiciens: musiciens,
            agents: agents
        }
    });
};

exports.totalDetteCollection = async ({collection, req, res}) => {

    const suiviDette = await collection.find();

    const year = Number (req.params.year);
    const month = Number (req.params.month);
    const day = Number (req.params.day);
    
    const dataDay =  new loopingData(suiviDette, year, month, day).loopingDataSuiviDette()
    let totDette = 0;
    if (dataDay.agents.length > 0 && dataDay.musiciens.length > 0 && dataDay.clients.length > 0 ) {
        
        for (let i of dataDay.agents) {

            totDette += i.data.amount - i.data.payment;
        };
        for (let i of dataDay.musiciens) {
            totDette += i.data.amount - i.data.payment;
        };
        for (let i of dataDay.clients) {
            totDette += i.data.amount - i.data.payment;
        };
    };

    res.status(200).json({
        status: 'success',
        data: totDette
    })
};

