const AlimentationAutreProduit = require('../../../models/alimentation/alimentationAutreProduitModel');
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
  
  await getCollection (AlimentationAutreProduit, req, res);

});

exports.pushDataAutreProduit = catchAssynch(async (req, res, next ) => {
 
  await pushDataCollection(req, AlimentationAutreProduit, res)
  
});

exports.updateDataAutreProduit = catchAssynch(async (req, res ) => {
  
  updateDataCollection(AlimentationAutreProduit, req, res );

});

exports.lastCreatedData = catchAssynch( async (req, res) => {

  lastCreatedDataCollection(AlimentationAutreProduit, req, res);
});

exports.stastAutreProduit = catchAssynch(async (req, res) => {

  stastAutreCollection(AlimentationAutreProduit, req, res);

});

exports.AllProductStatsAutreProduit = catchAssynch(async (req, res, next) => {
   
  AllProductStatsCollection(AlimentationAutreProduit, req, res);

});

exports.yearStatsAutreProduit = catchAssynch(async (req, res, next) => {
  
  yearStatsCollection(AlimentationAutreProduit, req, res);
});
