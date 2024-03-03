import express from "express";
import bodyParser from "body-parser";
import dbConfig from "./src/config/db.config.js";
import authRoutes from "./src/routes/auth.routes.js";
import publishRoutes from "./src/routes/publish.routes.js";
import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the separated routes
app.use('/auth', authRoutes);
app.use('/client', publishRoutes);

const PORT = process.env.PORT || '3000';
app.listen(PORT, async () => {
  await dbConfig.sequelize.sync();
  console.log(`Server is running on port ${PORT}`);
});
