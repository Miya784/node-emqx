"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;
var _sequelize = require("sequelize");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Import Sequelize

_dotenv.default.config();
const dbURL = process.env.DB_URL || "postgres://burhan:burhan7730@localhost/burhan";
const sequelize = exports.sequelize = new _sequelize.Sequelize(dbURL, {
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