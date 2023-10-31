const DepenseFonctionnement = require(`${__dirname}/../models/depenseFonctionnementModel.js`);
const catchAssynch = require(`${__dirname}/../utils/catchAssynch.js`);
const AppError = require(`${__dirname}/../utils/appError.js`);

function loopingData(array, year, month, day) {

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

exports.getDepense = catchAssynch (async (req, res, next) => {

    //GET DATA
    const data = await DepenseFonctionnement.find();

    res.status(200).json({

        status: 'success',
        data: loopingData(data, Number(req.params.year), Number(req.params.month), Number(req.params.day));
    });
});

exports.pushData = catchAssynch (async (req, res, next) => {
    
    //get data from collection
    const data = await DepenseFonctionnement.find();

    //work with existing data
    if (data.length > 0) {

        for (let i = 0; i < data.length; i++) {


        }
    }
});