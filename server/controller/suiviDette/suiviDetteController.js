const SuiviDette = require(`../../models/suiviDettesModel`);
const AppError = require("../../utils/appError");
const catchAssynch = require(`../../utils/catchAssynch.js`);

const loopingData = (array, year, month, day) => {

    const dayData = {
        agents: [],
        clients: [],
        musiciens: [],
        totalDette: null,
    };

    for (let i of array) {

        if (i.annee === year) {

            for (let j of i.data) {

                if (j.mois === month) {

                    //agents
                    for (let agents of j.data.agents) {

                        for (let data of agents.data) {

                            if (Number (JSON.stringify(data.createdAt).slice (9, 11)) === day) {

                                dayData.agents.push ({
                                    name: agents.name,
                                    data: data
                                });
                            };
                        };
                    };
                    //clients
                    for (let agents of j.data.clients) {

                        for (let data of agents.data) {

                            if (Number (JSON.stringify(data.createdAt).slice (9, 11)) === day) {

                                dayData.clients.push ({
                                    name: agents.name,
                                    data: data
                                });
                            };
                        };
                    };
                    //musiciens
                    for (let agents of j.data.musiciens) {

                        for (let data of agents.data) {

                            if (Number (JSON.stringify(data.createdAt).slice (9, 11)) === day) {

                                dayData.musiciens.push ({
                                    name: agents.name,
                                    data: data
                                });
                            };
                        };
                    };

                    //total caisse
                    for (let totalDette of j.data.totalDette) {
                         
                        if (Number (JSON.stringify (totalDette.createdAt).slice (9, 11)) === day) {

                            dayData.totalDette = totalDette.amount;
                        };
                    };
                };
            };
        };
    };
    return dayData;
};

exports.getSuiviDette = catchAssynch (async (req, res) => {

    const suiviDette = await SuiviDette.find();

    res.status(200).json({
        status: 'success',
        data: loopingData (suiviDette, Number (req.params.year), Number (req.params.month), Number (req.params.day))
    });
});

exports.pushSuiviDette = catchAssynch (async (req, res) => {

    const suiviDette = await SuiviDette.find();

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
                            
                            const indexNameEntree = suiviDette[yearIndex].data[monthIndex].data.agents.findIndex ( el => el.name.toUpperCase () === body.agents[p].name.toUpperCase());
    
                            
                            if (indexNameEntree !== -1){
                                
                                const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.agents[indexNameEntree].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                                if (existingDataIndex === -1) {
    
                                    suiviDette[yearIndex].data[monthIndex].data.agents[indexNameEntree].data.push(body.agents[p].data);
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
                            
                            const indexNameEntree = suiviDette[yearIndex].data[monthIndex].data.clients.findIndex ( el => el.name.toUpperCase () === body.clients[p].name.toUpperCase());
    
                            
                            if (indexNameEntree !== -1){
                                
                                const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.clients[indexNameEntree].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                                if (existingDataIndex === -1) {
    
                                    suiviDette[yearIndex].data[monthIndex].data.clients[indexNameEntree].data.push(body.clients[p].data);
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
                            
                            const indexNameEntree = suiviDette[yearIndex].data[monthIndex].data.musiciens.findIndex ( el => el.name.toUpperCase () === body.musiciens[p].name.toUpperCase());
    
                            
                            if (indexNameEntree !== -1){
                                
                                const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.musiciens[indexNameEntree].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                                if (existingDataIndex === -1) {
    
                                    suiviDette[yearIndex].data[monthIndex].data.musiciens[indexNameEntree].data.push(body.musiciens[p].data);
                                };
    
                            } else {
                                suiviDette[yearIndex].data[monthIndex].data.musiciens.push(body.musiciens[p]);
                            };
    
                        } else {
                            
                            return next (new AppError ('La section nom ne doit pas etre vide'), 404);
                        };
                    };

                    //for total Dette
                    const indexTotalSold = suiviDette[yearIndex].data[monthIndex].data.totalDette.findIndex (el => Number(JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                    if (indexTotalSold === -1){
                        suiviDette[yearIndex].data[monthIndex].data.totalDette.push(body.totalDette);
                    };
    
                } else {
    
                    //if it's a new month we push data in existing year
                    suiviDette[yearIndex].data.push({
    
                        data: {
                            agents: body.agents,
                            clients: body.clients,
                            musiciens: body.musiciens,
                            totalDette: body.totalDette,
                        }
                    });
                };
                await suiviDette[yearIndex].save();
                
                res.status(200).json({
                    status: 'success',
                    data: loopingData(suiviDette, year, month, day)
                });
    
            } else {
                
                //creating the data it's a new year
                const newSuiviDette = await suiviDette.create(req.body);
    
                res.status(200).json({
                    status: 'success',
                    data: loopingData(newSuiviDette, year, month, day)
                });
            };
        };
    } else {
        
        //creating the data if collection is empty
        const newSuiviDette = await suiviDette.create(req.body);
        
        res.status(200).json({
            status: 'success',
            data: loopingData([newSuiviDette], year, month, day)
        });
    };
});

