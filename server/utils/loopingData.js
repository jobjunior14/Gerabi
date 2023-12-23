//this class help us to define all the looping data 
// in every file 
//looping data methode based on this class help us to filter the daily data in the DB

class loopingData {
    constructor (array, year, month, day) {
        this.array = array;
        this.day = day;
        this.month = month;
        this.year = year;
    };

    loopingDataSuiviStockEtVente () {
        let dayData = [];
        let id = [];

        for (let i of this.array) {
            for (let j of i.data) {
            //check if the year is true of false
            if (j.annee === this.year) {
                for (let o of j.data) {
                //cheking of the month
                if (o.mois === this.month) {
                    for (let p of o.data) {
                    //cheking of the day
                    if (Number(JSON.stringify(p.createdAt).slice(9, 11)) === this.day) {
                        //then push the product id in a array if there is a correspondance in (it's true every where)
                        id.push(i._id);
                        p.name = i.name;
                        dayData.push(p);
                    }
                    }
                }
                }
            }
            }
        }

        return { id: id, day: dayData };
    };

    loopingDataYourSuiviDette () {
        const dayData = {
            fournisseurs: [],
        };
        
        for (let i of this.array) {
            if (i.annee === this.year) {

                for (let j of i.data) {

                    if (j.mois === this.month) {
                        for (let fournisseurs of j.data.fournisseurs) {

                            for (let data of fournisseurs.data) {

                                if (Number (JSON.stringify(data.createdAt).slice (9, 11)) === this.day) {

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

    loopingDataSuiviDette () {
        const dayData = {
            agents: [],
            clients: [],
            musiciens: [],
        };
        
        for (let i of this.array) {
            if (i.annee === this.year) {

                for (let j of i.data) {

                    if (j.mois === this.month) {

                        //agents
                        for (let agents of j.data.agents) {

                            for (let data of agents.data) {

                                if (Number (JSON.stringify(data.createdAt).slice (9, 11)) === this.day) {
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

                                if (Number (JSON.stringify(data.createdAt).slice (9, 11)) === this.day) {

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

                                if (Number (JSON.stringify(data.createdAt).slice (9, 11)) === this.day) {

                                    dayData.musiciens.push ({
                                        name: agents.name,
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

    loopingDataSuiviDepense () {
        const dayData = {
            entreeCaisse:[],
            sortieCaisse: [],
            soldCaisse: null
        };
        
        for (let i of this.array){

            if( i.annee === this.year){
                for ( let j of i.data){
                    
                    if (j.mois === this.month) {

                        //entree caisse
                        for (let entreeCaisse of j.data.entreeCaisse) {

                            for (let e of entreeCaisse.data){

                                if (Number (JSON.stringify (e.createdAt).slice (9, 11)) === this.day) {
        
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
                                    
                                    if (Number (JSON.stringify (amount.createdAt).slice (9, 11)) === this.day) {
            
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
                            
                            if (Number (JSON.stringify (soldCaisse.createdAt).slice (9, 11)) === this.day) {

                                dayData.soldCaisse = soldCaisse;
                            };
                        };
                    };
                };
            };
        };

        return dayData;
    }

    loopingDataDailyVenteAndDeppEffect () {
        let dayData = null;
        //iterate through i of
        for (let i of this.array) {
            //check if the year is true of false
            if (i.annee === this.year) {
                for (let o of i.data) {
                    //cheking of the month
                    if (o.mois === this.month) {
                        for (let p of o.data) {
                            //cheking of the day
                            if (Number(JSON.stringify(p.createdAt).slice(9, 11)) === this.day) {
                            //then push the product id in a array if there is a correspondance in (it's true every where)
                            dayData = p;
                            }
                        };
                    };
                };
            }
        };

        return dayData;
    };
};

module.exports = loopingData;