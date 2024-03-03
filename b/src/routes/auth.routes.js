"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("../controllers/auth.controller.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// auth.routes.js

const router = _express.default.Router();
router.post('/signup', _authController.register);
router.post('/signin', _authController.login);
var _default = exports.default = router;