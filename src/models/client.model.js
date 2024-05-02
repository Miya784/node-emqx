// src/models/client.models.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Client = sequelize.define("Client", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    typeClient: {
      type: DataTypes.STRING,
      allowNull: true
    },
    client: {
      type: DataTypes.STRING,
      allowNull: true
    },    
    status: {
        type: DataTypes.STRING,
        allowNull: true
      }
  }, {
    tableName: "Client",
    paranoid: true
  });
  
  export { Client };
  