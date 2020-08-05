const express = require("express");
const router = express.Router();
const {
    getAllPlaces,
    createPlace,
    getThePlace,
    updateThePlace,
    deleteThePlace,
    createHotels,
    getTheHotel,
    getHotels,
    updateTheHotel,
    deleteTheHotel,
} = require("../helpers/api");

// route --- /api/...
router.route("/places").get(getAllPlaces).post(createPlace);
router
    .route("/places/:placeID")
    .get(getThePlace)
    .put(updateThePlace)
    .delete(deleteThePlace);

router.route("/places/:placeID/hotels").get(getHotels).post(createHotels);
router
    .route("/places/:placeID/hotels/:hotelID")
    .get(getTheHotel)
    .put(updateTheHotel)
    .delete(deleteTheHotel);

module.exports = router;
