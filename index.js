import express from "express";
import bodyParser from "body-parser";
import dbConfig from "./src/config/db.config.js";
import authRoutes from "./src/routes/auth.routes.js";
import publishRoutes from "./src/routes/publish.routes.js";
import { config } from "./src/config/loadenv.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the separated routes
app.use('/auth', authRoutes);
app.use('/client', publishRoutes);

const PORT = config.PORT || '3000';
app.listen(PORT, async () => {
  await dbConfig.sequelize.sync({ alter: true });
  console.log(`Server is running on port ${PORT}`);
});
