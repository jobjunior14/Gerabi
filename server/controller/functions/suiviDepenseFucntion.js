const AppError = require("../../utils/appError");

const loopingData = (array, year, month, day) => {

    const dayData = {
        entreeCaisse:[],
        sortieCaisse: [],
        soldCaisse: null
    };
    
    for (let i of array){

        if( i.annee === year){
            for ( let j of i.data){
                
                if (j.mois === month) {

                    //entree caisse
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

                    //sortie caisse
                    for (let sortieCaisse of j.data.sortieCaisse) {

                        //store label data 
                        const dataName = [];

                        for (let e of sortieCaisse.data){

                            for (let amount of e.amount){
                                
                                if (Number (JSON.stringify (amount.createdAt).slice (9, 11)) === day) {
        
                                    dataName.push({
                                        libel: e.libel,
                                        amount: amount.valeur
                                    });
                                };
                            };
                        }; 

                        //push all the labels in a main name
                        dayData.sortieCaisse.push ({
                            name: sortieCaisse.name,
                            data: dataName 
                        });
                    };
            

                    //sold caisse
                    for (let soldCaisse of j.data.soldCaisse) {
                         
                        if (Number (JSON.stringify (soldCaisse.createdAt).slice (9, 11)) === day) {

                            dayData.soldCaisse = soldCaisse;
                        };
                    };
                };
            };
        };
    };

    return dayData;
};


exports.getSuiviDepenseCollection = async (data) => {

    const suiviDepense = await  data.collection.find();

    res.status(200).json({

        status: 'success',
        data: loopingData(suiviDepense , Number (data.req.params.year), Number (data.req.params.month), Number (data.req.params.day))
    }); 
};

