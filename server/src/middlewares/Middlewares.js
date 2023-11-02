require("dotenv").config

const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN_SECRET;

class Middlewares {
  verifyToken(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(200).send({
        error: true,
        message: "Please login to continue using the service.",
      });
    }

    jwt.verify(token,secret, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(200).send({
          error: true,
          message: "Authentication Failed.",
        });
      }
      req.userId = decoded.username;
      next();
    });
  }
}
module.exports = new Middlewares();