// global variables
const tl = gsap.timeline({ defaults: { duration: 0.5 } });
mapboxgl.accessToken =
    "pk.eyJ1IjoiYmluZWV0bmFpZHUiLCJhIjoiY2tjcmRncHN4MG96eDMwbWdyajB1OGJkdiJ9.osACZLXZrpFZ1zSOX7IzHA";

$(document).ready(function () {
    // actions
    $(".search-box").on("click", "div.five button.btn-search", (event) => {
        event.preventDefault();
        let $input = $("div.five input");
        $input.focus();
    });

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

        tlAnime(".side-modals", 0);

        $(".side-modals__header i").on("click", () => {
            tlAnime(".side-modals", "100%");
            $("#queries").remove();
        });
    });
});

function addPlaces(places) {
    for (const place of places) {
        let element = `
    <div class="place__box" style="background-image: url('${place.coverImg}");' data-id="${place._id}">
            <div class="place__details">
                <h5>${place.placeName}</h5>
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
                <p>${hotel.placeName}</p>
            </div>
            <div class="hotel__rating">
                <i class="fas fa-star"></i>${hotel.rating}
            </div>
        </div>
    `;
        $(".hotels .hotel__cards").append(element);
    }
}

function addPlaceToSideBar({
    location,
    images,
    hotels,
    distance,
    days,
    _id: placeId,
    placeName,
}) {
    // get images from arr
    let imageArray = [];
    images.forEach((i) => {
        let imgTags = `<img src="${i}" />`;
        imageArray.push(imgTags);
    });
    // get hotels
    let hotelsArray = [];
    sidebarPlaceHotelsTag(hotels, placeId, hotelsArray);

    // create element
    let element = `
    <div id="queries" data-placeId="${placeId}">
        <h2 id="location">${placeName} <span id="meta-data"><i class="fas fa-briefcase"></i> ${days} days  <i class="fas fa-map-pin"></i> ${distance}Km</span></h2>
        <div id="meta-content">
            <div id="images"></div>
            <div id="place_map" style="width: 500px; height: 250px"></div>
        </div>
        <div class="queries__hotels"></div>   
    </div>
    `;
    // append all the stuff
    $("#query-box").append(element);
    addMap("mapPlace", "place_map", location);
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

        tlAnime(".hotels-modals", 0);

        $(".hotels-modals__header i").on("click", () => {
            tlAnime(".hotels-modals", "100%");
            $("#hotel__query").remove();
        });
    });
}

const getHotelSidebars = function (data) {
    sidebarHotel(data).then((res) => {
        const [element, images, location] = res;
        $("#hotels-query-box").append(element);
        addMap("mapHotel", "hotel__query__body__meta__map", location);

        let imgdata = [];
        images.forEach((i) => {
            let IMGTAG = `<img src="${i}" />`;
            imgdata.push(IMGTAG);
        });

        for (const i of imgdata) {
            $("#hotel__query__body__images").append(i);
        }
    });
};

const addMap = (varname, placeholder, { coordinates }) => {
    varname = new mapboxgl.Map({
        container: placeholder,
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: 9,
        center: coordinates,
    });
};

const sidebarHotel = ({
    airConditions,
    bedrooms,
    beds,
    description,
    guests,
    images,
    kitchen,
    location,
    name,
    price,
    rating,
    wifi,
}) => {
    const { formattedAddress } = location;
    let element = `
    <div id="hotel__query">
        <div id="hotel__query__head">
            <h2>${name}</h2>
            <ul id="hotel__query__head__meta">
                <li>${rating}</li>
                <li>${formattedAddress}</li>
            </ul>
        </div>
        <div id="hotel__query__body">
            <div id="hotel__query__body__images"></div>
            <div id="hotel__query__body__meta">
                <div id="hotel__query__body__meta__data">  
                        <p>${description}</p>
                        <h4>Features</h4>
                        <ul>
                            <li>AC :  ${airConditions ? "yes" : "no"}</li>
                            <li>Bedsrooms : ${bedrooms}</li>
                            <li>Beds :  ${beds}</li>
                            <li>Guests :  ${guests}</li>
                            <li>Kitchen :  ${kitchen ? "yes" : "no"}</li>
                            <li>Wifi :  ${wifi ? "yes" : "no"}</li>
                        </ul>    
                </div> 
                <div id="hotel__query__body__meta__map" style='width: 500px; height: 250px;'></div> 
            </div>
        </div>
    </div>
    `;
    let res = [element, images, location];
    return Promise.resolve(res);
};

const sidebarPlaceHotelsTag = (hotels, placeId, arr) => {
    hotels.forEach(
        ({
            bedrooms,
            beds,
            coverImage,
            guests,
            name,
            price,
            rating,
            wifi,
            _id: hotelId,
        }) => {
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
            arr.push(hotelsTag);
        }
    );
    return arr;
};

function tlAnime(target, x) {
    tl.to(target, { x, ease: "power1.out" });
}
