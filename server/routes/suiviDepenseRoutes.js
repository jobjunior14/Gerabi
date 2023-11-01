const express = require('express');
const router = express.Router();

const {
    getSuiviDepense,
    pushSuiviDepense,
    updateSuiviDepense,
    lastCreatedData
} = require('../controller/suiviDepense/suiviDepenseController');

router
    .route('/rapportJournalier/:year/:month/:day')
    .get(getSuiviDepense)
    .post(updateSuiviDepense);

router
    .route('/rapportJournalier').post(pushSuiviDepense);

router
    .route('/rapportJournalier/lastCreated').get(lastCreatedData);

module.exports = router;