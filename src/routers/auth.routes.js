
const express = require("express");
const { register, login } = require("../controllers/auth.controller.js");

const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);

module.exports = router;
