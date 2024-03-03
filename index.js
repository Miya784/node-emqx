const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./src/config/db.config.js");
const authRoutes = require("./src/routes/auth.routes.js");
const publishRoutes = require("./src/routes/publish.routes.js");
const dotenv = require("dotenv");

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