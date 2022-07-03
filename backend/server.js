require("dotenv").config();
const port = process.env.PORT
const mongoose = require('mongoose');
const app = require('./app')


mongoose.connect(process.env.CONNECTION_STRING, {
//   useNewUrlParser: true,
// useUnifiedTopology: true,
// useFindAndModify: false
}, () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})