const SuiviDepense = require(`../../models/suiviDepenseModel`);
const AppError = require("../../utils/appError");
const catchAssynch = require(`../../utils/catchAssynch.js`);

const loopingData = (array, year, month, day) => {

    const dayData = {
        entreeCaisse:[],
        sortieCaisse: [],
        prevSoldCaisse: []
    };
    
    for (let i of array){

        if( i.annee === year){
            for ( let j of i.data){
                
                if (j.mois === month) {

                    for (let entreeCaisse of j.data.entreeCaisse) {

                        for (let e of entreeCaisse.data){

                            if (Number (JSON.stringify (e.createdAt).slice (9, 11)) === day) {
    
                                dayData.entreeCaisse.push({
                                    name: entreeCaisse.name,
                                    data: e
                                });
                            };
                        };   
                    };

                    for (let sortieCaisse of j.data.sortieCaisse) {

                        for (let e of sortieCaisse.data){

                            for (let u of e.amount){
                                
                                if (Number (JSON.stringify (u.createdAt).slice (9, 11)) === day) {
        
                                    dayData.sortieCaisse.push({
                                        name: sortieCaisse.name,
                                        data: {
                                            libel: e.libel,
                                            amount: u.valeur
                                        }
                                    });
                                };
                            };
                        }; 
                    };
            

                    for (let prevSoldCaisse of j.data.prevSoldCaisse) {
                         
                        if (Number (JSON.stringify (prevSoldCaisse.createdAt).slice (9, 11)) === day) {

                            dayData.prevSoldCaisse.push(prevSoldCaisse);
                        };
                    };
                };
            };
        };
    };

    return dayData;
};


exports.getSuiviDepense = catchAssynch( async (req, res) => {

    const suiviDepense = await  SuiviDepense.find();

    res.status(200).json({

        status: 'success',
        data: loopingData(suiviDepense , Number (req.params.year), Number (req.params.month), Number (req.params.day))
    }); 
});

