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



//Autre Produit 
router
    .route('/raportJournalier/autreProduit/:year/:month/:day')
    .get(getAutreProduit)
    // .post (createAutreProduit) Must find a solution this link must creat and push data
    .post(updateDataAutreProduit);

router
    .route('/raportJournalier/autreProduit/:year/:month')
    .post(pushDataAutreProduit)
    // .get(getOneDataAutreProduit);

    //update in one categorie

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

module.exports = router;