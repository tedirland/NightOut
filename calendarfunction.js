// DOM Elements


var searchButton = $('#run-search')

function buildQueryURL() {
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=5&sort=random"
  var searchTerms = ["&"]
  var apikey = "apikey=eXrkpUbuyRrUX1qzVXjrBbOpahQJEYLI"
  var city = "city=" +
    $('.citySearch')
      .val()
      .trim()
      .toLowerCase()


  var thisWeekend = document.getElementById("thisWknd")
  var nextWeekend = document.getElementById("nextWknd")
  var nextWkndsearchDateStart = moment().add(1, 'week').day(5).format("YYYY-MM-DD")
  var nextWkndsearchDateEnd = moment().add(1, 'week').day(7).format("YYYY-MM-DD")
  var searchDateStart = moment().day(5).format("YYYY-MM-DD")
  var searchDateEnd = moment().day(7).format("YYYY-MM-DD")

  console.log(thisWeekend.checked)
  console.log(nextWeekend.checked)
  var searchDateString = searchTerms + "startDateTime="


  if (thisWeekend.checked) {


    searchDateString += searchDateStart + "T18:00:00Z" + searchTerms + "endDateTime=" + searchDateEnd + "T01:00:00Z"



  }if (nextWeekend.checked) {

    searchDateString += nextWkndsearchDateStart + "T18:00:00Z" + searchTerms + "endDateTime=" + nextWkndsearchDateEnd + "T01:00:00Z"


  }

  console.log(searchDateString)

  var newQueryUrl = queryURL + searchTerms + apikey + searchTerms + city + searchDateString


  var sports = document.getElementById("sportsCheck")
  var music = document.getElementById("musicCheck")
  var theater = document.getElementById("theaterCheck")



  if (sports.checked) {

    newQueryUrl += "&keyword=sports"
  } if (music.checked) {

    newQueryUrl += "&keyword=music"
  } if (theater.checked) {

    newQueryUrl += "&keyword=theater"
  }
  console.log(newQueryUrl)
  return newQueryUrl;

  console.log(newUrl)
  // return queryURL + searchTerms + $.param(queryParams)



}

$(".searchButton").on("click", function () {



  var queryURL = buildQueryURL();
  $.ajax({
    type: "GET",
    url: queryURL,
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json);
      // console.log(json._embedded.events.length)
      var responseLength = json._embedded.events.length

      $('.accordion').html(

        "<h2>" + "Check It Out: We found " + responseLength + " events for you this weekend!" + "</h2>" + "<hr>"

      )



      for (var i = 0; i < responseLength; i++) {

        var eventName = json._embedded.events[i].name
        // console.log(eventName)
        var eventImage = json._embedded.events[i].images[i].url
        console.log(eventImage)
        var venueName = json._embedded.events[i]._embedded.venues[0].name
        // console.log(venueName)
        var venueCity = json._embedded.events[i]._embedded.venues[0].city.name
        var venueState = json._embedded.events[i]._embedded.venues[0].state.stateCode
        var venueZip = json._embedded.events[i]._embedded.venues[0].postalCode
        var venueAddress = json._embedded.events[i]._embedded.venues[0].address.line1 + " " + venueCity + "," + " " + venueState + " " + venueZip
        // console.log(venueAddress)

        var startTime = parseInt(json._embedded.events[i].dates.start.localTime) - 12 + ":00 PM"
        // console.log(startTime)
        var eventDate = json._embedded.events[i].dates.start.localDate
        // var lng = json._embedded.events[i]._embedded.venues[0].location.longitude
        // var lat = json._embedded.events[i]._embedded.venues[0].location.latitude
        // var googleCoords = lng + "," + lat

        // console.log(lng)
        // console.log(lat)
        // console.log(googleCoords)

        var foundationArray = ["collapseOne", "collapseTwo", "collapseThree", "collapseFour", "collapseFive"]
        var dataTarget = ["#collapseOne", "#collapseTwo", "#collapseThree", "#collapseFour", "#collapseFive"]
        var headingArray = ["headingOne", "headingTwo", "headingThree", "headingFour", "headingFive"]

        $('.accordion').append(
          "<div class = 'card'>" +
          "<div class= 'card-header' id =" + headingArray[i] + ">" +
          "<h2 class='mb-0'>" +
          "<button class='btn btn-link' type='button' data-toggle='collapse' data-target=" + dataTarget[i] + " aria-expanded='true' aria-controls=" + foundationArray[i] + ">" +
          parseInt(i + 1) + "." + eventName +
          "</button>" +
          "</h2>" +
          "</div>" +
          "</div>" +
          "<div id=" + foundationArray[i] + ' ' + "class='collapse' aria-labelledby=" + headingArray[i] + " data-parent='#accordionExample'>" +
          "<div class='card-body'>" +
          "<img class='thumbnail' src=" + eventImage + ">" +
          "<h4>" + "When: " + eventDate + " " + "at" + " " + startTime +
          "<h5>" + "Where: " + venueName + " " + "||" + " " + "<i>" + venueAddress + " <br> " +
          "<button class='button eventSelect'  >" + "I'm In" +
          "</div>" +
          "</div>" +
          "</div>"



        )
      } // End of For Loop

      //    function showEventinfo() {
      //   $(foundationArray[i]).on("click", addClass('show');
      // };

      // $(".btn btn-link").click(function(){
      //   $('#collapseOne').addClass("show");
      // });

      $('#eventSelect').on("click", function () {



        console.log("This is working")


      })



      // Parse the response.<
      // Do other things.
    },
    error: function (xhr, status, err) {
      // This time, we do not end up here!
    }
  });
  event.preventDefault();





})





