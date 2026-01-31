const express = require("express");
const router = express.Router();
const authJwt = require("../middlewares/authJWT.middleware");
const serviceController = require("../controllers/service.controller");

//http://localhost:5002/api/services/
router.get("/", serviceController.getAllServices);

//http://localhost:5002/api/services/
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], serviceController.createService);

//http://localhost:5002/api/services/:id
router.get("/:id", serviceController.getServiceById);

//http://localhost:5005/api/services/:id
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], serviceController.updateService);

//http://localhost:5002/api/services/:id
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], serviceController.deleteService);

module.exports = router;