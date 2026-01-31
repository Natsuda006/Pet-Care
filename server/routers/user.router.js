const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

//http://localhost:5002/api/user/register
router.post("/register", userController.register);

//http://localhost:5002/api/user/login
router.post("/login", userController.login);
module.exports = router;
