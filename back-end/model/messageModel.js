const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: Object,
      required: true,
      ref: "User",
    },
    users: {
      type: Array,
      require: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("message", messageSchema);
