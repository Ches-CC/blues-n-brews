var getShows = function (location) {

    console.log(location);

    var queryURL = "https://api.predicthq.com/v1/places/?q=" +
        location + "&limit=1&access_token=kXjPohcFTWHN8I3b0dJUeriBtuEj7Z";

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET",
        // Accept: application/json,
        // Authorization: kXjPohcFTWHN8I3b0dJUeriBtuEj7Z
    }).then(function (response) {

        console.log(response);
        var place = response.results[0].id;
        var coord = response.results[0].location;


        // API call based on coordinates
        var queryURL2 = "https://api.predicthq.com/v1/events/?within=10mi@" +
            coord[1] + "," + coord[0] + "&limit=10&category=concerts,festivals,performing-arts&access_token=kXjPohcFTWHN8I3b0dJUeriBtuEj7Z";

        // API call based on location ID
        // var queryURL2 = "https://api.predicthq.com/v1/events/?place.scope=" +
        //     place + "&limit=10&category=concerts,festivals,performing-arts&access_token=kXjPohcFTWHN8I3b0dJUeriBtuEj7Z";

        console.log(queryURL2);

        $.ajax({
            url: queryURL2,
            method: "GET",
            // Accept: application/json,
            // Authorization: kXjPohcFTWHN8I3b0dJUeriBtuEj7Z
        }).then(function (response) {

            console.log(response);
            for (i = 0; i < response.results.length; i++) {
                var showDiv = $("<div class='eventButton'>");
                showDiv.append("Title:  " + response.results[i].title + "<br>");
                showDiv.append("Description:  " + response.results[i].description + "<br>");
                showDiv.append("Date:  " + response.results[i].start + "<br>");
                showDiv.append("Location:  " + response.results[i].location + "<br>");
                $("#shows").append(showDiv, "<br>");
            }
        });
    });
}

$(document).ready(function () {
    $("#locButt").on("click", function (event) {
        event.preventDefault();
        console.log("Submit was clicked");
        console.log($("#location").val());

        getShows($("#location").val());
    });
}) 