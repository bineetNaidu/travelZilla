const mongoose = require("mongoose");
const Hotel = require("./Hotel");

const placeSchema = new mongoose.Schema({
    images: [String],
    coverImg: String,
    location: String,
    hotels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
        },
    ],
    days: Number,
    distance: Number,
});

placeSchema.pre("remove", async function () {
    await Hotel.remove({
        _id: {
            $in: this.hotels,
        },
    });
});

module.exports = mongoose.model("Place", placeSchema);
