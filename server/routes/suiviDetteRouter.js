const express = require('express');
const router = express.Router();

const {
    getSuiviDette,
    pushSuiviDette,
    updateSuiviDette,
    lastCreatedDataSuiviDette,
    mensualStasSuiviDette,
    mensualStasSuiviDetteDetail,
    totalDette
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
router
    .route('/rapportMensuel/detail/:year/:month')
    .get(mensualStasSuiviDetteDetail);
router
    .route('/rapportJournalier/totDette/:year/:month/:day')
    .get(totalDette);


module.exports = router;