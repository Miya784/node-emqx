"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _dbConfig = require("./src/config/db.config.js");
var _authRoutes = _interopRequireDefault(require("./src/routes/auth.routes.js"));
var _publishRoutes = _interopRequireDefault(require("./src/routes/publish.routes.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));

// Use the separated routes
app.use('/auth', _authRoutes.default);
app.use('/client', _publishRoutes.default);
const PORT = process.env.PORT || '3000';
app.listen(PORT, async () => {
  await _dbConfig.sequelize.sync({
    force: true
  });
  console.log(`Server is running on port ${PORT}`);
});