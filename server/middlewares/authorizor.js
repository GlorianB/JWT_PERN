const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = async (req, res, next) => {
  try {
    const token = req.header('jwt');

    if (!jwt)
      throw "Unauthorized request";

    const payload = await jwt.verify(token, process.env.jwt_secret);
    req.user = payload.user;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(401).json("You have to be logged in to access this page");
  }
};
