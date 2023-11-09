const express = require('express');
const router = express.Router();

const {
    getSuiviDette,
    pushSuiviDette,
    updateSuiviDette,
    lastCreatedDataSuiviDette,
    mensualStasSuiviDepense
} = require('../controller/suiviDette/suiviDetteController');

router
    .route('/rapportJournalier/:year/:month/:day')
    .get(getSuiviDette)
    .post(updateSuiviDette);

router
    .route('/rapportJournalier')
    .post(pushSuiviDette);

router
    .route('/lastElement/:year/:month')
    .get(lastCreatedDataSuiviDette);

router
    .route('/rapportMensuel/all/:year/:month')
    .get(mensualStasSuiviDepense);

module.exports = router;