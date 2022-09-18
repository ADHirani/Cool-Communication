const {
  getMessages,
  sendMessages,
} = require("../controller/messageController");

const router = require("express").Router();

router.post("/getMessages", getMessages);

router.post("/sendMessages", sendMessages);

module.exports = router;
