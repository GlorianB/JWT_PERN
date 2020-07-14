const ORM = require('../core/ORM');
const bcrypt = require('bcrypt');
const generatejwt = require('../utils/generateJWT');


exports.getRegister = (req, res, next) => {
  try {
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Server error");
  }
};

exports.postRegister = async (req, res, next) => {
  try {
    //1. destructure request body
    const { name, email, password } = req.body;

    //2. check if user exists. if exists throw error
    const user = await ORM.getInstance().select("user", {'user_email' : email});
    if (user.rows.length > 0)
      return res.status(403).send("User already exsist");

    //3. crypt user password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    //4. enter password into our database
    const newUser = await ORM.getInstance().insert("user", [name, email, hashedPassword], ['user_name', 'user_email', 'user_password']);

    //5. generate token
    const jwt = generatejwt(newUser.rows[0].user_id);
    return res.status(200).json({ jwt });
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Server error");
  }
};

exports.getLogin = (req, res, next) => {
  try {
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Server error");
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    //1. destructure request body
    const { email, password } = req.body;

    //2. check if user doesn't exists. if doesn't exists throw error
    const user = await ORM.getInstance().select("user", {'user_email' : email});
    if (user.rows.length < 1)
      return res.status(403).send("Incorrect login or password");

    //3. compare password
    const hashedPassword = user.rows[0].user_password
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match)
      return res.status(403).send("Incorrect login or password");

    //4. send token
    const jwt = generatejwt(user.rows[0].user_id);
    return res.status(200).json({ jwt });
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Server error");
  }
};

exports.is_verify = async (req, res, next) => {
  try {
    res.json(true);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Server error");
  }
};
