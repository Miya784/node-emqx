import express from "express";
import bodyParser from "body-parser";
import dbConfig from "./src/config/db.config.mjs";
import authRoutes from "./src/routes/auth.routes.mjs";
import publishRoutes from "./src/routes/publish.routes.mjs";
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
  await dbConfig.sequelize.sync({ force: true });
  console.log(`Server is running on port ${PORT}`);
});
