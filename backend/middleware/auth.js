const jwt = require("jsonwebtoken");
const { organization } = require("../model/organization");

const auth =
  ({ block }) =>
  (req, res, next) => {
    console.log("authenticating...");
    const token = req.headers.authorization;
    console.log(token)
    if (!token && block) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      console.log(err)
      console.log(auth)
      if (err && block) return res.sendStatus(401);
      res.locals.user = payload;
      
    });

    next();
  };

module.exports = auth;