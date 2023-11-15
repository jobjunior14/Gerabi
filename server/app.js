const express = require("express");
const morgan = require("morgan");
const AppError = require(`${__dirname}/./utils/appError`);
const globalErrorHandler = require(`${__dirname}/./controller/errorHandling`);
const app = express();

//First Middleware
app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const AutreProduitRouter = require("./routes/AutreProduitroutes.js");
const BralimaRouter = require("./routes/bralimaRouter.js");
const BrasimbaRouter = require ("./routes/brasimbaRoutes.js");
const LiqueursRouter = require("./routes/liqueursRoutes.js");
const venteDego = require("./routes/venteDegoRoutes.js");
const SuiviDepenseRouter = require("./routes/suiviDepenseRoutes.js");
const SuiviDetteRouter = require("./routes/suiviDetteRouter.js");
const AlimentationAutrePRodduitRouter = require('./routes/alimentation/alimentationAutreProduitRouter.js');
const AlimentationBralima = require('./routes/alimentation/alimentationBralimaRouter.js');
const AlimentationBrasimba = require('./routes/alimentation/alimentationBrasimbaRouter.js');
const AlimentationLiqueurs = require('./routes/alimentation/alimentationLiqueursRouter.js');



//3) Routes
//dego Bar
app.use("/api/v1/autreProduit", AutreProduitRouter);
app.use ("/api/v1/bralima", BralimaRouter);
app.use ("/api/v1/brasimba", BrasimbaRouter);
app.use('/api/v1/liqueurs', LiqueursRouter);
app.use("/api/v1/vente", venteDego);
app.use("/api/v1/suiviDepense", SuiviDepenseRouter);
app.use ("/api/v1/suiviDette", SuiviDetteRouter);
//alimentation
app.use("/api/v1/autreProduit", AlimentationAutrePRodduitRouter );
app.use("/api/v1/bralima", AlimentationBralima );
app.use("/api/v1/brasimba", AlimentationBrasimba );
app.use("/api/v1/liqueurs", AlimentationLiqueurs );

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
