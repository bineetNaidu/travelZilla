const Place = require("./models/Place");

let data = [
    {
        images: [
            "https://images.unsplash.com/photo-1527347012399-57712bb5157c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1560235043-5ca64ce84fdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1582092605233-7f8e5af6f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        ],
        location: "Egypt",
        price: 45,
        duration: 125,
        coverImg:
            "https://images.unsplash.com/photo-1596636478939-59fed7a083f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
        images: [
            "https://images.unsplash.com/photo-1596597312523-cfa839e9e033?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1596421138583-fcb22c1a4a2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        ],
        location: "Belgium",
        price: 53,
        duration: 175,
        coverImg:
            "https://images.unsplash.com/photo-1596701572669-dfec5e958796?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
        images: [
            "https://images.unsplash.com/photo-1596706269630-8f480cb67f12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1596542709242-c4449bf48409?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        ],
        location: "Spain",
        price: 78,
        duration: 425,
        coverImg:
            "https://images.unsplash.com/photo-1596708612369-29f5ca3a3ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
        images: [
            "https://images.unsplash.com/photo-1596676912754-cc96890420d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        ],
        location: "Singapore",
        price: 87,
        duration: 54,
        coverImg:
            "https://images.unsplash.com/photo-1522521976874-e5d7c6b90db3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
];

async function seedPlaces() {
    await Place.remove();
    for (let place in data) {
        let { images, price, duration, coverImg, location } = data[place];
        let DATA = {
            images,
            price,
            duration,
            coverImg,
            location,
        };
        let p = new Place(DATA);
        await p.save();
    }
    console.log("done");
}
module.exports = seedPlaces;
