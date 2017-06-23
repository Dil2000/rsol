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

  var locations = firebase.database();
 
    locations.ref().on("value", function(snapshot) {
      console.log(snapshot.val());
    }, function (error) {
       console.log("Error: " + error.code);
    });

    locations .ref().on("child_added", function(childSnapshot, prevChildKey) {
      // Store everything into a variable.
      var name = childSnapshot.val().attraction;
      var destination = childSnapshot.val().city;
      var start = childSnapshot.val().latitude;
      var frequency = childSnapshot.val().longitude;
      var Key = childSnapshot.key; // Grabs the Key
      console.log(name);
    });

  //};





// Travis

var markerLocations = [
    ["Capitol building", 33.749,-84.388111, "Atlanta", 0],
    ["Georiga Dome", 33.757707,-84.400835, "Atlanta", 1],
    ["Spaghetti Junction", 33.891792,-84.25908, "Atlanta", 2],
    ["Test", 32.657876,-96.817802, "Dallas", 3],
    ["Test 2", 40.701464,-74.010184, "New York City", 4],
    ["Alcatraz Island", 37.826733, -122.42284, "San Francisco", 5],
    ["Statue of Liberty", 40.689247, -74.0445, "New York", 6],
    ["Brooklyn Bridge", 40.706234, -73.99699, "New York", 7],
    ["The Alamo", 29.425772, -98.48581, "San Antonio", 8],
    ["Glacier National Park", 48.759613, -113.787022, "West Glacier", 9],
    ["Rocky Mountain National Park", 40.366342, -105.561041, "Dennver", 10],
    ["Port of Miami", 25.778518, -80.178033, "Miami", 11],
    ["Disney's Magic Kingdom", 28.418742, -81.581175, "Orlando", 12] ,
    ["Golden Gate Bridge", 37.819528, -122.478484, "San Francisco", 13],
    ["Lake Tahoe", 39.106927, -120.041346, "San Francisco", 14],
    ["Yellowstone National Park", 44.440724, -110.581395, "Cheyenne", 15],
    ["Washington Monument", 38.889430, -77.035264, "Washington D.C.",16],
    ["Niagra Falls", 43.089561, -79.069241, "Buffalo",17],
    ["Cloud Gate", 41.882683, -87.623316, "Chicago",18],
    ["Milwaukee Art Museum", 43.039298, -87.897010, "Milwaukee",19],
    ["Gateway Arch", 38.624565, -90.184891, "St. Louis",20],
    ["Monument Valley", 36.986878, -110.080999, "St. Phoenix",21],
    ["Great Salt Lake Desert", 40.611077, -113.452747, "Salt Lake City",22],
    ["Mount Rushmore National Memorial", 43.878864, -103.459075, "Rapid City",23],
    ["San Andreas Fault", 35.133485, -119.6714535, "Rapid City",24],
    ["Las Vegas Strip", 36.109643, -115.172615, "Las Vegas",25],
    ["Cedar Point", 41.486756, -82.686739, "Cleveland",26],
    ["Space Needle", 47.620482, -122.349128, "Seattle",27],
    ["Liberty Memorial", 39.081011, -94.586024, "Kansas City",28],
    ["Liberty Memorial", 39.081011, -94.586024, "Kansas City",29],
    ["Stone Mountain", 33.806051, -84.146783, "Atlanta",30],
    ["Andrew Jackson's Hermitage", 36.215011, -86.612985, "Nashville",31],
    ["Pilgrim Monument", 42.052254, -70.188645, "Provincetown",32],
    ["Hollywood Sign", 34.134062, -118.321634, "Los Angeles",33],
    ["Four Corners Monument", 36.998996, -109.045209, "Albuquerque",34],
    ["Southernmost Point", 24.546509, -81.797495, "Key West",35],
    ["Monument Rocks", 38.792915, -100.762839, "Wichita",36],
    ["Mt Elbert", 39.117811, -106.445275, "Denver",37],
    ["Hoover Dam", 36.016226, -114.737241, "Las Vegas",38]
   ];



/******* Find the flight route locations ****************************/  

  //Find flight route for a specific flight and copy them into the array
  function fetchAndPost(flight_id) {
    $.ajax({
      type: 'GET',
      url: fxml_url + 'DecodeFlightRoute', 
      data: { 'faFlightID': flight_id },
      success : function(result) {
        if (result.error) {
          console.log('Failed to decode route: ' + result.error);
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
      error: function(data, text) { console.log('Failed to decode route: ' + data); },
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
            console.log('Failed to fetch flight: ' + result.error);
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
        console.log('Did not find any useful flights');
      },
      error: function(data, text) { console.log('Failed to fetch flight: ' + data); },
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
          console.log('Failed to fetch flight: ' + result.error);
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
      return;
      },
      error: function(data, text) { console.log('Failed to fetch flight: ' + data); },
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

   /* setTimeout(
      function() 
        { // Just to keep it wait till the route is done
        }, 5000); */
/*
    var lastPoint = "{lat:" + lastLati + " , lng: " + lastLong + "}";
    var firstPoint = "{lat:" + firstLati + " , lng: " + firstLong + "}";
    console.log("last point : " + lastPoint + " firstPoint : " + firstPoint); */

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    // Location 1 to search
    //console.log('>>>>>>>>> ' + lastLati);

/*
     for( i = 0; i < markerLocations.length; i++ ) {
        var latitu = {lat:  markerLocations[i][1] , lng: markerLocations[i][2] }; // Working dont change
        service.nearbySearch({
        location: latitu, //{lat:26.150 , lng: -80.153}, 
        //location: {lat:26.150 , lng: -80.153},
        radius: 500,
        //type: ['stadium','cities'],
        animation: google.maps.Animation.DROP
        }, callback); 
      }

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
        position: place.geometry.location,
        //icon: {
        //  url: "assets/images/test.png",
        //  scaledSize : new google.maps.Size(64,64)
        //}
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }; */

  }; 


  $('#go_button').on ("click", function() {
    // clearData();
    ExtractDataFromFlightAware(); //find flight number
  });

  $("#submitdd").on("click",function(){
    FindSpecificFlight();  // find flight data
  });

  $("#reset").on("click",function(){
    window.location.reload();
  })
  