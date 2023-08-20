const mongoose = require ('mongoose');

const statData = new mongoose.Schema({

    mois:{
        type: String
    },
    vente_bar:{
        type: Number
    },
    approvionnement:{
        type: Number
    },
    benefice:{
        type: Number
    }
})


const statsSubSchema = new mongoose.Schema({
    annee: {
        type: String,
    },
    data: [statData]
});


const statsSchema = new mongoose.Schema ({
    name: {
        type: String,
        require: [true, 'a stat data must have a name']
    },
    data: [statsSubSchema]
})