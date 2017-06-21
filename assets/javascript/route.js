//$(document).ready(function() {

  // Global variable
  var x =[]; // Latitues for the route
  var y =[]; // Longitutes for the route
  var LatLongArray = []; // Arrange flight path

  var lengthOfArray = 0; 

  // Find the city attractions
  var firstLati ; 
  var firstLong ;
  var lastLati ;
  var lastLong ;

  // Route colors
  var colorstroke=0;
  var StrokeColorArray = ['#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116'];

 // Link to flightawre site
  var fxml_url = 'https://florianhutter:fee658c6ef8fe06991d9bb320eaa8b02597716de@flightxml.flightaware.com/json/FlightXML2/';

/******* Firebase ***************************************************/

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAHgsPmMGCsVEgrimgvdy3Fdghhf9Eloeo",
    authDomain: "group-project-gt.firebaseapp.com",
    databaseURL: "https://group-project-gt.firebaseio.com",
    projectId: "group-project-gt",
    storageBucket: "group-project-gt.appspot.com",
    messagingSenderId: "624105688641"
  };
  firebase.initializeApp(config);
 
  function findLocations() {

  locations.ref().on("value", function(snapshot,prevChildKey) {
    console.log(snapshot.val())
      // Store everything into a variable.
    
    for(var i = 0 ; i < snapshot.numChildren() ; i++){
      var attraction = snapshot.val().attraction;
      var ptlt = snapshot.val().latitude;
      var ptln = snapshot.val().longtude;
      var city = snapshot.val().city;
      var Key = snapshot.key; // Grabs the Key   
      console.log(snapshot.numChildren()); 
    }
    // Print the local data to the console.

    // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
}
//findLocations();



/******* Find the flight route locations ****************************/  

  //Find flight route for a specific flight and copy them into the array
  function fetchAndPost(flight_id) {
    $.ajax({
      type: 'GET',
      url: fxml_url + 'DecodeFlightRoute', 
      data: { 'faFlightID': flight_id },
      success : function(result) {
        if (result.error) {
          alert('Failed to decode route: ' + result.error);
          return;
        }  
        console.log("flight Route : " + result.DecodeFlightRouteResult);          
        var points = result.DecodeFlightRouteResult.data;
        lengthOfArray = points.length;
        for (rowid = 0; rowid < points.length; rowid++) {
          var a = points[rowid].latitude;
          var b = points[rowid].longitude;
          x.push(a);
          y.push(b);
        }
        // Find Attractions
        var lastlocation = parseInt(points.length) - 2;  
        firstLati = (points[0].latitude).toFixed(3);
        firstLong = (points[0].longitude).toFixed(3);
        lastLati = (points[lastlocation].latitude).toFixed(3);
        lastLong = (points[lastlocation].longitude).toFixed(3);

        initMap();
      },
      error: function(data, text) { alert('Failed to decode route: ' + data); },
      dataType: 'jsonp',
      jsonp: 'jsonp_callback',
      //xhrFields: { withCredentials: true }
    });
  };

  // Find the flight details of a selected flight number
  function ExtractDataFromFlightAware(){
    $.ajax({
      type: 'GET',
      url: fxml_url + 'FlightInfoEx',
      data: { 'ident': $('#ident_text').val(), 'howMany': 10, 'offset': 0 },
      success : function(result) {
        if (result.error) {
            alert('Failed to fetch flight: ' + result.error);
            return;
        }
        //add flight depature and destination places
        for (flight of result.FlightInfoExResult.flights) {  
          if (flight.actualdeparturetime > 0) {              
            var OptDes = $("<option>");
            OptDes.addClass("des");
            OptDes.text(flight.destinationCity);
            $("#OptionDestination").append(OptDes);              
            var OptDep = $("<option>");
            OptDep.addClass("dep");
            OptDep.text(flight.originCity);
            $("#OptionDepature").append(OptDep);
          }              
        }            
        return;
        alert('Did not find any useful flights');
      },
      error: function(data, text) { alert('Failed to fetch flight: ' + data); },
      dataType: 'jsonp',
      jsonp: 'jsonp_callback',
      xhrFields: { withCredentials: true }
    });
  }
    
  // find flight details after selecting a perticular route
  function FindSpecificFlight(){
   $.ajax({
    type: 'GET',
    url: fxml_url + 'FlightInfoEx',
    data: { 'ident': $('#ident_text').val(), 'howMany': 10, 'offset': 0 },
    success : function(result) {
      if (result.error) {
          alert('Failed to fetch flight: ' + result.error);
          return;
      }
      console.log(result);
      for (flight of result.FlightInfoExResult.flights) { 
        if (flight.actualarrivaltime > 0) {
          var Destination = ($("#OptionDestination" ).val().trim());
          var Depature = ($("#OptionDepature" ).val().trim()); 
          if ( (Destination == flight.destinationCity) && (Depature == flight.originCity)){
            fetchAndPost(flight.faFlightID);
            console.log("Flight Id : " + flight.faFlightID +" Origin Airport : " + flight.originName + " Destination Airport : " + flight.destinationName); 
            var DepatureTime = flight.filed_departuretime; //(in epoch seconds
            var date = Date(DepatureTime*1000);                
            $('#results').html('Flight ' + flight.ident + ' from ' + flight.originCity + ' to ' + flight.destinationCity +
              ' on ' + date);
          }              
        }
      } 
      PointersOntheMap();
      return;
      },
      error: function(data, text) { alert('Failed to fetch flight: ' + data); },
      dataType: 'jsonp',
      jsonp: 'jsonp_callback',
      xhrFields: { withCredentials: true }
    });
  }

/******* Draw Lines in Google Map ****************************/     

  function initMap() {

    // basic map settings
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: {lat: 37.6334167, lng: -90.9594444},
      mapTypeId: 'terrain'
    });
    // Arrage the flight route path in an array
    for (var i = 0 ; i < lengthOfArray ; i++){ 
       LatLongArray.push({lat: x[i], lng: y[i]}); //Route
    }
    var flightPlanCoordinates = LatLongArray;
    // Draw the route
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: StrokeColorArray[colorstroke++],
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(map);

/******* Find cities close to the the route ****************************/  

    setTimeout(
      function() 
        { // Just to keep it wait till the route is done
        }, 5000);
/*
    var lastPoint = "{lat:" + lastLati + " , lng: " + lastLong + "}";
    var firstPoint = "{lat:" + firstLati + " , lng: " + firstLong + "}";
    console.log("last point : " + lastPoint + " firstPoint : " + firstPoint);

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    // Location 1 to search
    //console.log('>>>>>>>>> ' + lastLati);
   /* service.nearbySearch({
    location: lastPoint, // replace with firstPoint
    radius: 500,
    type: ['(landmarks)'],
    animation: google.maps.Animation.DROP
    }, callback); */
    // Location 2 to search
   /* service.nearbySearch({
      location: {lat:26.150 , lng: -80.153}, // replace with lastPoint
      radius: 500,
      type: ['(landmarks)'],
      animation: google.maps.Animation.DROP
    }, callback);

    // Create pointers in the map
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }; */
  };

  function PointersOntheMap(){
        // basic map settings
        console.log("inside");
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: {lat: 37.6334167, lng: -90.9594444},
      mapTypeId: 'terrain'
    });

    var lastPoint = "{lat:" + lastLati + " , lng: " + lastLong + "}";
    var firstPoint = "{lat:" + firstLati + " , lng: " + firstLong + "}";
    console.log("last point : " + lastPoint + " firstPoint : " + firstPoint);

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch({
      location: {lat:26.150 , lng: -80.153}, // replace with lastPoint
      radius: 500,
      type: ['(landmarks)'],
      animation: google.maps.Animation.DROP
    }, callback);

    // Create pointers in the map
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    };
  }


  $('#go_button').on ("click", function() {
    // clearData();
    ExtractDataFromFlightAware(); //find flight number
    console.log("something");
  });

  $("#submitdd").on("click",function(){
    FindSpecificFlight();  // find flight data
  });

  $("#reset").on("click",function(){
    window.location.reload();
  })
  