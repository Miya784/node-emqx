"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.Client = void 0;
var _sequelize = require("sequelize");
var _dbConfig = require("../config/db.config.js");
// user.model.js

const User = exports.User = _dbConfig.sequelize.define("User", {
  user: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "user",
  paranoid: true
});
const Client = exports.Client = _dbConfig.sequelize.define("Client", {
  userId: {
    type: _sequelize.DataTypes.INTEGER,
    // Assuming userId is of type INTEGER
    allowNull: false
  },
  typeClient: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  client: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "Client",
  paranoid: true
});