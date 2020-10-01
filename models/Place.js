const mongoose = require("mongoose");
const Hotel = require("./Hotel");
const geocoder = require("../utils/geocoder");

const placeSchema = new mongoose.Schema({
    images: [String],
    coverImg: String,
    placeName: String,
    hotels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
        },
    ],
    days: Number,
    distance: Number,
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
        },
    },
});

placeSchema.pre("save", async function (next) {
    let loc = await geocoder.geocode(this.placeName);
    this.location = {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
    };

    // go ahead
    next();
});

placeSchema.pre("remove", async function () {
    await Hotel.remove({
        _id: {
            $in: this.hotels,
        },
    });
});

module.exports = mongoose.model("Place", placeSchema);
