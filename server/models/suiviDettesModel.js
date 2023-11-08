const mongoose = require('mongoose');

const dataName = {

    amount: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
};

const data = {

    name: {
        type: String,
        require: true,
    },
    data: [dataName]
};

const dataTotalDette = {

    amount: {
        type: Number,
        require: true
    },
    createdAt: {
        type:  Date,
        default: Date.now()
    }
};

const monthData = {

    mois: {
        type: Number,
        default: Number (new Date().getMonth() + 1)
    },

    data: {

        agents: [data],
        clients: [data],
        musiciens: [data],
        totalDette: [dataTotalDette]
    }
};

const mainSchema = new mongoose.Schema({
    annee: {
        type: Number,
        default: Number ( new Date().getFullYear())
    },
    data: [monthData]
});

mongoose.set("strictQuery", false);

const SuiviDette = mongoose.model("suividettes", mainSchema);

module.exports = SuiviDette;