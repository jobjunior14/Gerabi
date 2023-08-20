const mongoose = require('mongoose');
const validator = require('validator');

const bralimaSubSchema = new mongoose.Schema ({
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
    no_name:
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
});


const statsData = new mongoose.Schema ({
    mois:{
        type: String,
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
        type: String,
    },

    data:[statsData]
});


const bralimaSchema = new mongoose.Schema({

    name: {
        type: String,
        require: [true, 'Vous devez taper le nom'],
        unique: true
    },
   data:[ bralimaSubSchema ],
   stats: [statsArray]
});

bralimaSubSchema.pre ( 'save', function (next)
{
    this.achat_journalier.qt_btll = this.achat_journalier.qt_caisse * this.achat_journalier.nbr_btll;
    this.benefice_sur_achat.val_gros_approvisionnement = this.achat_journalier.qt_caisse * this.achat_journalier.prix_achat_gros
    this.benefice_sur_achat.val_det = this.achat_journalier.qt_btll * this.vente_journaliere.ref_prix_det;
    this.benefice_sur_achat.benefice = this.benefice_sur_achat.val_det - this.benefice_sur_achat.val_gros_approvisionnement;
    this.no_name.stock_gen = this.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll + this.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll + this.achat_journalier.qt_btll
    this.no_name.val_stock_det = this.no_name.stock_gen * this.vente_journaliere.ref_prix_det;
    this.no_name.ref_prix_gros =( this.achat_journalier.prix_achat_gros / this.achat_journalier.nbr_btll).toFixed(2);
    this.no_name.val_stock_gros = this.no_name.ref_prix_gros * this.no_name.stock_gen;
    this.stock_apres_vente.reste_stock_depot.qt_btll = this.stock_apres_vente.reste_stock_depot.qt_caisses * this.achat_journalier.nbr_btll;
    this.no_name.marge_beneficiaire = this.no_name.val_stock_det - this.no_name.val_stock_gros;
    this.vente_journaliere.qt_vendue_comptoir = this.no_name.stock_gen -( this.stock_apres_vente.reste_stock_comptoir.qt_btll + this.stock_apres_vente.reste_stock_depot.qt_btll);
    this.vente_journaliere.valeur = this.vente_journaliere.ref_prix_det * this.vente_journaliere.qt_vendue_comptoir;
    this.benefice_sur_vente =( ( this.vente_journaliere.qt_vendue_comptoir * this.no_name.marge_beneficiaire) / this.no_name.stock_gen).toFixed(2);
    this.stock_consignaions.valeur = this.stock_consignaions.qt * this.vente_journaliere.ref_prix_det;
    this.stock_apres_vente.reste_stock_comptoir.valeur = this.stock_apres_vente.reste_stock_comptoir.qt_btll * this.vente_journaliere.ref_prix_det;
    this.stock_apres_vente.reste_stock_depot.valeur = this.stock_apres_vente.reste_stock_depot.qt_btll * this.vente_journaliere.ref_prix_det;
    this.stock_apres_vente.valeur_stock = this.stock_apres_vente.reste_stock_depot.valeur + this.stock_apres_vente.reste_stock_comptoir.valeur;
    
    next();
});



mongoose.set('strictQuery', false);

const Bralima = mongoose.model ( 'Bralima', bralimaSchema);

module.exports = Bralima;