const User = require("../model/userModel");

const avatarController = async (req, res) => {
  const { userId, setAvatarImg } = req.body;
  //   console.log(req.body);

  await User.findByIdAndUpdate(userId, {
    avatarImg: setAvatarImg,
    isAvatarImgSet: true,
  });

  const userData = await User.findById(userId);

  if (userData.isAvatarImgSet === true) {
    if (userData.avatarImg === setAvatarImg)
      res.json({
        msg: "Profile Picture has been set.",
        status: true,
        userData,
      });
    else req.json({ msg: "Something went wrong", status: false });
  } else {
    res.json({ msg: "Something went wrong", status: false });
  }
};

module.exports = avatarController;
