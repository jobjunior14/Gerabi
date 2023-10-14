const mongoose = require('mongoose');
const validator = require('validator');


const arraySchema = new mongoose.Schema({
    name: 
    {
        type: String,
        require: true
    },
    achat_journalier:
    {
        qt_caisse: { 
            type: Number,
            require: [true, 'vous devez taper la quantinté des caisses '],
            // validate: [validator.isNumeric, "dois contenir que des chiffres"]
        },
        nbr_btll:{
            type: Number,
            require: [true, 'vous devez taper le nombre des bouteilles par caisses '],
            // validate: [validator.isNumeric, "dois contenir que des chiffres"]
        } ,
        qt_btll:{
            type: Number,
        } ,
        prix_achat_gros:{
            type: Number,
            require:[ true, `vous devez taper le prix d'achat en gros`],
            // validate: [validator.isNumeric, "dois contenir que des chiffres"]
        } ,
    },
    benefice_sur_achat:
    {
        val_gros_approvisionnement: {
            type: Number,
        },
        val_det: {
            type: Number
        },
        benefice: {
            type: Number
        },
    },
    business_projection:
    {
        stock_gen: {
            type: Number
        },
        val_stock_det: {
            type: Number
        },
        ref_prix_gros: {
            type: Number
        },
        val_stock_gros:{
            type: Number
        },
        marge_beneficiaire: {
            type: Number
        },
    },
    vente_journaliere:
    {
        ref_prix_det: {
            type: Number,
            require: [true, 'vous devez taper le nombre des bouteilles par caisses '],
            // validate: [validator.isNumeric, "dois contenir que des chiffres"]
        },
        qt_vendue_comptoir: {
            type: Number
        },
        valeur: {
            type: Number
        },
    },
    benefice_sur_vente:{
        type: Number,
        require: true
    },
    stock_consignaions:
    {
        qt: {
            type: Number,
            require: [true, 'vous devez taper le nombre des bouteilles par caisses '],
            // validate: [validator.isNumeric, "dois contenir que des chiffres"]
        },
        valeur: {
            type: Number
        },
    },
    stock_apres_vente:
    {
        reste_stock_comptoir:
        {
            qt_btll: {
                type: Number,
                require: [true, 'vous devez taper le nombre des bouteilles par caisses '],
                // validate: [validator.isNumeric, "dois contenir que des chiffres"]
            },
            valeur: {
                type: Number
            },
        },
        reste_stock_depot:
        {
            qt_caisses: {
                type: Number,
                require: [true, 'vous devez taper le nombre des bouteilles par caisses '],
                // validate: [validator.isNumeric, "dois contenir que des chiffres"]
            },
            qt_btll: {
                type: Number
            },
            valeur: {
                type: Number
            },
        },
        valeur_stock: {
            type: Number
        },
    },

    val_precedente:
    {
        stock_apres_ventente_rest_stock_comptoir_qt_btll: {
            type: Number,
            require: [true, 'vous devez taper le nombre des bouteilles par caisses '],
            // validate: [validator.isNumeric, "dois contenir que des chiffres"]
        },
        stock_apres_ventente_rest_stock_depot_qt_btll:{
            type: Number,
            require: [true, 'vous devez taper le nombre des bouteilles par caisses '],
            // validate: [validator.isNumeric, "dois contenir que des chiffres"]
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
const dataSchema = new mongoose.Schema({
    mois:
    {
        type: Number,
        default: Number ( new Date().getMonth() + 1)
    },
    data:[arraySchema]
})
const BralimaSubSchema = new mongoose.Schema ({
    annee: 
    {
        type: Number,
        default: Number (new Date().getFullYear())
    },

    data:[dataSchema]
});


const statsData = new mongoose.Schema ({

    name: {
        type: String,
        require: true
    },
    
    mois:{
        type: Number,
        require: true,
        unique: true
    },
    vente_bar: {
        type: Number
    },
    approvionnement:{
        type: Number
    },
    benefice:
    {
        type: Number
    }
});


const statsArray = new mongoose.Schema ({
    annee: {
        type: Number,
    },

    data:[statsData]
});

const statsDataSuivi = new mongoose.Schema ({
    name:
    {
        type: String,
        require: true,
    },
    mois:{
        type: Number,
        require: true,
        unique: true
    },
    qt_caisse:
    {
        type: Number,
        require: true
    },
    valeur:
    {
        type: Number,
        require: true
    }
});

const statsArraySuivi = new mongoose.Schema ({
    annee: {
        type: Number,
        require: true
    },

    data:[statsDataSuivi]
});

const suiviSub = new mongoose.Schema ({

    createdAt: {
        type: Date,
        default: Date.now()
    },
    
    mois:
    {
        type: Number,
        require: true
    },

    qt_caisse:{
        type: Number,
        require: true
    },
    valeur:{
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    }
});

const suivisubSubSchema = new mongoose.Schema ({
    name:
    {
        type: String,
        require: [true, 'Vous devez taper le nom ']
    },
    data: [suiviSub],
    createdAt:{
        type: Date,
        default: Date.now()
    },
    stats: [statsArraySuivi]
})
const suiviSubSchema = new mongoose.Schema({
    mois:
    {
        type: Number,
        default: Number ( new Date().getMonth() + 1)
    },

    data:[suivisubSubSchema]
})

const suiviApprovisonnemntSchema = new mongoose.Schema ({
    annee:
    {
        type: Number,
        default: Number (new Date().getFullYear())
    },
    data:[suiviSubSchema]
});


const BralimaSchema = new mongoose.Schema({

    name: {
        type: String,
        require: [true, 'Vous devez taper le nom'],
        unique: true
    },
   data:[ BralimaSubSchema ],
   stats: [statsArray],
   suiviApprovisionnement: [suiviApprovisonnemntSchema],
});

arraySchema.pre ( 'save', function (next)
{
    this.achat_journalier.qt_btll = this.achat_journalier.qt_caisse * this.achat_journalier.nbr_btll;
    this.benefice_sur_achat.val_gros_approvisionnement = this.achat_journalier.qt_caisse * this.achat_journalier.prix_achat_gros
    this.benefice_sur_achat.val_det = this.achat_journalier.qt_btll * this.vente_journaliere.ref_prix_det;
    this.benefice_sur_achat.benefice = this.benefice_sur_achat.val_det - this.benefice_sur_achat.val_gros_approvisionnement;
    this.business_projection.stock_gen = this.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll + this.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll + this.achat_journalier.qt_btll
    this.business_projection.val_stock_det = this.business_projection.stock_gen * this.vente_journaliere.ref_prix_det;
    this.business_projection.ref_prix_gros =( this.achat_journalier.prix_achat_gros / this.achat_journalier.nbr_btll).toFixed(2);
    this.business_projection.val_stock_gros = this.business_projection.ref_prix_gros * this.business_projection.stock_gen;
    this.stock_apres_vente.reste_stock_depot.qt_btll = this.stock_apres_vente.reste_stock_depot.qt_caisses * this.achat_journalier.nbr_btll;
    this.business_projection.marge_beneficiaire = this.business_projection.val_stock_det - this.business_projection.val_stock_gros;
    this.vente_journaliere.qt_vendue_comptoir = this.business_projection.stock_gen -( this.stock_apres_vente.reste_stock_comptoir.qt_btll + this.stock_apres_vente.reste_stock_depot.qt_btll);
    this.vente_journaliere.valeur = this.vente_journaliere.ref_prix_det * this.vente_journaliere.qt_vendue_comptoir;
    this.benefice_sur_vente =( ( this.vente_journaliere.qt_vendue_comptoir * this.business_projection.marge_beneficiaire) / this.business_projection.stock_gen).toFixed(2);
    this.stock_consignaions.valeur = this.stock_consignaions.qt * this.vente_journaliere.ref_prix_det;
    this.stock_apres_vente.reste_stock_comptoir.valeur = this.stock_apres_vente.reste_stock_comptoir.qt_btll * this.vente_journaliere.ref_prix_det;
    this.stock_apres_vente.reste_stock_depot.valeur = this.stock_apres_vente.reste_stock_depot.qt_btll * this.vente_journaliere.ref_prix_det;
    this.stock_apres_vente.valeur_stock = this.stock_apres_vente.reste_stock_depot.valeur + this.stock_apres_vente.reste_stock_comptoir.valeur;
    
    next();
});



mongoose.set('strictQuery', false);

const Bralima = mongoose.model ( 'Bralima', BralimaSchema);

module.exports = Bralima;