// src/config/loadenv.config.js
import dotenv from "dotenv";
dotenv.config(".env");

const config = {
    PORT: process.env.PORT || 3000
    , DB_URL: process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/postgres"
    , APIKEY_URL: process.env.APIKEY_URL 
    , APIKEY: process.env.APIKEY || ""
    , APIKEY_PASS: process.env.APIKEY_PASS || ""
    , API_AUTHEN: process.env.API_AUTHEN
    , API_PUBLISH: process.env.API_PUBLISH
    , API_TOPICS: process.env.API_TOPICS
}

export { config };