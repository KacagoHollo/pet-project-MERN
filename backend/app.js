const express = require('express');
require('express-async-errors');
const app = express();

const cors = require('cors');

// const { logger } = require("./middleware/logger")
// const morgan = require("morgan");
const auth = require("./middleware/auth")
const { errorHandler } = require("./middleware/errorHandler")



// app.use(
//   cors({
//       origin: process.env.APP_URL,
//       optionsSuccessStatus: 200
//   })
// );
app.use(cors());

app.use(express.json())
// app.use(logger); //minden hívásnál automatikusan lefut ez a middleware
// app.use(morgan(":method :url :status :res[content-length] - :response-time ms")); // use this middleware on every request, logger
// app.use(auth); //de ezt nem akarom minden endpoint hívásnál meghívni, ezért elehlyezhetem másként, a (req, res) elé
// app.use(auth({block}));

const organizationRoutes = require("./route/organization")
app.use('/api/organization', organizationRoutes);
const profileRoutes = require("./route/profile")
app.use('/api/profile', profileRoutes);
const userRoutes = require("./route/user")
app.use('/api/user', userRoutes);


// app.get("/api/public", (req, res) => {
//   // console.log("public")
//   res.send("Public functions")
// })
// app.get("/api/private", auth({block: true}), (req, res) => {
//   // console.log('private')
//   res.send(`Private functions: ${res.locals.userId}`)
  
// })

// app.get("/api/anonymus", auth({block: false}), (req , res) => {
//   if (!res.locals.userId) return res.send("Hello public") 
//   res.send(`Hello anonymus id: ${res.locals.user.userId}`)
// })

app.get("/", (req, res) => {
  console.log("Health check completed");
  res.sendStatus(200);
});


app.use(errorHandler);

module.exports = app;
