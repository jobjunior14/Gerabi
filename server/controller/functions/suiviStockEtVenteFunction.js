const loopingData = require ("../../utils/loopingData")

exports.getCollection = async (collection, request, response) =>{

  const data = await collection.find();


  response.status(200).json({

    status: 'success',
    data: new loopingData(data , Number (request.params.year), Number (request.params.month), Number (request.params.day)).loopingDataSuiviStockEtVente()
  }); 
};

//the last created data 
exports.lastCreatedDataCollection = async (collection, request, response) => {

  //data from collection
  const collectionData = await collection.find();
  
  if (collectionData.length > 0) {
    const lastCreatedData = [];
    for (let i = 0; i < collectionData.length; i++) {
      
      const el1 = collectionData[i].data.length - 1;
      const el2 = collectionData[i].data[el1].data.length - 1;
      const el3 = collectionData[i].data[el1].data[el2].data.length - 1;
      const data = collectionData[i].data[el1].data[el2].data[el3];
      data.name = collectionData[i].name;
      lastCreatedData.push (data);
    };
  
    
    response.status(200).json({
      status: 'success',
      data: lastCreatedData
    });
  } else {

    response.status(200).json ({
      status: 'success',
      data: null
    });
  };

};

exports.stastAutreCollection = async (collection, request, response) => {

  const year = Number(request.params.year);
  const mois = Number(request.params.month);

  let stats = await collection.aggregate([
    {
      $project: {
        stats: {
          $filter: {
            input: "$stats",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.annee", year] },
                { $lte: ["$$data.annee", year] },
              ],
            },
          },
        },
      },
    },

    {
      $unwind: { path: "$stats" },
    },

    {
      $project: {
        stats: {
          $filter: {
            input: "$stats.data",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.mois", mois] },
                { $lte: ["$$data.mois", mois] },
              ],
            },
          },
        },
      },
    },
  ]);

  response.status(200).json({
    status: "success",
    stats: {
      stats,
    },
  });
};

exports.AllProductStatsCollection = async (collection, request, response) => {

  const year = Number(request.params.year);
  const mois = Number(request.params.month);

  let stats = await collection.aggregate([
    {
      $project: {
        stats: {
          $filter: {
            input: "$stats",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.annee", year] },
                { $lte: ["$$data.annee", year] },
              ],
            },
          },
        },
      },
    },

    {
      $unwind: { path: "$stats" },
    },

    {
      $project: {
        stats: {
          $filter: {
            input: "$stats.data",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.mois", mois] },
                { $lte: ["$$data.mois", mois] },
              ],
            },
          },
        },
      },
    },

    {
      $unwind: { path: "$stats" },
    },

    {
      $group: {
        _id: { mois: "$stats.mois" },
        vente_bar: { $sum: "$stats.vente_bar" },
        approvisionnement: { $sum: "$stats.approvisionnement" },
        benefice: { $sum: "$stats.benefice" },
      },
    },
  ]);

  response.status(200).json({
    status: "success",
    stats: {
      stats,
    },
  });

};

exports.yearStatsCollection = async (collection, request, response) => {

  const year = Number(request.params.year);

  const stats = await collection.aggregate([
    {
      $project: {
        stats: {
          $filter: {
            input: "$stats",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.annee", year] },
                { $lte: ["$$data.annee", year] },
              ],
            },
          },
        },
      },
    },

    {
      $unwind: { path: "$stats" },
    },

    {
      $unwind: { path: "$stats.data" },
    },

    {
      $group: {
        _id: { mois: "$stats.data.mois" },
        vente_bar: { $sum: "$stats.data.vente_bar" },
        approvisionnement: { $sum: "$stats.data.approvisionnement" },
        benefice: { $sum: "$stats.data.benefice" },
      },
    },
  ]);

  response.status(200).json({
    status: "success",
    stats: {
      stats,
    },
  });

};

exports.dailyRapCollection = async (collection, request, response) => {

  const data = await collection.find();

  const day = Number (request.params.day);
  const month = Number (request.params.month);
  const year = Number (request.params.year);

  const dailyData =  new loopingData(data, year, month, day).loopingDataSuiviStockEtVente();

  let vente_bar = 0;
  let approvisionnement = 0;
  let benefice = 0;

  for (let i of dailyData.day) {

    vente_bar += i.vente_journaliere.valeur;
    approvisionnement += i.benefice_sur_achat.val_gros_approvisionnement;
    benefice += i.benefice_sur_vente;
  };

  response.status(200).json({
    status: "success",
    data: {
      vente_bar: vente_bar,
      benefice: benefice,
      approvisionnement: approvisionnement
    }
  });
};