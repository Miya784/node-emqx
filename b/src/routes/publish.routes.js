"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _publishController = require("../controllers/publish.controller.js");
var _clientController = require("../controllers/client.controller.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// publish.routes.js

const router = _express.default.Router();
router.post('/publish', _publishController.publish);
// router.get('/topics/:typeClient', topics);
router.post('/addclient', _clientController.addClient);
var _default = exports.default = router;