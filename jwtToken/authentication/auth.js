var jwt = require("jsonwebtoken");

module.exports = {
  generateJWT: async user => {
    try {
      var payload = { userId: user.id, email: user.email };
      var token = await jwt.sign(payload, process.env.SECRET);
      return token;
    } catch (error) {
      next(error);
    }
  },

  verifyToken: async (req, res, next) => {
    var token = req.headers["authorization"] || "";
    if (token) {
      try {
        var payload = await jwt.verify(token, process.env.SECRET);
        req.user = payload;
        req.user.token = token;
        next();
      } catch (error) {
        res.json({ message: "invalid token", error });
        next();
      }
    } else {
      res.json({ msg: "Token required" });
      next();
    }
  }
};
