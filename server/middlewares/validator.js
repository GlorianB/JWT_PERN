const checkEmail = (userEmail) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
};

exports.registerValidator = (req, res, next) => {
  const { email, name, password } = req.body;
  if (![email, name, password].every(Boolean)) {
    return res.status(401).json("Missing Credentials");
  } else if (!checkEmail(email)) {
    return res.status(401).json("Invalid Email");
  }
  next();
};

exports.loginValidator = (req, res, next) => {
  const { email, password } = req.body;
  if (![email, password].every(Boolean)) {
    return res.status(401).json("Missing Credentials");
  } else if (!checkEmail(email)) {
    return res.status(401).json("Invalid Email");
  }
  next();
};
