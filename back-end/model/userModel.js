const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
  },
  lastName: {
    type: String,
    required: false,
    min: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAvatarImgSet: {
    type: Boolean,
    default: false,
  },
  avatarImg: {
    type: String,
    default:
      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg",
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
