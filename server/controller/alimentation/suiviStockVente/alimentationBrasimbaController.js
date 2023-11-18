const AlimentationBrasimba = require('../../../models/alimentation/alimentationBrasimbaModel');
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
  
  await getCollection (AlimentationBrasimba, req, res);

});

exports.pushDataAutreProduit = catchAssynch(async (req, res, next ) => {
 
  pushDataCollection(req, AlimentationBrasimba, res)
  
});

exports.updateDataAutreProduit = catchAssynch(async (req, res ) => {
  
  updateDataCollection(AlimentationBrasimba, req, res );

});

exports.lastCreatedData = catchAssynch( async (req, res) => {

  lastCreatedDataCollection(AlimentationBrasimba, req, res);
});

exports.stastAutreProduit = catchAssynch(async (req, res) => {

  stastAutreCollection(AlimentationBrasimba, req, res);

});

exports.AllProductStatsAutreProduit = catchAssynch(async (req, res, next) => {
   
  AllProductStatsCollection(AlimentationBrasimba, req, res);

});

exports.yearStatsAutreProduit = catchAssynch(async (req, res, next) => {
  
  yearStatsCollection(AlimentationBrasimba, req, res);
});
