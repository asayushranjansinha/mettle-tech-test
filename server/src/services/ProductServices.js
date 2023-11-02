const Product = require("../models").Product;
const ProductServices = require("../services")(Product);

module.exports = ProductServices;
