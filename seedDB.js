const Place = require("./models/Place");
const Hotel = require("./models/Hotel");
let data = [
    {
        images: [
            "https://bit.ly/3h869q4",
            "https://bit.ly/2DR5kDT",
            "https://bit.ly/3gXFHPY",
        ],
        placeName: "Bangalore IN",
        days: 24,
        distance: 325,
        coverImg: "https://bit.ly/2Fos4LX",
    },
    {
        images: [
            "https://bit.ly/3aoB5jl",
            "https://bit.ly/33XkVMJ",
            "https://bit.ly/3g3XjbX",
        ],
        placeName: "West Bengal IN",
        days: 18,
        distance: 275,
        coverImg: "https://bit.ly/33ZZcnC",
    },
    {
        images: [
            "https://bit.ly/3iDaW3k",
            "https://bit.ly/2Fl6W9f",
            "https://bit.ly/2CrFc1N",
        ],
        placeName: "Rajasthan IN",
        days: 12,
        distance: 155,
        coverImg: "https://bit.ly/3gXs8Qu",
    },
    {
        images: [
            "https://bit.ly/3apgoE1",
            "https://bit.ly/30XnE7c",
            "https://bit.ly/2DKKyWC",
        ],
        placeName: "New Delhi IN",
        distance: 84,
        days: 8,
        coverImg: "https://bit.ly/2PTbTIk",
    },
];

async function seedPlaces() {
    await Hotel.remove().then(() => console.log("removed hotels"));
    await Place.remove();
    for (let place in data) {
        let { images, distance, coverImg, placeName, days } = data[place];
        let DATA = {
            images,
            days,
            distance,
            coverImg,
            placeName,
        };
        let p = new Place(DATA);
        await p.save();
    }
    console.log("done");
}
module.exports = seedPlaces;
