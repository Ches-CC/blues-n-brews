console.log("javascript.js was here");
// alert("This page is connected!");
//page is connected!

$(document).ready(function() {



    $(document).on("click", "#event-query", function() {



        event.preventDefault();

        
        //setting up test value (city) to push & grab from firebase
        var citySearched = $("#query-city").val().trim();
        console.log("City pushed to f-base: " + citySearched);


        //pushing searched city to firebase; after tested, we can add other info
        database.ref().push({
            citySearched: citySearched,
            //artist clicked
            //brewery clicked
        })

        //similar to Train ETA homework, this simply prints recently searched city
        database.ref().on("child_added", function (DataSnapshot) {

            var childArray = [];
            var response = DataSnapshot.val();
            childArray.push(response);

            //We can enter other vars here
            var cSearched = response.citySearched;

            //We also need to figure out where we're going to toss these divs
            var newListedInfo = $("<div>");


            //This part doesn't necessarly have to be eactly this way--just testing for functionality
            var newListedCity = $("<p>");
            newListedCity.text(cSearched);
            newListedInfo.append(newListedCity);

            //Push to the html
            $("#recently-searched").append(newListedInfo);

        })


    })






})
