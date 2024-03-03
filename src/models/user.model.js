
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const User = sequelize.define("User", {
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "user",
  paranoid: true
});

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
  }
}, {
  tableName: "Client",
  paranoid: true
});

export { User, Client };
