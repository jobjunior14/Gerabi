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

        sortie_cave: {
            type: Number
        },

        stock_dego: {
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
    },

    suivi1: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

    suivi2: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

    suivi3: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

    suivi4: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

    suivi5: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

    suivi6: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

    suivi7: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

    suivi8: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

    suivi9: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

    suivi10: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

    suivi11: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

    suivi12: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

    suivi13: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

    suivi14: {
        name: {
            type: String,
            default: ""
        },

        qt_caisse: {
            type: Number,
            default: 0
        },

        valeur: {
            type: Number
        }
    },

})
const dataSchema = new mongoose.Schema({
    mois:
    {
        type: Number,
        default: Number ( new Date().toLocaleDateString().slice(3, 5))
    },
    data:[arraySchema]
})
const AutreProduitSubSchema = new mongoose.Schema ({
    annee: 
    {
        type: Number,
        default: Number (new Date().toLocaleDateString().slice(6))
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


const suivisubSubSchema = new mongoose.Schema ({
    name:
    {
        type: String,
        require: true,
    },

    valeur:
    {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const suiviSubSchema = new mongoose.Schema({
    mois:
    {
        type: Number,
        default: Number ( new Date().toLocaleDateString().slice(3, 5))
    },

    data:[suivisubSubSchema]
});

const suiviApprovisonnemntSchema = new mongoose.Schema ({
    annee:
    {
        type: Number,
        default: Number (new Date().toLocaleDateString().slice(6))
    },
    data:[suiviSubSchema]
});


const AutreProduitSchema = new mongoose.Schema({

    name: {
        type: String,
        require: [true, 'Vous devez taper le nom'],
        unique: true
    },
   data:[ AutreProduitSubSchema ],
   stats: [statsArray],
   suiviApprovisionnement: [suiviApprovisonnemntSchema],
});

arraySchema.pre ( 'save', function (next)
{
    this.achat_journalier.qt_btll = this.achat_journalier.qt_caisse * this.achat_journalier.nbr_btll;
    this.benefice_sur_achat.val_gros_approvisionnement = this.achat_journalier.qt_caisse * this.achat_journalier.prix_achat_gros
    this.benefice_sur_achat.val_det = this.achat_journalier.qt_btll * this.vente_journaliere.ref_prix_det;
    this.benefice_sur_achat.benefice = this.benefice_sur_achat.val_det - this.benefice_sur_achat.val_gros_approvisionnement;
    this.business_projection.stock_gen = this.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll + this.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll + this.achat_journalier.qt_btll;
    this.business_projection.stock_dego = this.business_projection.stock_gen - this.business_projection.sortie_cave;
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
    this.suivi1.valeur = this.suivi1.qt_caisse * this.achat_journalier.prix_achat_gros;
    this.suivi2.valeur = this.suivi2.qt_caisse * this.achat_journalier.prix_achat_gros;
    this.suivi3.valeur = this.suivi3.qt_caisse * this.achat_journalier.prix_achat_gros;
    this.suivi4.valeur = this.suivi4.qt_caisse * this.achat_journalier.prix_achat_gros;
    this.suivi5.valeur = this.suivi5.qt_caisse * this.achat_journalier.prix_achat_gros;
    this.suivi6.valeur = this.suivi6.qt_caisse * this.achat_journalier.prix_achat_gros;
    this.suivi7.valeur = this.suivi7.qt_caisse * this.achat_journalier.prix_achat_gros;
    this.suivi8.valeur = this.suivi8.qt_caisse * this.achat_journalier.prix_achat_gros;
    this.suivi9.valeur = this.suivi9.qt_caisse * this.achat_journalier.prix_achat_gros;
    this.suivi10.valeur = this.suivi10.qt_caisse * this.achat_journalier.prix_achat_gros;
    this.suivi11.valeur = this.suivi11.qt_caisse * this.achat_journalier.prix_achat_gros;
    this.suivi12.valeur = this.suivi12.qt_caisse * this.achat_journalier.prix_achat_gros;
    this.suivi13.valeur = this.suivi13.qt_caisse * this.achat_journalier.prix_achat_gros;
    this.suivi14.valeur = this.suivi14.qt_caisse * this.achat_journalier.prix_achat_gros;
    
    next();
});



mongoose.set('strictQuery', false);

const AutreProduit = mongoose.model ( 'AutreProduit', AutreProduitSchema);

module.exports = AutreProduit;