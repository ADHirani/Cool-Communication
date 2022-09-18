const getContacts = require("../controller/chatController");

const router = require("express").Router();

router.post("/allChat", getContacts);

module.exports = router;
