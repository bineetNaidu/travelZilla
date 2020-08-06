const Place = require("../models/Place");
const Hotel = require("../models/Hotel");

module.exports = {
    getAllPlaces: async (req, res, next) => {
        try {
            let data = await Place.find({});
            res.json(data);
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    },
    createPlace: async (req, res, next) => {
        try {
            let data = {
                image: req.body.image,
                location: req.body.location,
                price: req.body.price,
                duration: req.body.duration,
            };
            // console.log(data);
            await Place.create(data);
            res.redirect("/");
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    },
    getThePlace: async (req, res, next) => {
        try {
            let place = await Place.findOne({ _id: req.params.placeID });
            if (!place) {
                return res.json({
                    message: "SOMETHING WENT WRONG WITH THE API",
                });
            }
            await res.json(place);
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    },
    updateThePlace: async (req, res, next) => {
        try {
            let place = await Place.findOne({ _id: req.params.placeID });
            if (!place) {
                return res.json({
                    message: "SOMETHING WENT WRONG WITH THE API",
                });
            }
            if (req.body.image) place.image = req.body.image;
            if (req.body.location) place.location = req.body.location;
            if (req.body.price) place.price = req.body.price;
            if (req.body.duration) place.duration = req.body.duration;
            place.save();
            res.json(place);
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    },
    deleteThePlace: async (req, res, next) => {
        try {
            Place.remove({ _id: req.params.placeID })
                .then(function () {
                    res.json({ message: "Removed the Place" });
                })
                .catch(function (err) {
                    res.send(err);
                });
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    },
    getHotels: async (req, res, next) => {
        let place = await Place.findOne({ _id: req.params.placeID })
            .populate("hotels")
            .exec();
        res.json(place);
    },
    createHotels: async (req, res, next) => {
        try {
            let place = await Place.findOne({ _id: req.params.placeID });
            if (!place) {
                return res.json({
                    message: "SOMETHING WENT WRONG WITH THE API",
                });
            }
            let data = {
                rating: req.body.rating,
                price: req.body.price,
                images: req.body.images,
            };
            let hotel = await Hotel.create(data);
            await place.hotels.push(hotel);
            place.save();
            res.json(hotel);
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    },
    getTheHotel: async (req, res, next) => {
        try {
            let place = await Place.findOne({ _id: req.params.placeID });
            if (!place) {
                return res.json({
                    message: "SOMETHING WENT WRONG WITH THE API",
                });
            }
            let hotel = await Hotel.findOne({ _id: req.params.hotelID });
            if (!hotel) {
                return res.json({
                    message: "SOMETHING WENT WRONG WITH THE API",
                });
            }
            res.json(hotel);
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    },
    updateTheHotel: async (req, res, next) => {
        try {
            let place = await Place.findOne({ _id: req.params.placeID });
            if (!place) {
                return res.json({
                    message: "SOMETHING WENT WRONG WITH THE API",
                });
            }
            let hotel = await Hotel.findOne({ _id: req.params.hotelID });
            if (!hotel) {
                return res.json({
                    message: "SOMETHING WENT WRONG WITH THE API",
                });
            }
            if (req.body.rating) hotel.rating = req.body.rating;
            if (req.body.price) hotel.price = req.body.price;
            if (req.body.images) hotel.images = req.body.images;
            await hotel.save();
            res.json(hotel);
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    },
    deleteTheHotel: async (req, res, next) => {
        try {
            await Place.findByIdAndUpdate(req.params.placeID, {
                $pull: { hotels: req.params.hotelID },
            });
            await Hotel.findByIdAndRemove(req.params.hotelID);
            res.json({ message: "The Hotels data has been deleted" });
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    },
    getAllHotels: async (req, res, next) => {
        let hotels = await Hotel.find({});
        res.json(hotels);
    },
};
