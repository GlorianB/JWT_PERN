const ORM = require('../core/ORM');


exports.getIndex = async (req, res, next) => {
  try {
    const user = await ORM.getInstance().select("user", {user_id : req.user.id});
    return res.json(user.rows[0].user_name);
  } catch (e) {
    console.error(e.message);
    res.status(500).json("Server error")
  }
};
