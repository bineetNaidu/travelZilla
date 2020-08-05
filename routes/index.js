const express = require("express");
const router = express.Router();
const {
    getAllPlaces,
    createPlace,
    getThePlace,
    updateThePlace,
    deleteThePlace,
} = require("../helpers/api");

// route --- /api/...
router.route("/places").get(getAllPlaces).post(createPlace);
router
    .route("/places/:placeID")
    .get(getThePlace)
    .put(updateThePlace)
    .delete(deleteThePlace);

module.exports = router;
