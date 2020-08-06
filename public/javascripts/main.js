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
});

function addPlaces(places) {
    for (const place of places) {
        let element = `
    <div class="place__box" style="background-image: url('${place.image[0]}");' data-id="${place._id}">
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
