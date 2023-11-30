exports.loopingData = (array, year, month, day) => {

  let dayData = [];
  let id = [];

  for (let i of array) {
    for (let j of i.data) {
      //check if the year is true of false
      if (j.annee === year) {
        for (let o of j.data) {
          //cheking of the month
          if (o.mois === month) {
            for (let p of o.data) {
              //cheking of the day
              if (Number(JSON.stringify(p.createdAt).slice(9, 11)) === day) {
                //then push the product id in a array if there is a correspondance in (it's true every where)
                id.push(i._id);
                p.name = i.name;
                dayData.push(p);
              }
            }
          }
        }
      }
    }
  }

  return { id: id, day: dayData };
};

function loopingData (array, year, month, day) {
     let dayData = [];
  let id = [];

  for (let i of array) {
    for (let j of i.data) {
      //check if the year is true of false
      if (j.annee === year) {
        for (let o of j.data) {
          //cheking of the month
          if (o.mois === month) {
            for (let p of o.data) {
              //cheking of the day
              if (Number(JSON.stringify(p.createdAt).slice(9, 11)) === day) {
                //then push the product id in a array if there is a correspondance in (it's true every where)
                id.push(i._id);
                p.name = i.name;
                dayData.push(p);
              }
            }
          }
        }
      }
    }
  }

  return { id: id, day: dayData };
};

exports.getCollection = async (collection, request, response) =>{

  const data = await collection.find();


  response.status(200).json({

    status: 'success',
    data: loopingData(data , Number (request.params.year), Number (request.params.month), Number (request.params.day))
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
        approvionnement: { $sum: "$stats.approvionnement" },
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
        approvionnement: { $sum: "$stats.data.approvionnement" },
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

  const dailyData = loopingData(data, year, month, day);

  let vente_bar = 0;
  let approvionnement = 0;
  let benefice = 0;

  for (let i of dailyData.day) {

    vente_bar += i.vente_bar;
    approvionnement += i.approvionnement;
    benefice += i.benefice;
  };

  response.status(200).json({
    status: "success",
    data: {
      vente_bar: vente_bar,
      benefice: benefice,
      approvionnement: approvionnement
    }
  });
};