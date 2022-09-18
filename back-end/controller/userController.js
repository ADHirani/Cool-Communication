const User = require("../model/userModel");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  const { email, password } = await req.body;
  const userData = await User.findOne({ email });
  if (!userData) {
    // res.send("Wrong Password or Username.");
    return res.json({ msg: "Wrong password please try again", status: false });
  } else {
    const isPassCorrect = bcrypt.compareSync(password, userData.password);

    if (!isPassCorrect) {
      // res.send("Wrong Password or Username.");
      return res.json({ msg: "Wrong password or Email", status: false });
    } else {
      return res.json({
        msg: "Thanks for login with us.",
        status: true,
        userData,
      });
    }
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, password } = req.body;
    const emailCheck = await User.findOne({ email });
    // console.log(emailCheck);
    if (emailCheck)
      return res.json({
        msg: "User already exist, please try to login.",
        status: false,
      });
    // const salt = await bcrypt.genSaltSync(10);
    const salt = process.env.BCRYPT_SALT;
    const encryptedPassword = await bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      gender,
      password: encryptedPassword,
    });
    delete newUser.password;
    return res.status(201).json({ status: true, newUser });
  } catch (err) {
    res.status(400).json({
      msg: "error occurs please try again",
      error: err,
      status: false,
    });
  }
};

module.exports = { loginUser, registerUser };
