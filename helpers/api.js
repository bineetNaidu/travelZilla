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
};
