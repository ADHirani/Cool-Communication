const router = require("express").Router();
const avatarController = require("../controller/avatarController");

router.post("/", avatarController);

module.exports = router;
