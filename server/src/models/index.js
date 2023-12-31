const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/dbConfig.js");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

(async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User.js")(sequelize, DataTypes);
db.Product = require("./Product.js")(sequelize, DataTypes);

(async function sync() {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    throw error;
  }
})();
module.exports = db;
