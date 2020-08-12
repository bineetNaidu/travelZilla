const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const hotelsSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    price: Number,
    placeName: String,
    address: {
        type: String,
        required: [true, "Please add an address"],
    },
    coverImage: String,
    description: String,
    images: [String],
    guests: Number,
    bedrooms: Number,
    beds: Number,
    airConditions: Boolean,
    kitchen: Boolean,
    wifi: Boolean,
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ["Point"], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
        },
        formattedAddress: String,
    },
});

hotelsSchema.pre("save", async function (next) {
    let loc = await geocoder.geocode(this.address);
    this.location = {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
    };

    // go ahead
    next();
});

module.exports = mongoose.model("Hotel", hotelsSchema);
