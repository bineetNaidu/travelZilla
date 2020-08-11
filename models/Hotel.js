const mongoose = require("mongoose");

const hotelsSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    price: Number,
    location: String,
    coverImage: String,
    description: String,
    images: [String],
    guests: Number,
    bedrooms: Number,
    beds: Number,
    airConditions: Boolean,
    kitchen: Boolean,
    wifi: Boolean,
});

module.exports = mongoose.model("Hotel", hotelsSchema);
