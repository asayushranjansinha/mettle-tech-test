const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController.js");
const Middlewares = require("../middlewares/Middlewares.js");

router.post("/signup", UserController.signup);

router.post("/signin", UserController.signin);



module.exports = router;
