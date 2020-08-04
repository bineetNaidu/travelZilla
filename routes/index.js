const express = require("express");
const router = express.Router();
const { getAllPlaces, createPlace } = require("../helpers/api");

// route --- /api/...
router.route("/places").get(getAllPlaces).post(createPlace);

module.exports = router;
