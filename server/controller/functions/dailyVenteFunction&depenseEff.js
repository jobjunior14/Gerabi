const AppError = require('../../utils/appError');

function loopingData(array, year, month, day) {

  let dayData = null;
  //iterate through i of
  for (let i of array) {
    //check if the year is true of false
    if (i.annee === year) {
      for (let o of i.data) {
        //cheking of the month
        if (o.mois === month) {
          for (let p of o.data) {
            //cheking of the day
            if (Number(JSON.stringify(p.createdAt).slice(9, 11)) === day) {
              //then push the product id in a array if there is a correspondance in (it's true every where)
              dayData = p;
            }
          }
        }
      }
    }
  };

  return dayData;
};

exports.getVente = async ({collection, req, res}) => {

  const vente = await collection.find();

  // then the response ....
  res.status(200).json({
    status: "success",
    data: {
      day: loopingData(
        vente,
        Number(req.params.year),
        Number(req.params.month),
        Number(req.params.day)
      ),
    },
  });
};

exports.pushDataVente = async ({collection, req, res}) => {

  const vente = await collection.find();

  const year = Number(req.query.year);
  const month = Number(req.query.month);
  const day = Number(req.query.day);

  const yearIndex = vente.findIndex((el) => el.annee === year);

  if (yearIndex !== -1) {

    const monthIndex = vente[yearIndex].data.findIndex( el => el.mois === month );

    if (monthIndex !== -1) {

      const dayIndex = vente[yearIndex].data[monthIndex].data.findIndex( el => Number(JSON.stringify(el.createdAt).slice(9, 11)) === day );

      if (dayIndex === -1) {

        vente[yearIndex].data[monthIndex].data.push(req.body);
      }
    } else {

      vente[yearIndex].data.push({ data: req.body });
    };
    
    await vente[yearIndex].save();

    res.status(200).json({
      statusbar: "success",
      data: {
        day: loopingData(vente, year, month, day),
      }
    });

  } else {

    const newVente = await collection.create({

      data: {
        data: req.body,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        day: loopingData([newVente], year, month, day)
      }
    });
  }
};

exports.updatevente = async ({collection, req, res, next}) => {

  const vente = await collection.find();

  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const day = Number(req.params.day);


    const yearIndex = await vente.findIndex((el) => el.annee === year);

    if (yearIndex !== -1) {
      
      const monthIndex = await vente[yearIndex].data.findIndex( el => el.mois === month );
      
      if (monthIndex !== -1) {
        
        const dayIndex = await vente[yearIndex].data[monthIndex].data.findIndex( el => Number(JSON.stringify(el.createdAt).slice(9, 11)) === day );

        if (dayIndex !== -1) {

          vente[yearIndex].data[monthIndex].data[dayIndex] = {...req.body };
          vente[yearIndex].data[monthIndex].markModified('data');


        } else {

         return next(new AppError("Cette donnee est inexistante", 404));
        }
      } else {

        return next(new AppError("Cette donnee est inexistante", 404));
      }
    } else {
      return next(new AppError("Cette donnee est inexistante", 404));
    };
    
    await vente[yearIndex].save(function (err) {
      if (err) {
        console.log(err);
        return;
      };
    });


  res.status(200).json({
    status: "success",
    data: {
      day: loopingData(vente, year, month, day),
    },
  });
};

exports.monthStatsVente = async ({collection, req, res}) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);

  const stats = await collection.aggregate([
    {
      $match: { annee: { $eq: year } },
    },

    {
      $project: {
        stats: {
          $filter: {
            input: "$data",
            as: "data",
            cond: {
              $and: [
                { $gte: ["$$data.mois", month] },
                { $lte: ["$$data.mois", month] },
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
        _id : null,
        venteDego: { $sum: "$stats.data.valeur" },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    stats: {
      stats,
    },
  });
};
