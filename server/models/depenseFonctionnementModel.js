const mongoose = require ("mongoose'");


const dayData = {
    label: {
        type: String,
        require: true
    },
    valeur: {
        type: Number,
        require: true
    }
}

const monthData = {
    mois: {
        type: Number,
        default: Number (new Date().getMonth() + 1),
        require: true
    },
    data: [dayData]
}

const mainSchema = new mongoose.Schema({
    annee: {
        type: Number,
        require: true,
        default: Number (new Date().getFullYear()),
    },
    data: [monthData]
});

mongoose.set("strictQuery", false);

const DepenseFonctionnemnt = mongoose.model("depenseFonctionnemnt", mainSchema);

module.exports = DepenseFonctionnemnt;