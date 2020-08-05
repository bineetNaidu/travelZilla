const Place = require("../models/Place");

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
                return res.send("SOMETHING WENT WRONG WITH THE API");
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
                return res.send("SOMETHING WENT WRONG WITH THE API");
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
};
