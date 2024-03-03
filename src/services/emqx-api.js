import axios from "axios";

const emqxBaseUrl = process.env.APIKEY_URL; // Replace with your EMQX server URL
const username = process.env.APIKEY; // Replace with your API key
const password = process.env.APIKEY_PASS;

const API = axios.create({
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

export { API };
