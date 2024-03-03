"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// emqx-api.js

_dotenv.default.config();
const emqxBaseUrl = process.env.APIKEY_URL; // Replace with your EMQX server URL
const username = process.env.APIKEY; // Replace with your API key
const password = process.env.APIKEY_PASS;
const API = exports.API = _axios.default.create({
  baseURL: emqxBaseUrl,
  timeout: 1000,
  auth: {
    username,
    password
  },
  headers: {
    "content-type": "application/json"
  }
});