exports.pushSuiviDepenseCollection = async (data) => {

    const suiviDepense = await data.collection.find();

    //data for body request
    const body = data.req.body.data.data;
    //query's date
    const year = Number (data.req.query.year);
    const month = Number (data.req.query.month);
    const day = Number (data.req.query.day);

    if (suiviDepense.length > 0){
        
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
    
                                if (existingDataIndex === -1) {
    
                                    suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse[indexNameEntree].data.push(body.entreeCaisse[p].data);
                                };
    
                            } else {
                                suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse.push(body.entreeCaisse[p]);
                            };
    
                        } else {
                            
                            return data.next (new AppError ('La section nom ne doit pas etre vide'), 404);
                        };
                    };
    
                    //for sortie caisse
                    for (let p = 0; p < body.sortieCaisse.length; p ++){
    
                        if (body.sortieCaisse[p].name !== "") {
                            
                            const indexNameSortie = suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse.findIndex ( el => el.name.toUpperCase() === body.sortieCaisse[p].name.toUpperCase());
    
                            if (indexNameSortie !== -1) {
                                
                                if (body.sortieCaisse[p].data.libel !== "") {
                                    
                                    for (let g = 0; g < body.sortieCaisse[p].data.length; g++) {

                                        const indexLibelSortie = suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data.findIndex (el => el.libel.toUpperCase() === body.sortieCaisse[p].data[g].libel.toUpperCase());
        
                                        if (indexLibelSortie !== -1){
                                            
                                            const existingDataIndex = suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
        
                                            if (existingDataIndex === -1) {
        
                                                suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount.push(body.sortieCaisse[p].data[g].amount);
                                            };
                                        } else {
        
                                            suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data.push (body.sortieCaisse[p].data);
                                        };

                                    }
                                } else {
                                    
                                    return data.next (new AppError ('La section label ne doit pas etre vide'), 404);
                                };
    
                            } else {
                                suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse.push(body.sortieCaisse[p]);
                            };
    
                        } else {
                            
                            return data.next (new AppError ('La section nom ne doit pas etre vide'), 404);
                        };
                    };
    
                    //for prev Sold
                    const indexPrevSold = suiviDepense[yearIndex].data[monthIndex].data.soldCaisse.findIndex (el => Number(JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                    if (indexPrevSold === -1){
                        suiviDepense[yearIndex].data[monthIndex].data.soldCaisse.push(body.soldCaisse);
                    };
                } else {
    
                    //if it's a new month we push data in existing year
                    suiviDepense[yearIndex].data.push({
    
                        data: {
                            entreeCaisse: body.entreeCaisse,
                            sortieCaisse: body.sortieCaisse,
                            soldCaisse: body.soldCaisse
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
                const NewsuiviDepense = await SuiviDepense.create(data.req.body);
    
                res.status(200).json({
                    status: 'success',
                    data: loopingData(NewsuiviDepense, year, month, day)
                });
            };
        };
    } else {
        
        //creating the data if collection is empty
        const NewsuiviDepense = await SuiviDepense.create(data.req.body);
        
        res.status(200).json({
            status: 'success',
            data: loopingData([NewsuiviDepense], year, month, day)
        });
    };
};

exports.updateSuiviDepenseCollection = async (data) => {
    
    const suiviDepense = await data.collection.find();
    
    const year = Number (data.req.params.year);
    const month = Number (data.req.params.month);
    const day = Number (data.req.params.day);

    const body = data.req.body.data.data;
    
    
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
                                if ( month >= 10 && day >= 10){

                                    suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.entreeCaisse[p].data.amount,
                                        createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
                                    };
                                    
                                } else if ( month >= 10 && day < 10){
                                    
                                    suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse[indexNameEntree].data[existingDataIndex] = {
    
                                        amount: body.entreeCaisse[p].data.amount,
                                        createdAt: `${year}-${month}-0${day}T07:22:54.930Z`,
                                    };
                                    
                                } else if ( month < 10 && day >= 10) {
                                    
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

                                return data.next (new AppError ('cette donnee est inexistante', 404))
                            }
    
                        } else {
                            suiviDepense[yearIndex].data[monthIndex].data.entreeCaisse.push(body.entreeCaisse[p]);
                        };
    
                    } else {
                        
                        return data.next (new AppError ('La section nom ne doit pas etre vide'), 404);
                    };
                };
    
                //for sortie caisse
                for (let p = 0; p < body.sortieCaisse.length; p ++){
    
                    if (body.sortieCaisse[p].name !== "") {
    
                        const indexNameSortie = suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse.findIndex ( el => el.name.toUpperCase () === body.sortieCaisse[p].name.toUpperCase());
    
                        if (indexNameSortie !== -1) {
                            
                            for (let g = 0; g < body.sortieCaisse[p].data.length; g++) {


                                if (body.sortieCaisse[p].data[g].libel !== "") {
        
                                    const indexLibelSortie = suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data.findIndex (el => el.libel.toUpperCase() === body.sortieCaisse[p].data[g].libel.toUpperCase());
        
                                    if (indexLibelSortie !== -1){
                                        
                                        const existingDataIndex = suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount.findIndex (el => Number (JSON.stringify(el.createdAt).slice(9, 11)) === day);
                                        if (existingDataIndex !== -1) {
                                            
                                            //put the date at the right format
                                            if (month > 10 && day > 10){
    
                                                suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount[existingDataIndex] = {
        
                                                    valeur: body.sortieCaisse[p].data[g].amount.valeur,
                                                    createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
                                                };
                                                
                                            } else if (month > 10 && day < 10){
                                                
                                                suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount[existingDataIndex] = {
        
                                                    valeur: body.sortieCaisse[p].data[g].amount.valeur,
                                                    createdAt: `${year}-${month}-0${day}T07:22:54.930Z`,
                                                };
                                            } else if (month < 10 && day > 10){
                                                
                                                suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount[existingDataIndex] = {
        
                                                    valeur: body.sortieCaisse[p].data[g].amount.valeur,
                                                    createdAt: `${year}-0${month}-${day}T07:22:54.930Z`,
                                                };
                                            } else {
                                                
                                                suiviDepense[yearIndex].data[monthIndex].data.sortieCaisse[indexNameSortie].data[indexLibelSortie].amount[existingDataIndex] = {
        
                                                    valeur: body.sortieCaisse[p].data[g].amount.valeur,
                                                    createdAt: `${year}-0${month}-0${day}T07:22:54.930Z`,
                                                };
                                            }
                        
                                        } else {
    
                                            return data.next (new AppError ('cette donnee est inexistante', 404));
                                        };
                                    } else {
        
                                        return data.next (new AppError ('cette donnee est inexistante', 404));
                                    };
                                } else {
                                    
                                    return data.next (new AppError ('La section label ne doit pas etre vide'), 404);
                                };
                            };
    
                        } else {
                            return data.next (new AppError ('cette donnee est inexistante', 404));
                        };
    
                    } else {
                        
                        return data.next (new AppError ('La section nom ne doit pas etre vide'), 404);
                    };
                };
    
                //for prev Sold
                const indexPrevSold = suiviDepense[yearIndex].data[monthIndex].data.soldCaisse.findIndex (el => Number(JSON.stringify(el.createdAt).slice(9, 11)) === day);
    
                if (indexPrevSold !== -1){
                    
                    //put the date at the correct format
                    if (month > 10 && day > 10){

                        suiviDepense[yearIndex].data[monthIndex].data.soldCaisse = {
    
                            amount: body.soldCaisse.amount,
                            createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
                        };
                        
                    } else if (month > 10 && day < 10){
                        
                        suiviDepense[yearIndex].data[monthIndex].data.soldCaisse = {
    
                            amount: body.soldCaisse.amount,
                            createdAt: `${year}-${month}-0${day}T07:22:54.930Z`,
                        };
                    } else if (month < 10 && day > 10){
                        
                        suiviDepense[yearIndex].data[monthIndex].data.soldCaisse = {
    
                            amount: body.soldCaisse.amount,
                            createdAt: `${year}-0${month}-${day}T07:22:54.930Z`,
                        };
                    } else {
                        
                        suiviDepense[yearIndex].data[monthIndex].data.soldCaisse = {
    
                            amount: body.soldCaisse.amount,
                            createdAt: `${year}-0${month}-0${day}T07:22:54.930Z`,
                        };

                    }

                    await suiviDepense[yearIndex].save();
                } else {
                    return data.next ( new AppError ('cette donnee est inexistante', 404));
                }
            } else {
    
                return data.next (new AppError ('Ce mois est inexistant dans la base des donnees', 404));
            };
            
        } else {
            
            return data.next (new AppError ('Cette annee est inexistante dans la base des donnees', 404));
        };
    };
    
    
    res.status(200).json({
        status: 'success',
        data: loopingData(suiviDepense, year, month, day)
    });
};

exports.lastCreatedDataSuiviDepenseCollection = async (data) => {

    const suiviDepense = await data.collection.find();
    
    const year = Number (data.req.params.year);
    const month = Number (data.req.params.month);

    if (suiviDepense.length > 0) {
        
        
        const dayData = {
            
            entreeCaisse:[],
            sortieCaisse: [],
            soldCaisse: 0
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

                            const dataName = [];
                            for (let e of sortieCaisse.data){
            
                                dataName.push({
                                    libel: e.libel,
                                    amount: 0
                                });
                            }; 

                             //push all the labels in a main name
                            dayData.sortieCaisse.push ({
                                name: sortieCaisse.name,
                                data: dataName 
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

exports.mensualStasSuiviDepenseCollection = async (data) => {

    const year = Number (data.req.params.year);
    const month = Number (data.req.params.month);

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
};