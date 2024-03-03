
import { Sequelize } from "sequelize";

const dbURL = process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/postgres";
export const sequelize = new Sequelize(dbURL, {
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


export default sequelize;
