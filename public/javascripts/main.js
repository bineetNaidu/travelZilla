// actions
$(".search-box").on("click", "div.five button.btn-search", (event) => {
    event.preventDefault();
    let $input = $("div.five input");
    $input.focus();
});
const tl = gsap.timeline({ defaults: { duration: 0.5 } });
$(document).ready(function () {
    $.getJSON("/api/places")
        .then(addPlaces)
        .catch((error) => console.log(error));

    $.getJSON("/api/hotels")
        .then(addHotels)
        .catch((error) => console.log(error));

    $("button.dropbtn").on("click", () => {
        $(".user .drop-content").toggleClass("hide");
    });

    $(".places__card").on("click", ".place__box", function () {
        let id = this.dataset.id;
        $.getJSON(`/api/places/${id}/hotels`)
            .then(addPlaceToSideBar)
            .catch((error) => console.log(error));

        tl.to(".side-modals", { x: 0, ease: "power1.out" });

        $(".side-modals__header i").on("click", () => {
            tl.to(".side-modals", { x: "100%", ease: "power1.out" });
            $("#queries").remove();
        });
    });
});

function addPlaces(places) {
    for (const place of places) {
        let element = `
    <div class="place__box" style="background-image: url('${place.coverImg}");' data-id="${place._id}">
            <div class="place__details">
                <h5>${place.location}</h5>
                <div class="meta-data">
                    <p>
                        <i class="fas fa-briefcase"></i>
                        ${place.days} days
                    </p>
                    <p>
                        <i class="fas fa-map-pin"></i>
                        ${place.distance}Km
                    </p>
                </div>
            </div>
    </div>
    `;

        $(".places .places__card").append(element);
    }
}

function addHotels(hotels) {
    for (const hotel of hotels) {
        let element = `
        <div class="hotel__box" data-id="${hotel._id}">
            <div class="hotel__image" style="background-image: url('${hotel.coverImage})";></div>
            <div class="hotel__data">
                <h3>${hotel.name}</h3>
                <p>${hotel.location}</p>
            </div>
            <div class="hotel__rating">
                <i class="fas fa-star"></i>${hotel.rating}
            </div>
        </div>
    `;
        $(".hotels .hotel__cards").append(element);
    }
}

function addPlaceToSideBar(data) {
    // distruct the data
    const { location, images, hotels, distance, days, _id: placeId } = data;
    // get images from arr
    let imageArray = [];
    images.forEach((i) => {
        let imgTags = `<img src="${i}" />`;
        imageArray.push(imgTags);
    });

    // get hotels
    let hotelsArray = [];
    hotels.forEach((hotel) => {
        const {
            airConditions,
            bedrooms,
            beds,
            coverImage,
            description,
            guests,
            kitchen,
            images,
            location,
            name,
            price,
            rating,
            wifi,
            _id: hotelId,
        } = hotel;
        let hotelsTag = `
            <div class="queries__hotels-box" data-hotelId="${hotelId}" data-placeId="${placeId}">
                <div class="queries__hotels-box__img" style="background-image: url('${coverImage}');"></div>
                <div class="queries__hotels-box-content">
                    <h5>${name}</h5>
                    <hr>
                    <ul class="queries__hotels-box-content__features">
                        <li>${guests} guests</li>
                        <li>${bedrooms} bedrooms</li>
                        <li>${beds} beds</li>
                        <li>${wifi} wifi</li>
                    </ul>
                    <div class="queries__hotels-box-content__meta-data">
                        <strong><i class="fas fa-star"></i>${rating}</strong>
                        <strong>$ ${price}/night</strong>
                    </div>
                </div>
            </div>
        `;
        hotelsArray.push(hotelsTag);
    });

    // create element
    let element = `
    <div id="queries" data-placeId="${placeId}">
        <h2 id="location">${location} <span id="meta-data"><i class="fas fa-briefcase"></i> ${days} days  <i class="fas fa-map-pin"></i> ${distance}Km</span></h2>
        <div id="meta-content">
            <div id="images"></div>
            <div id="place_map"></div>
        </div>
        <div class="queries__hotels"></div>   
    </div>
    `;
    // append all the stuff
    $("#query-box").append(element);
    for (const imgData of imageArray) {
        $("#images").append(imgData);
    }
    for (const hoteldata of hotelsArray) {
        $(".queries__hotels").append(hoteldata);
    }

    $(".queries__hotels").on("click", ".queries__hotels-box", function () {
        const { placeid, hotelid } = this.dataset;
        $.getJSON(`/api/places/${placeid}/hotels/${hotelid}`)
            .then(getHotelSidebars)
            .catch((error) => console.log(error));

        tl.to(".hotels-modals", { x: 0, ease: "power1.out" });

        $(".hotels-modals__header i").on("click", () => {
            tl.to(".hotels-modals", { x: "100%", ease: "power1.out" });
            $("#hotel__query").remove();
        });
    });
}

const getHotelSidebars = function (data) {
    const {
        airConditions,
        bedrooms,
        beds,
        coverImage,
        description,
        guests,
        images,
        kitchen,
        location,
        name,
        price,
        rating,
        wifi,
    } = data;

    let element = `
    <div id="hotel__query">
        <div id="hotel__query__head">
            <h2>${name}</h2>
            <ul id="hotel__query__head__meta">
                <li>${rating}</li>
                <li>${location}</li>
            </ul>
        </div>
        <div id="hotel__query__body">
            <div id="hotel__query__body__images"></div>
            <div id="hotel__query__body__meta">
                <div id="hotel__query__body__meta__data">  
                        <p>${description}</p>
                        <ul>
                            <li>${airConditions}</li>
                            <li>${bedrooms}</li>
                            <li>${beds}</li>
                            <li>${guests}</li>
                            <li>${kitchen}</li>
                            <li>${wifi}</li>
                        </ul>    
                </div> 
                <div id="hotel__query__body__meta__map"></div> 
            </div>
        </div>
    </div>
    `;

    $("#hotels-query-box").append(element);

    let imgdata = [];
    images.forEach((element) => {
        let IMGTAG = `<img src="${element}" />`;
        imgdata.push(IMGTAG);
    });

    for (const i of imgdata) {
        $("#hotel__query__body__images").append(i);
    }
};
