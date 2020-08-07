const mongoose = require("mongoose");

const hotelsSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    price: Number,
    location: String,
    coverImage: String,
    description: String,
    images: [String],
});

module.exports = mongoose.model("Hotel", hotelsSchema);
