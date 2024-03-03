
import { Sequelize } from "sequelize";
const dotenv = require("dotenv");

dotenv.config();
const dbURL = process.env.DB_URL || "postgres://burhan:burhan7730@localhost/burhan";
const sequelize = new Sequelize(dbURL, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: false,
    native: true,
    useUTC: false
  },
  timezone: "+07:00"
});

module.exports = { sequelize };
