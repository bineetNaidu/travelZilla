// actions
$(".search-box").on("click", "div.five button.btn-search", (event) => {
    event.preventDefault();
    let $input = $("div.five input");
    $input.focus();
});

$(document).ready(function () {
    $.getJSON("/api/places")
        .then(addPlaces)
        .catch((error) => console.log(error));

    $.getJSON("/api/hotels")
        .then(addHotels)
        .catch((error) => console.log(error));

    const tl = gsap.timeline({ defaults: { duration: 0.5 } });

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
                        ${place.duration} days
                    </p>
                    <p>
                        <i class="fas fa-map-pin"></i>
                        ${place.price}Km
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
        console.log(hotel);
        $(".hotels .hotel__cards").append(element);
    }
}

function addPlaceToSideBar(data) {
    const { location, images, hotels, duration, price } = data;
    let imgs = [];
    images.forEach((i) => {
        let imgTags = `<img src="${i}" />`;
        imgs.push(imgTags);
    });

    let element = `
    <div id="queries">
        <h2 id="location">${location}</h2>
        <div id="images"></div>
        <div id="meta-data">
            <h5>${price} ${duration}</h5>
        </div>
    </div>
    `;
    $("#query-box").append(element);
    for (const imgData of imgs) {
        $("#images").append(imgData);
    }
}
