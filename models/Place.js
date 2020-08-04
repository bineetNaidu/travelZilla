const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    image: String,
    location: String,
    price: Number,
    hotels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
        },
    ],
    duration: Number,
});

module.exports = mongoose.model("Place", placeSchema);
