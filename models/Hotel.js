const mongoose = require("mongoose");

const hotelsSchema = new mongoose.Schema({
    ration: Number,
    price: Number,
    images: [String],
});

module.exports = mongoose.model("Hotel", hotelsSchema);
