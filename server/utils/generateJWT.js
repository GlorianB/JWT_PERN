const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (user_id) => {
  const payload = {
    user : {
      id : user_id
    }
  }

  return jwt.sign(payload, process.env.jwt_secret, {expiresIn : '24h'});
}
