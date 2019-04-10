// Get City + state
var queryCity = "";
var queryState = "";
// var eventLon = "";
// var eventLat = "";
var queryLonLat = "";

$(document).on('click', ".event-button", function () {
    event.preventDefault();
    queryCity = $("#query-city").val();
    queryState = $("#query-state").val();
    var eventLon = $(this).attr("data-elat");
    var eventLat = $(this).attr("data-elong");
    console.log(eventLon);
    console.log(eventLat);

    queryLonLat = (eventLon + ", " + eventLat);
    console.log(queryLonLat);

    // console.log("Querying " + queryCity + ", " + queryState);
    $("#map").empty();
    createMap();
});

function createMap() {
    mapboxgl.accessToken = "pk.eyJ1Ijoic21pdGhiajMiLCJhIjoiY2p1M2ZnZWRlMG1tazQzc2E0aGdybmJobSJ9.IIXkJ1Wr8_RjNlnr0Eo4tA";
    // eslint-disable-next-line no-undef
    var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    mapboxClient.geocoding.forwardGeocode({
        query: queryLonLat,
        autocomplete: false,
        limit: 1
    })
    .send()
    .then(function (response) {
        if (response && response.body && response.body.features && response.body.features.length) {
            var feature = response.body.features[0];

            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: feature.center,
                zoom: 10
            });

            new mapboxgl.Marker()
                .setLngLat(feature.center)
                .addTo(map);
        }
    });
};

createMap();
