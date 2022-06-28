const jwt = require("jsonwebtoken");

const auth =
  ({ block }) =>
  (req, res, next) => {
    console.log("authenticating...");
    const token = req.headers.authorization;
    if (!token && block) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err && block) return res.sendStatus(401);
      res.locals.user = user;
    });

    next();
  };

module.exports = auth;