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

router
    .route('/rapportJournalier/:year/:month/:day')
    .get(getSuiviDepense)
    .post(updateSuiviDepense);

router
    .route('/rapportJournalier')
    .post(pushSuiviDepense);

router
    .route('/lastElement/:year/:month')
    .get(lastCreatedDataSuiviDepense);

router
    .route('/rapportMensuel/all/:year/:month')
    .get(mensualStasSuiviDepense);

router
    .route ('/rapportMensuel/detail/:year/:month')
    .get(mensualDetailStatsSuiviDepense);

router.route('/rapportJournalier/dailyRap/:year/:month/:day').get(dailyRepportSuiviDepense);

module.exports = router;