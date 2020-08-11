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
                images: req.body.image,
                coverImg: req.body.coverImg,
                location: req.body.location,
                days: req.body.days,
                distance: req.body.distance,
            };
            // console.log(data);
            await Place.create(data);
            res.json(data);
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
            if (req.body.images) place.images = req.body.images;
            if (req.body.location) place.location = req.body.location;
            if (req.body.days) place.days = req.body.days;
            if (req.body.distance) place.distance = req.body.distance;
            if (req.body.coverImg) place.coverImg = req.body.coverImg;
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
                name: req.body.name,
                rating: req.body.rating,
                price: req.body.price,
                location: place.location,
                images: req.body.images,
                coverImage: req.body.coverImage,
                description: req.body.description,
                guests: req.body.guests,
                bedrooms: req.body.bedrooms,
                beds: req.body.beds,
                airConditions: req.body.airConditions,
                kitchen: req.body.kitchen,
                wifi: req.body.wifi,
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
            if (req.body.name) hotel.name = req.body.name;
            if (req.body.rating) hotel.rating = req.body.rating;
            if (req.body.price) hotel.price = req.body.price;
            if (req.body.images) hotel.images = req.body.images;
            if (req.body.coverImage) hotel.coverImage = req.body.coverImage;
            if (req.body.description) hotel.description = req.body.description;
            if (req.body.guests) hotel.guests = req.body.guests;
            if (req.body.bedrooms) hotel.bedrooms = req.body.bedrooms;
            if (req.body.beds) hotel.beds = req.body.beds;
            if (req.body.airConditions)
                hotel.airConditions = req.body.airConditions;
            if (req.body.kitchen) hotel.kitchen = req.body.kitchen;
            if (req.body.wifi) hotel.wifi = req.body.wifi;
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
