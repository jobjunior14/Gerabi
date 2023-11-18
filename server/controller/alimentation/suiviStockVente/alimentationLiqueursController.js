const AlimentationLiqueurs = require('../../../models/alimentation/alimentationLiqueursModel');
const catchAssynch = require(`../../../utils/catchAssynch`);

const {
  getCollection, 
  pushDataCollection, 
  updateDataCollection, 
  stastAutreCollection,
  AllProductStatsCollection, 
  yearStatsCollection,
  lastCreatedDataCollection
} =  require ("../../functions/alimentation/suiviStockVenteAlimentationFucntion");

exports.getAutreProduit = catchAssynch(async (req, res ) => {
  
  await getCollection (AlimentationLiqueurs, req, res);

});

exports.pushDataAutreProduit = catchAssynch(async (req, res, next ) => {
 
  pushDataCollection(req, AlimentationLiqueurs, res)
  
});

exports.updateDataAutreProduit = catchAssynch(async (req, res ) => {
  
  updateDataCollection(AlimentationLiqueurs, req, res );

});

exports.lastCreatedData = catchAssynch( async (req, res) => {

  lastCreatedDataCollection(AlimentationLiqueurs, req, res);
});

exports.stastAutreProduit = catchAssynch(async (req, res) => {

  stastAutreCollection(AlimentationLiqueurs, req, res);

});

exports.AllProductStatsAutreProduit = catchAssynch(async (req, res, next) => {
   
  AllProductStatsCollection(AlimentationLiqueurs, req, res);

});

exports.yearStatsAutreProduit = catchAssynch(async (req, res, next) => {
  
  yearStatsCollection(AlimentationLiqueurs, req, res);
});