exports.updateSuiviDette = catchAssynch (async (req, res, next) => {
    
    const suiviDette = await SuiviDette.find();
    
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

                        const indexNameEntree = suiviDette[yearIndex].data[monthIndex].data.agents.findIndex ( el => el.name.toUpperCase () === body.agents[p].name.toUpperCase());
                        
                        if (indexNameEntree !== -1){
                            
                            const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.agents[indexNameEntree].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
                            
                            
                            if (existingDataIndex !== -1) {
                                
                                //put the date at the rigt format
                                if ( month >= 10 && day >= 10){

                                    suiviDette[yearIndex].data[monthIndex].data.agents[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.agents[p].data.amount,
                                        createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
                                    };
                                    
                                } else if ( month >= 10 && day < 10){
                                    
                                    suiviDette[yearIndex].data[monthIndex].data.agents[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.agents[p].data.amount,
                                        createdAt: `${year}-${month}-0${day}T07:22:54.930Z`,
                                    };
                                    
                                } else if ( month < 10 && day >= 10) {
                                    
                                    suiviDette[yearIndex].data[monthIndex].data.agents[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.agents[p].data.amount,
                                        createdAt: `${year}-0${month}-${day}T07:22:54.930Z`,
                                    };
                                    
                                } else {
                                    
                                    suiviDette[yearIndex].data[monthIndex].data.agents[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.agents[p].data.amount,
                                        createdAt: `${year}-0${month}-0${day}T07:22:54.930Z`,
                                    };
                                };
                            } else {

                                return next (new AppError ('cette donnee est inexistante', 404))
                            }
    
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

                        const indexNameEntree = suiviDette[yearIndex].data[monthIndex].data.clients.findIndex ( el => el.name.toUpperCase () === body.clients[p].name.toUpperCase());
                        
                        if (indexNameEntree !== -1){
                            
                            const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.clients[indexNameEntree].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
                            
                            
                            if (existingDataIndex !== -1) {
                                
                                //put the date at the rigt format
                                if ( month >= 10 && day >= 10){

                                    suiviDette[yearIndex].data[monthIndex].data.clients[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.clients[p].data.amount,
                                        createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
                                    };
                                    
                                } else if ( month >= 10 && day < 10){
                                    
                                    suiviDette[yearIndex].data[monthIndex].data.clients[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.clients[p].data.amount,
                                        createdAt: `${year}-${month}-0${day}T07:22:54.930Z`,
                                    };
                                    
                                } else if ( month < 10 && day >= 10) {
                                    
                                    suiviDette[yearIndex].data[monthIndex].data.clients[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.clients[p].data.amount,
                                        createdAt: `${year}-0${month}-${day}T07:22:54.930Z`,
                                    };
                                    
                                } else {
                                    
                                    suiviDette[yearIndex].data[monthIndex].data.clients[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.clients[p].data.amount,
                                        createdAt: `${year}-0${month}-0${day}T07:22:54.930Z`,
                                    };
                                };
                            } else {

                                return next (new AppError ('cette donnee est inexistante', 404))
                            }
    
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

                        const indexNameEntree = suiviDette[yearIndex].data[monthIndex].data.musiciens.findIndex ( el => el.name.toUpperCase () === body.musiciens[p].name.toUpperCase());
                        
                        if (indexNameEntree !== -1){
                            
                            const existingDataIndex = suiviDette[yearIndex].data[monthIndex].data.musiciens[indexNameEntree].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
                            
                            
                            if (existingDataIndex !== -1) {
                                
                                //put the date at the rigt format
                                if ( month >= 10 && day >= 10){

                                    suiviDette[yearIndex].data[monthIndex].data.musiciens[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.musiciens[p].data.amount,
                                        createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
                                    };
                                    
                                } else if ( month >= 10 && day < 10){
                                    
                                    suiviDette[yearIndex].data[monthIndex].data.musiciens[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.musiciens[p].data.amount,
                                        createdAt: `${year}-${month}-0${day}T07:22:54.930Z`,
                                    };
                                    
                                } else if ( month < 10 && day >= 10) {
                                    
                                    suiviDette[yearIndex].data[monthIndex].data.musiciens[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.musiciens[p].data.amount,
                                        createdAt: `${year}-0${month}-${day}T07:22:54.930Z`,
                                    };
                                    
                                } else {
                                    
                                    suiviDette[yearIndex].data[monthIndex].data.musiciens[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.musiciens[p].data.amount,
                                        createdAt: `${year}-0${month}-0${day}T07:22:54.930Z`,
                                    };
                                };
                            } else {

                                return next (new AppError ('cette donnee est inexistante', 404))
                            }
    
                        } else {
                            suiviDette[yearIndex].data[monthIndex].data.musiciens.push(body.musiciens[p]);
                        };
    
                    } else {
                        
                        return next (new AppError ('La section nom ne doit pas etre vide'), 404);
                    };
                };

                //for total Dette
                const indexTotalDette = suiviDette[yearIndex].data[monthIndex].data.totalDette.findIndex (el => Number(JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                if (indexTotalDette !== -1){
                    
                    //put the date at the correct format
                    if (month > 10 && day > 10){

                        suiviDette[yearIndex].data[monthIndex].data.totalDette = {
    
                            amount: body.totalDette.amount,
                            createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
                        };
                        
                    } else if (month > 10 && day < 10){
                        
                        suiviDette[yearIndex].data[monthIndex].data.totalDette = {
    
                            amount: body.totalDette.amount,
                            createdAt: `${year}-${month}-0${day}T07:22:54.930Z`,
                        };
                    } else if (month < 10 && day > 10){
                        
                        suiviDette[yearIndex].data[monthIndex].data.totalDette = {
    
                            amount: body.totalDette.amount,
                            createdAt: `${year}-0${month}-${day}T07:22:54.930Z`,
                        };
                    } else {
                        
                        suiviDette[yearIndex].data[monthIndex].data.totalDette = {
    
                            amount: body.totalDette.amount,
                            createdAt: `${year}-0${month}-0${day}T07:22:54.930Z`,
                        };

                    }

                    await suiviDette[yearIndex].save();
                } else {
                    return next ( new AppError ('cette donnee est inexistante', 404));
                }
    
            } else {
    
                return next (new AppError ('Ce mois est inexistant dans la base des donnees', 404));
            };
            
        } else {
            
            return next (new AppError ('Cette annee est inexistante dans la base des donnees', 404));
        };
    };
    
    
    res.status(200).json({
        status: 'success',
        data: loopingData(suiviDette, year, month, day)
    });
});

