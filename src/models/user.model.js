
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
export { User };
