
const express = require("express");
const { publish } = require("../controllers/publish.controller.js");
const { addClient } = require("../controllers/client.controller.js");

const router = express.Router();

router.post('/publish', publish);
router.post('/addclient', addClient);

module.exports = router;
