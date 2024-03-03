import axios from "axios";
import { config } from "../config/loadenv.js";

const API = axios.create({
  baseURL: config.APIKEY_URL,
  timeout: 1000,
  auth: {
    username: config.APIKEY,
    password: config.APIKEY_PASS
  },
  headers: {
    "content-type": "application/json"
  }
});

export { API };
