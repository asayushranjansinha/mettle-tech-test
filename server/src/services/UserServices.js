const User = require("../models/index.js").User;
const UserServices = require("../services")(User);

module.exports = UserServices;
