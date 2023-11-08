const express = require('express');
const router = express.Router();

const {
    getSuiviDette,
    pushSuiviDette,
    updateSuiviDette,
    lastCreatedDataSuiviDette,
    mensualStasSuiviDette
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
    .get(mensualStasSuiviDette);

module.exports = router;