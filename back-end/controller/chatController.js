const User = require("../model/userModel");

const getContacts = async (req, res, next) => {
  try {
    const allContacts = await User.find({ _id: { $ne: `${req.body.userId}` } });
    res.json(allContacts);
  } catch (err) {
    next(err);
  }
};

module.exports = getContacts;
