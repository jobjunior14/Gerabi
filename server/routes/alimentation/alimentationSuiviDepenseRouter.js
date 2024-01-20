const express = require('express');
const router = express.Router();

const {
    getSuiviDepense,
    pushSuiviDepense,
    updateSuiviDepense,
    lastCreatedDataSuiviDepense,
    mensualStasSuiviDepense,
    mensualDetailStatsSuiviDepense,
    dailyRepportSuiviDepense
} = require('../../controller/alimentation/suiviDepense/suiviDepenseAlimentation');

const {protect} = require('../../controller/userAuth');

router
    .route('/rapportJournalier/:year/:month/:day')
    .get(protect, getSuiviDepense)
    .post(protect,updateSuiviDepense);

router
    .route('/rapportJournalier')
    .post(protect,pushSuiviDepense);

router
    .route('/lastElement/:year/:month')
    .get(protect, lastCreatedDataSuiviDepense);

router
    .route('/rapportMensuel/all/:year/:month')
    .get(protect, mensualStasSuiviDepense);

router
    .route ('/rapportMensuel/detail/:year/:month')
    .get(protect, mensualDetailStatsSuiviDepense);

router.route('/rapportJournalier/dailyRap/:year/:month/:day').get(protect, dailyRepportSuiviDepense);

module.exports = router;