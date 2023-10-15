const AppError = require(`${__dirname}/../utils/appError.js`);
const VenteDego = require(`${__dirname}/../models/venteDegoModel.js`);
const catchAssynch = require(`${__dirname}/../utils/catchAssynch.js`);

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
  }

  return dayData;
}

exports.getVenteDego = catchAssynch(async (req, res, next) => {
  const vente = await VenteDego.find();

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
});

exports.pushDataVente = catchAssynch(async (req, res, next) => {

  const vente = await VenteDego.find();

  const year = Number(new Date().getFullYear());
  const month = Number(new Date().getMonth() + 1);
  const day = Number(new Date().getDate());

  const yearIndex = vente.findIndex((el) => el.annee === year);

  if (yearIndex !== -1) {

    const monthIndex = vente[yearIndex].data.findIndex( el => el.mois === month );

    if (monthIndex !== -1) {

      const dayIndex = vente[yearIndex].data[monthIndex].data.findIndex((el) => Number(JSON.stringify(el.createdAt).slice(9, 11) === day) );

      if (dayIndex === -1) {

        vente[yearIndex].data[monthIndex].data.push(req.body);
      }
    } else {

      vente[yearIndex].data.push({ data: req.body });
    };
    
    await vente[yearIndex].save();

    res.status(200).json({
      statusbar: "success",
      data: loopingData(vente, year, month, day),
    });

  } else {
    const newVente = await VenteDego.create({
      data: {
        data: req.body,
      },
    });

    res.status(200).json({
      status: "success",
      data: loopingData(newVente, year, month, day)
    });
  }
});

exports.updatevente = catchAssynch(async (req, res, next) => {

  const vente = await VenteDego.find();

  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const day = Number(req.params.day);


    const yearIndex = await vente.findIndex((el) => el.annee === year);

    if (yearIndex !== -1) {
      console.log (yearIndex);

      const monthIndex = await vente[yearIndex].data.findIndex( el => el.mois === month );

      if (monthIndex !== -1) {

        const dayIndex = await vente[yearIndex].data[monthIndex].data.findIndex( el => Number(JSON.stringify(el.createdAt).slice(9, 11)) === day );

        if (dayIndex !== -1) {

          vente[yearIndex].data[monthIndex].data[dayIndex] = {...req.body, createdAt: `${year}-${month}-${day}T07:22:54.930Z`, };

        } else {

         return next(new AppError("Cette donnee est inexistante", 404));
        }
      } else {

        return next(new AppError("Cette donnee est inexistante", 404));
      }
    } else {
      return next(new AppError("Cette donnee est inexistante", 404));
    }
  

  await vente[yearIndex].save();

  res.status(200).json({
    status: "success",
    data: {
      day: loopingData(vente, year, month, day),
    },
  });
});

exports.monthStatsVente = catchAssynch(async (req, res, next) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);

  const stats = await VenteDego.aggregate([
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
});