exports.lastCreatedDataSuiviDette = catchAssynch (async (req, res,) => {

    const suiviDette = await SuiviDette.find();
    
    const year = Number (req.params.year);
    const month = Number (req.params.month);

    if (suiviDette.length > 0) {
        
        
        const dayData = {
            
            agents:[],
            clients: [],
            musiciens: [],
            totalDette: 0,
        };

        for (let i of suiviDette){

            if( i.annee === year){
                for ( let j of i.data){
                    
                    if (j.mois === month) {
                        for (let agents of j.data.agents) {

                            dayData.agents.push({
                                name: agents.name,
                                data: {
                                    amount: 0
                                }
                            });
                        };
                        for (let clients of j.data.clients) {

                            dayData.clients.push({
                                name: clients.name,
                                data: {
                                    amount: 0
                                }
                            });
                        };
                        for (let musiciens of j.data.musiciens) {

                            dayData.musiciens.push({
                                name: musiciens.name,
                                data: {
                                    amount: 0
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
});

exports.mensualStasSuiviDepense = catchAssynch (async (req, res, next) => {

    const year = Number (req.params.year);
    const month = Number (req.params.month);

    const agents = await SuiviDette.aggregate([

        {
            $match: { annee: year}
        },

        {
            $project: {
                stats: {
                    $filter: {
                        input: "$data",
                        as: "data",
                        cond: {
                            $and: [

                                {$gte: ["$$data.mois", month]},
                                {$lte: ["$$data.mois", month]}
                            ]
                        }
                    }
                }
            }
        },
        {
            $unwind: {path: "$stats"}
        },
        {
            $unwind: {path: "$stats.data.agents"}
        },
        {
            $unwind: {path: "$stats.data.agents.data"}
        },
        {
            $group: {
                _id: null,
                valeur: {$sum: "$stats.data.agents.data.amount" }
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: agents
    });
});

