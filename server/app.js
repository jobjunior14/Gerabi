const express = require("express");
const morgan = require("morgan");
const AppError = require(`${__dirname}/./utils/appError`);
const globalErrorHandler = require(`${__dirname}/./controller/errorHandling`);
const expressLimiter = require('express-rate-limit');
const helmet = require ('helmet');
const mongoSanitizer = require ('express-mongo-sanitize');
const xss = require ('xss-clean');
const app = express();
const dotenv = require ('dotenv');
dotenv.config ({ path: 'config.env'});
//Global Middleware

//set the security http headers
app.use(helmet());

app.use(express.json());
//Data sanitization against NoSQL injection
app.use(mongoSanitizer());

//Data sanitization against XSS attacks
app.use(xss());
//development logging
if (process.env.node_env === 'development') {
  app.use(morgan("dev"));
}
//security thhp headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//limit requests from the same API
const limiter = expressLimiter({
  max: 1500,
  windowMs: 30 * 60 * 1000,
  message: "Too many requests, please try again in 30 minutes"
});
app.use('/api', limiter);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});



// routes for dego Bar
const AutreProduitRouter = require("./routes/degoBar/AutreProduitroutes");
const BralimaRouter = require("./routes/degoBar/bralimaRouter");
const BrasimbaRouter = require ("./routes/degoBar/brasimbaRoutes.js");
const LiqueursRouter = require("./routes/degoBar/liqueursRoutes.js");
const venteDego = require("./routes/degoBar/venteDegoRoutes.js");
const SuiviDepenseRouter = require("./routes/degoBar/suiviDepenseRoutes.js");
const SuiviDetteRouter = require("./routes/degoBar/suiviDetteRouter.js");
const DepenseEff = require ('./routes/degoBar/depenseEffRoutes.js');
const YourSuiviDetteRouter = require('./routes/degoBar/yourSuiviDetteRouter.js');
//routes for Alimentation
const AlimentationAutrePRodduitRouter = require('./routes/alimentation/alimentationAutreProduitRouter.js');
const AlimentationBralima = require('./routes/alimentation/alimentationBralimaRouter.js');
const AlimentationBrasimba = require('./routes/alimentation/alimentationBrasimbaRouter.js');
const AlimentationLiqueurs = require('./routes/alimentation/alimentationLiqueursRouter.js');
const AlimentationSuiviDepenseRouter = require ('./routes/alimentation/alimentationSuiviDepenseRouter');
const VenteAlimentationRouter = require ('./routes/alimentation/venteAlimentationRouter');
const AlimentationSuiviDette = require ('./routes/alimentation/alimentationSuiviDetteRouter');
const DepenseEffAlim = require ("./routes/alimentation/alimDepenseEff.js");
const YourAlimentationSuiviDette = require ('./routes/alimentation/yourAlimentationSuiviDetteRouter.js');
//user's routes
const userRouter = require ('./routes/userRoutes.js');
//3) Routes//
//dego Bar
app.use("/api/v1/degoBar/autreProduit", AutreProduitRouter);
app.use ("/api/v1/degoBar/bralima", BralimaRouter);
app.use ("/api/v1/degoBar/brasimba", BrasimbaRouter);
app.use('/api/v1/degoBar/liqueurs', LiqueursRouter);
app.use("/api/v1/degoBar/vente", venteDego);
app.use("/api/v1/degoBar/suiviDepense", SuiviDepenseRouter);
app.use ("/api/v1/degoBar/suiviDette", SuiviDetteRouter);
app.use ("/api/v1/degoBar/depenseEff", DepenseEff);
app.use("/api/v1/degoBar/yourSuiviDette", YourSuiviDetteRouter);
//alimentation
app.use("/api/v1/alimentation/autreProduit", AlimentationAutrePRodduitRouter );
app.use("/api/v1/alimentation/bralima", AlimentationBralima );
app.use("/api/v1/alimentation/brasimba", AlimentationBrasimba );
app.use("/api/v1/alimentation/liqueurs", AlimentationLiqueurs );
app.use("/api/v1/alimentation/suiviDepense", AlimentationSuiviDepenseRouter);
app.use("/api/v1/alimentation/vente", VenteAlimentationRouter);
app.use("/api/v1/alimentation/suiviDette", AlimentationSuiviDette);
app.use ("/api/v1/alimentation/depenseEff", DepenseEffAlim);
app.use ('/api/v1/alimentation/yourSuiviDette', YourAlimentationSuiviDette);
//user
app.use('/api/v1/user', userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