exports.pushSuiviDepense = catchAssynch (async (req, res, next) => {

    const suiviDepense = await SuiviDepense.find();

    //data for body request
    const body = req.body.data.data;
    //current date
    const year = Number (new Date().getFullYear());
    const month = Number (new Date().getMonth() + 1);
    const day = Number (new Date().getDate());

    if (suiviDepense.length > 0){
        
        for ( let i = 0; i < suiviDepense.length; i++) {
    
            const yearIndex = suiviDepense.findIndex (el => el.annee === year);
    
            if (yearIndex !== -1) {
                
                const monthIndex = suiviDepense[yearIndex].data.findIndex ( el => el.mois === month);
    
                if (monthIndex !== -1) {
    
                    //for entree caisse
                    for (let p = 0; p < body.entreeCaisse.length; p ++){
    
                        if (body.entreeCaisse[p].name !== "") {
                            console.log(suiviDepense[yearIndex].data[monthIndex].data);
                            const indexNameEntree = suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse.findIndex ( el => el.name.toUpperCase () === body.entreeCaisse[p].name.toUpperCase());
    
                            
                            if (indexNameEntree !== -1){
                                
                                const existingDataIndex = suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse[indexNameEntree].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                                if (existingDataIndex === -1) {
    
                                    suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse[indexNameEntree].data.push(body.entreeCaisse[p].data);
                                };
    
                            } else {
                                suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse.push(body.entreeCaisse[p]);
                            };
    
                        } else {
                            
                            return next (new AppError ('La section nom ne doit pas etre vide'), 404);
                        };
                    };
    
                    //for sortie caisse
                    for (let p = 0; p < body.sortieCaisse.length; p ++){
    
                        if (body.sortieCaisse[p].name !== "") {
    
                            const indexNameSortie = suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse.findIndex ( el => el.name.toUpperCase () === body.sortieCaisse[p].name.toUpperCase());
    
                            if (indexNameSortie !== -1) {
                                
                                if (body.sortieCaisse[p].data.libel !== "") {
    
                                    const indexLibelSortie = suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data.findIndex (el => el.libel.toUpperCase() === body.sortieCaisse[p].data.libel.toUpperCase());
    
                                    if (indexLibelSortie !== -1){
                                        
                                        const existingDataIndex = suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                                        if (existingDataIndex === -1) {
    
                                            suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount.push(body.sortieCaisse[p].data.amount);
                                        };
                                    } else {
    
                                        suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data.push (body.sortieCaisse[p].data);
                                    };
                                } else {
                                    
                                    return next (new AppError ('La section label ne doit pas etre vide'), 404);
                                };
    
                            } else {
                                suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse.push(body.sortieCaisse[p]);
                            };
    
                        } else {
                            
                            return next (new AppError ('La section nom ne doit pas etre vide'), 404);
                        };
                    };
    
                    //for prev Sold
                    const indexPrevSold = suiviDepense[yearIndex].data[monthIndex].data.prevSoldCaisse.findIndex (el => Number(JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                    if (indexPrevSold === -1){
                        suiviDepense[yearIndex].data[monthIndex].data.prevSoldCaisse.push(body.prevSoldCaisse);
                    };
                } else {
    
                    //if it's a new month we push data in existing year
                    suiviDepense[yearIndex].data.push({
    
                        data: {
                            entreeCaisse: body.entreeCaisse,
                            sortieCaisse: body.sortieCaisse,
                            prevSoldCaisse: body.prevSoldCaisse
                        }
                    });
                };
                await suiviDepense[yearIndex].save();
                
                res.status(200).json({
                    status: 'success',
                    data: loopingData(suiviDepense, year, month, day)
                });
    
            } else {
                
                //creating the data it's a new year
                const NewsuiviDepense = await SuiviDepense.create(req.body);
    
                res.status(200).json({
                    status: 'success',
                    data: loopingData(NewsuiviDepense, year, month, day)
                });
            };
        };
    } else {
        
        //creating the data if collection is empty
        const NewsuiviDepense = await SuiviDepense.create(req.body);
        
        res.status(200).json({
            status: 'success',
            data: loopingData([NewsuiviDepense], year, month, day)
        });
    };
});

exports.updateSuiviDepense = catchAssynch (async (req, res, next) => {
    
    const suiviDepense = await SuiviDepense.find();
    
    const year = Number (req.params.year);
    const month = Number (req.params.month);
    const day = Number (req.params.day);

    const body = req.body.data.data;
    
    
    for ( let i = 0; i < suiviDepense.length; i++) {
    
        const yearIndex = suiviDepense.findIndex (el => el.annee === year);
    
        if (yearIndex !== -1) {
            
            const monthIndex = suiviDepense[yearIndex].data.findIndex ( el => el.mois === month);
    
            if (monthIndex !== -1) {
    
                //for entree caisse
                for (let p = 0; p < body.entreeCaisse.length; p ++){
    
                    if (body.entreeCaisse[p].name !== "") {

                        const indexNameEntree = suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse.findIndex ( el => el.name.toUpperCase () === body.entreeCaisse[p].name.toUpperCase());
                        
                        if (indexNameEntree !== -1){
                            
                            const existingDataIndex = suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse[indexNameEntree].data.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
                            
                            
                            if (existingDataIndex !== -1) {
                                
                                //put the date at the rigt format
                                if ( month > 10 && day > 10){

                                    suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.entreeCaisse[p].data.amount,
                                        createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
                                    };
                                    
                                } else if ( month > 10 && day < 10){
                                    
                                    suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.entreeCaisse[p].data.amount,
                                        createdAt: `${year}-${month}-0${day}T07:22:54.930Z`,
                                    };
                                    
                                } else if ( month < 10 && day > 10) {
                                    
                                    suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.entreeCaisse[p].data.amount,
                                        createdAt: `${year}-0${month}-${day}T07:22:54.930Z`,
                                    };
                                    
                                } else {
                                    
                                    suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.entreeCaisse[p].data.amount,
                                        createdAt: `${year}-0${month}-0${day}T07:22:54.930Z`,
                                    };
                                };
                            } else {

                                return next (new AppError ('cette donnee est inexistante', 404))
                            }
    
                        } else {
                            suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse.push(body.entreeCaisse[p]);
                        };
    
                    } else {
                        
                        return next (new AppError ('La section nom ne doit pas etre vide'), 404);
                    };
                };
    
                //for sortie caisse
                for (let p = 0; p < body.sortieCaisse.length; p ++){
    
                    if (body.sortieCaisse[p].name !== "") {
    
                        const indexNameSortie = suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse.findIndex ( el => el.name.toUpperCase () === body.sortieCaisse[p].name.toUpperCase());
    
                        if (indexNameSortie !== -1) {
                            
                            if (body.sortieCaisse[p].data.libel !== "") {
    
                                const indexLibelSortie = suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data.findIndex (el => el.libel.toUpperCase() === body.sortieCaisse[p].data.libel.toUpperCase());
    
                                if (indexLibelSortie !== -1){
                                    
                                    const existingDataIndex = suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
                                    if (existingDataIndex !== -1) {
                                        
                                        //put the date at the right format
                                        if (month > 10 && day > 10){

                                            suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount[existingDataIndex] = {
    
                                                amount: body.sortieCaisse[p].data.amount,
                                                createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
                                            };
                                            
                                        } else if (month > 10 && day < 10){
                                            
                                            suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount[existingDataIndex] = {
    
                                                valeur: body.sortieCaisse[p].data.amount.valeur,
                                                createdAt: `${year}-${month}-0${day}T07:22:54.930Z`,
                                            };
                                        } else if (month < 10 && day > 10){
                                            
                                            suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount[existingDataIndex] = {
    
                                                amount: body.sortieCaisse[p].data.amount,
                                                createdAt: `${year}-0${month}-${day}T07:22:54.930Z`,
                                            };
                                        } else {
                                            
                                            suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount[existingDataIndex] = {
    
                                                amount: body.sortieCaisse[p].data.amount,
                                                createdAt: `${year}-0${month}-0${day}T07:22:54.930Z`,
                                            };
                                        }
                    
                                    } else {

                                        return next (new AppError ('cette donnee est inexistante', 404));
                                    };
                                } else {
    
                                    return next (new AppError ('cette donnee est inexistante', 404));
                                };
                            } else {
                                
                                return next (new AppError ('La section label ne doit pas etre vide'), 404);
                            };
    
                        } else {
                            return next (new AppError ('cette donnee est inexistante', 404));
                        };
    
                    } else {
                        
                        return next (new AppError ('La section nom ne doit pas etre vide'), 404);
                    };
                };
    
                //for prev Sold
                const indexPrevSold = suiviDepense[yearIndex].data[monthIndex].data.prevSoldCaisse.findIndex (el => Number(JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                if (indexPrevSold !== -1){
                    
                    //put the date at the correct format
                    if (month > 10 && day > 10){

                        suiviDepense[yearIndex].data[monthIndex].data.prevSoldCaisse = {
    
                            amount: body.prevSoldCaisse.amount,
                            createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
                        };
                        
                    } else if (month > 10 && day < 10){
                        
                        suiviDepense[yearIndex].data[monthIndex].data.prevSoldCaisse = {
    
                            amount: body.prevSoldCaisse.amount,
                            createdAt: `${year}-${month}-0${day}T07:22:54.930Z`,
                        };
                    } else if (month < 10 && day > 10){
                        
                        suiviDepense[yearIndex].data[monthIndex].data.prevSoldCaisse = {
    
                            amount: body.prevSoldCaisse.amount,
                            createdAt: `${year}-0${month}-${day}T07:22:54.930Z`,
                        };
                    } else {
                        
                        suiviDepense[yearIndex].data[monthIndex].data.prevSoldCaisse = {
    
                            amount: body.prevSoldCaisse.amount,
                            createdAt: `${year}-0${month}-0${day}T07:22:54.930Z`,
                        };

                    }

                    await suiviDepense[yearIndex].save();
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
        data: loopingData(suiviDepense, year, month, day)
    });
});

exports.lastCreatedDataSuiviDepense = catchAssynch (async (req, res,) => {

    const suiviDepense = await SuiviDepense.find();
    
    const year = Number (req.params.year);
    const month = Number (req.params.month);

    if (suiviDepense.length > 0) {
        
        
        const dayData = {
            
            entreeCaisse:[],
            sortieCaisse: [],
            prevSoldCaisse: []
        };



        for (let i of suiviDepense){

            if( i.annee === year){
                for ( let j of i.data){
                    
                    if (j.mois === month) {
                        for (let entreeCaisse of j.data.entreeCaisse) {

                            dayData.entreeCaisse.push({
                                name: entreeCaisse.name,
                                data: {
                                    amount: 0
                                }
                            });
                        };

                        for (let sortieCaisse of j.data.sortieCaisse) {

                            for (let e of sortieCaisse.data){
            
                                dayData.sortieCaisse.push({
                                    name: sortieCaisse.name,
                                    data: {
                                        libel: e.libel,
                                        amount: 0
                                    }
                                });  
                            }; 
                        };
                        
                        dayData.prevSoldCaisse.push (j.data.prevSoldCaisse[j.data.prevSoldCaisse.length - 1]);
                    };
                };
            };
        };

        res.status(200).json({
            status: 'success',
            data: dayData
        });

        // //entree caisse
        // const entreeCaisseEl0 = suiviDepense[el0].data[el1].entreeCaisse.length -1;
        // const entreeCaisseEl1 = suiviDepense[el0].data[el1].entreeCaisse[entreeCaisseEl0].data.length - 1;
        // const lastEntreeCaisse = suiviDepense[el0].data[el1].entreeCaisse[entreeCaisseEl0].data[entreeCaisseEl1];

        // //sortie caisse
        // const soriteCaisseEl0 = suiviDepense[el0].data[el1].sortieCaisse.length - 1;
        // const soriteCaisseEl1 = suiviDepense[el0].data[el1].sortieCaisse[soriteCaisseEl0].data.length - 1;
        // const soriteCaisseEl2 = suiviDepense[el0].data[el1].sortieCaisse[soriteCaisseEl0].data[soriteCaisseEl1].amount.length - 1;
        // const lastSortieCaisse = suiviDepense[el0].data[el1].sortieCaisse[soriteCaisseEl0].data[soriteCaisseEl1].amount[soriteCaisseEl2];
        
        // //previous sold
        // const prevSoldCaisseEl0 = suiviDepense[el0].data[el1].prevSoldCaisse.length - 1;
        // const lastPrevSold = suiviDepense[el0].data[el1].prevSoldCaisse[prevSoldCaisseEl0];
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

    const entreeCaisse = await SuiviDepense.aggregate([

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
            $unwind: {path: "$stats.data.entreeCaisse"}
        },

        {
            $unwind: {path: "$stats.data.entreeCaisse.data"}
        },

        {
            $group: {
                _id: null,
                valeur: {$sum: "$stats.data.entreeCaisse.data.amount" }
            }
        }

    ]);

    res.status(200).json({
        status: 'success',
        data: entreeCaisse
    });
});