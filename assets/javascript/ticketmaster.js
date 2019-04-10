var getShows = function (city, first, last) {

    console.log(city);
    console.log(first);
    console.log(last);

    // var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=u4oUGc8Y9EZRsXboU5RKbCZ4AwYYX7AG&city=" + city + "&startDateTime=" + first + "T00:00:00Z&endDateTime=" + last + "T23:59:59Z";
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json"; // ?apikey=u4oUGc8Y9EZRsXboU5RKbCZ4AwYYX7AG&city=" + city + "&startDateTime=" + moment(first).format("YYYY-MM-DDTHH:mm:ss[Z]") + "&endDateTime=" + moment(last).format("YYYY-MM-DDTHH:mm:ss[Z]");

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            apikey: "u4oUGc8Y9EZRsXboU5RKbCZ4AwYYX7AG",
            city: city,
            startDateTime: moment(first).format("YYYY-MM-DDTHH:mm:ss[Z]"),
            endDateTime: moment(last).format("YYYY-MM-DDTHH:mm:ss[Z]"),
            classificationName: "music"
        }
    }).then(function (response) {

        console.log(response);
        var events = response._embedded.events;
        console.log(events);
        $("#results").empty();

        for (i = 0; i < events.length; i++) {
            var showDiv = $("<div class='event-button clearfix'>");
            var poster = events[i].images[0].url;
            var lineupArr = [];
            
            for (j = 0; j < events[i]._embedded.attractions.length; j++) {

                lineupArr[j] = events[i]._embedded.attractions[j].name;

            };

            var lineup = lineupArr.join(", ");

            showDiv.append("<img src=" + poster + " class='show-poster'>");
            showDiv.append("<p style='font-style:bold; font-size:1.5em'>" + events[i].name + "</p>");
            showDiv.append("Lineup:  " + lineup + "<br>");
            showDiv.append("Date:  " + moment(events[i].dates.start.dateTime).format('MMMM Do YYYY, h:mm a') + "<br>");
            showDiv.append("Location:  " + events[i]._embedded.venues[0].name + "<br>");
            showDiv.attr("data-elat", events[i]._embedded.venues[0].location.longitude);
            showDiv.attr("data-elong", events[i]._embedded.venues[0].location.latitude);
            $("#results").append(showDiv, "<br>");
        }
    });
};

console.log("tickemaster.js was here");

$(document).ready(function () {
    $("#event-query").on("click", function (event) {
        event.preventDefault();
        console.log("Submit was clicked");
        console.log($("#query-city").val());
        console.log($("#sdate").val());
        console.log($("#edate").val());

        getShows($("#query-city").val(), $("#sdate").val(), $("#edate").val());
    });
}) 