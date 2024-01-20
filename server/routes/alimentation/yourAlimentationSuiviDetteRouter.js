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
} = require('../../controller/alimentation/suiviDette/yourSuiviDetteAlimentationController');

const {protect } = require('../../controller/userAuth');
router
    .route('/rapportJournalier/:year/:month/:day')
    .get(protect,getSuiviDette)
    .post(protect,updateSuiviDette);

router
    .route('/rapportJournalier')
    .post(protect,pushSuiviDette);

router
    .route('/lastElement/:year/:month')
    .get(protect,lastCreatedDataSuiviDette);

router
    .route('/rapportMensuel/all/:year/:month')
    .get(protect,mensualStasSuiviDette);
router
    .route('/rapportMensuel/detail/:year/:month')
    .get(protect,mensualStasSuiviDetteDetail);
router
    .route('/rapportJournalier/totDette/:year/:month/:day')
    .get(protect,totalDette);


module.exports = router;