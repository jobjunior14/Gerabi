const mongoose = require ("mongoose");

const amountLibelSortie = {

    valeur: {
        type: Number,
        default: 0,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
}
const detailSortie = {

    libel: {
        type: String,
        require: true
    },
    amount: [amountLibelSortie]
};

const detailEntree = {
    amount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
};

const dataSortieCaisse = {

    name: {
        type: String,
        require: true
    },

    data: [detailSortie]
};

const dataEntreeCaisse = {

    name: {
        type: String,
        require: true,
    },

    data: [detailEntree]
};

const datasoldCaisse = {

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
        default: Number (new Date().getMonth() + 1),
        require: true
    },
    data: {

        entreeCaisse: [dataEntreeCaisse],
        sortieCaisse: [dataSortieCaisse],
        soldCaisse: [datasoldCaisse]
    }
};

const mainSchema = new mongoose.Schema({
    annee: {
        type: Number,
        require: true,
        default: Number (new Date().getFullYear()),
    },
    data: [monthData]
});

mongoose.set("strictQuery", false);

const SuiviDepense = mongoose.model("suividepense", mainSchema);

module.exports = SuiviDepense;