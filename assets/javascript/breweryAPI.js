// alert("Page is connected!"); Page is Connected :)

$(document).ready(function () {

      
  //Brewery API
  $(document).on("click", "#event-query", function () { 

    event.preventDefault();

    // Pull city info from search bar for the API
    var cityBrewery = $("#query-city").val();
    var breweryQueryURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityBrewery;
    //pagination reference: https://api.openbrewerydb.org/breweries?page=2&per_page=30

    $.ajax({
      url: breweryQueryURL,
      method: "GET"
    }).then(function (breweryResponse) {
      console.log(breweryResponse);

      //for loop to list through API responses
      for (var i = 0; i < breweryResponse.length; i++) {

        //jQuery divs to list out the brewery info
        var brewDiv = $("<div>");
        var brewName = breweryResponse[i].name;
        var brewType = breweryResponse[i].brewery_type;
        var brewStreet = breweryResponse[i].street;
        var brewCity = breweryResponse[i].city;
        var brewState = breweryResponse[i].state;
        var brewZip = breweryResponse[i].postal_code;
        var brewWeb = breweryResponse[i].website_url;
        var brewType = breweryResponse[i].brewery_type;
        console.log(brewType);

        //Lat' & Lon' to kick to G'Maps?
        var brewLon = breweryResponse[i].longitude;
        var brewLat = breweryResponse[i].latitude;

        // var to store all the brewery info
        var breweryInfo = (brewName + ";" + brewType + ";" + brewStreet + ";" + brewCity
        + ";" + brewState + ";" + brewZip + ";" + brewWeb);

        var breweryAddress = (brewStreet + ", " + brewCity + ", " + brewState + " " + brewZip);

        //lets test this biz
        console.log(breweryAddress);

        // console.log(breweryInfo);

        //lets get this info displayed (however crudely, at first)
        var displayBreweryInfo = $("<div>").text(breweryInfo);
        brewDiv.append(displayBreweryInfo);
        $("#brew-result").append(brewDiv);

      }
    })
  });
});