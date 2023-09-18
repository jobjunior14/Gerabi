const express = require('express');
const router = express.Router();
const { getBralima, createBralima, pushDataBralima, getOneData, updateData, stastBralima } = require (('../controller/bralimaController.js'));

const { getAutreProduit,
        createAutreProduit,
        pushDataAutreProduit,
        getOneDataAutreProduit,
        updateDataAutreProduit,
        stastAutreProduit,
        AllProductStatsAutreProduit,
        suiviAllStatsAutreProduit,
        suiviDetailStatsAutreProduit,
        yearStatsAutreProduit
    } = require (('../controller/autreProduitController.js'));

const { getBrasimba, createBrasimba, pushDataBrasimba, getOneDataBrasimba, updateDataBrasimba, stastBrasimba } = require (('../controller/brasimbaController.js'));
const { getLiqueurs, createLiqueurs, pushDataLiqueurs, getOneDataLiqueurs, updateDataLiqueurs, stastLiqueurs } = require (('../controller/liqueursController.js'));

//Bralima Routes
router
    .route('/raportJournalier/bralima')
    .get(getBralima)
    .post (createBralima);

router
    .route('/raportJournalier/bralima/:id')
    .post(pushDataBralima)
    .get(getOneData);

    //update in one categorie
router.route('/raportJournalier/bralima/:id1/:id2').post(updateData);

router
    .route ('/raportJournalier/stastBralima')
    .get (stastBralima)
    // .get (monthlyStatBralima)
    
//Brasimba Routes
router
    .route('/raportJournalier/brasimba')
    .get(getBrasimba)
    .post (createBrasimba);

router
    .route('/raportJournalier/brasimba/:id')
    .post(pushDataBrasimba)
    .get(getOneDataBrasimba);

    //update in one categorie
router.route('/raportJournalier/brasimba/:id1/:id2').post(updateDataBrasimba);

router
    .route ('/raportJournalier/stastBrasimba')
    .get (stastBrasimba)
    // .get (monthlyStatBralima)

//Autre Produit 
router
    .route('/raportJournalier/autreProduit')
    .get(getAutreProduit)
    .post (createAutreProduit);

router
    .route('/raportJournalier/autreProduit/:id')
    .post(pushDataAutreProduit)
    .get(getOneDataAutreProduit);

    //update in one categorie
router.route('/raportJournalier/autreProduit/:id1/:id2').post(updateDataAutreProduit);

 // stats
router
    .route ('/raportMensuel/stastAutreProduit')
    .get (stastAutreProduit);

router
    .route('/raportMensuel/AllstastAutreProduit')
    .get (AllProductStatsAutreProduit);

router
    .route('/raportMensuel/suiviAllStatsAutreProduit')
    .get( suiviAllStatsAutreProduit);

    
router
    .route( '/raportMensuel/suiviDetailStatsAutreProduit')
    .get (suiviDetailStatsAutreProduit);
    
router 
    .route('/raportMensuel/yearStatsAutreProduit')
    .get (yearStatsAutreProduit)


//Liqeurs
router
    .route('/raportJournalier/liqueurs')
    .get(getLiqueurs)
    .post (createLiqueurs);

router
    .route('/raportJournalier/liqueurs/:id')
    .post(pushDataLiqueurs)
    .get(getOneDataLiqueurs);

    //update in one categorie
router.route('/raportJournalier/liqueurs/:id1/:id2').post(updateDataLiqueurs);

router
    .route ('/raportJournalier/stastliqueurs')
    .get (stastLiqueurs);
    // .get (monthlyStatBralima)

module.exports = router;