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

//dego Bar
const AutreProduitRouter = require("./routes/degoBar/AutreProduitroutes");
const BralimaRouter = require("./routes/degoBar/bralimaRouter");
const BrasimbaRouter = require ("./routes/degoBar/brasimbaRoutes.js");
const LiqueursRouter = require("./routes/degoBar/liqueursRoutes.js");
const venteDego = require("./routes/degoBar/venteDegoRoutes.js");
const SuiviDepenseRouter = require("./routes/degoBar/suiviDepenseRoutes.js");
const SuiviDetteRouter = require("./routes/degoBar/suiviDetteRouter.js");
//Alimentation
const AlimentationAutrePRodduitRouter = require('./routes/alimentation/alimentationAutreProduitRouter.js');
const AlimentationBralima = require('./routes/alimentation/alimentationBralimaRouter.js');
const AlimentationBrasimba = require('./routes/alimentation/alimentationBrasimbaRouter.js');
const AlimentationLiqueurs = require('./routes/alimentation/alimentationLiqueursRouter.js');
const AlimentationSuiviDepenseRouter = require ('./routes/alimentation/alimentationSuiviDepenseRouter');
const VenteAlimentationRouter = require ('./routes/alimentation/venteAlimentationRouter');
const AlimentationSuiviDette = require ('./routes/alimentation/alimentationSuiviDetteRouter');
//3) Routes
//dego Bar
app.use("/api/v1/degoBar/autreProduit", AutreProduitRouter);
app.use ("/api/v1/degoBar/bralima", BralimaRouter);
app.use ("/api/v1/degoBar/brasimba", BrasimbaRouter);
app.use('/api/v1/degoBar/liqueurs', LiqueursRouter);
app.use("/api/v1/degoBar/vente", venteDego);
app.use("/api/v1/degoBar/suiviDepense", SuiviDepenseRouter);
app.use ("/api/v1/degoBar/suiviDette", SuiviDetteRouter);
//alimentation
app.use("/api/v1/alimentation/autreProduit", AlimentationAutrePRodduitRouter );
app.use("/api/v1/alimentation/bralima", AlimentationBralima );
app.use("/api/v1/alimentation/brasimba", AlimentationBrasimba );
app.use("/api/v1/alimentation/liqueurs", AlimentationLiqueurs );
app.use("/api/v1/alimentation/suiviDepense", AlimentationSuiviDepenseRouter);
app.use("/api/v1/alimentation/vente", VenteAlimentationRouter);
app.use("/api/v1/alimentation/suiviDette", AlimentationSuiviDette);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
