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

// // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyAHgsPmMGCsVEgrimgvdy3Fdghhf9Eloeo",
//     authDomain: "group-project-gt.firebaseapp.com",
//     databaseURL: "https://group-project-gt.firebaseio.com",
//     projectId: "group-project-gt",
//     storageBucket: "group-project-gt.appspot.com",
//     messagingSenderId: "624105688641"
//   };
//   firebase.initializeApp(config);
 
//   function findLocations() {

//   locations.ref().on("value", function(snapshot,prevChildKey) {
//     console.log(snapshot.val())
//       // Store everything into a variable.
    
//     for(var i = 0 ; i < snapshot.numChildren() ; i++){
//       var attraction = snapshot.val().attraction;
//       var ptlt = snapshot.val().latitude;
//       var ptln = snapshot.val().longtude;
//       var city = snapshot.val().city;
//       var Key = snapshot.key; // Grabs the Key   
//       console.log(snapshot.numChildren()); 
//     }
//     // Print the local data to the console.

//     // If any errors are experienced, log them to console.
// }, function(errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });
// }
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
            $("#OptionDeparture").append(OptDep);
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
          var Destination = ($("#OptionDestination" ).val());//.trim());
          var Depature = ($("#OptionDeparture" ).val());//.trim()); 
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
      strokeWeight: 2,
    });

    flightPath.setMap(map);



    function deleteMarkers() {
        if (markerHolderArray) {
            for (var i = 0; i < markerHolderArray.length; i++) {
                markerHolderArray[i].setVisible(false);
            }
            markerHolderArray = [];
        }
    }

    //**********************empty marker array holder*********************************
    var markerHolderArray = [];
    //***********************Array for landmarks**************************************

var markerLocations = [
      ["Capitol building", 33.749,-84.388111, "Atlanta, GA", 0],
      ["Georiga Dome", 33.757707,-84.400835, "Atlanta, GA", 1],
      ["Spaghetti Junction", 33.891792,-84.25908, "Atlanta, GA", 2],
      ["Alcatraz Island", 37.826733, -122.42284, "San Francisco, CA", 3],
      ["Statue of Liberty", 40.689247, -74.0445, "New York, NY", 4],
      ["Brooklyn Bridge", 40.706234, -73.99699, "New York, NY", 5],
      ["The Alamo", 29.425772, -98.48581, "San Antonio, TX", 6],
      ["Glacier National Park", 48.759613, -113.787022, "West Glacier, MT", 7],
      ["Rocky Mountain National Park", 40.366342, -105.561041, "Denver, CO", 8],
      ["Port of Miami", 25.778518, -80.178033, "Miami, FL", 9],
      ["Disney's Magic Kingdom", 28.418742, -81.581175, "Orlando, FL", 10] ,
      ["Golden Gate Bridge", 37.819528, -122.478484, "San Francisco, CA", 11],
      ["Lake Tahoe", 39.106927, -120.041346, "San Francisco, CA", 12],
      ["Yellowstone National Park", 44.440724, -110.581395, "Cheyenne, WY", 13],
      ["Washington Monument", 38.889430, -77.035264, "Washington D.C.", 14],
      ["Niagra Falls", 43.089561, -79.069241, "Buffalo, NY", 15],
      ["Cloud Gate", 41.882683, -87.623316, "Chicago, IL", 16],
      ["Milwaukee Art Museum", 43.039298, -87.897010, "Milwaukee, WI", 17],
      ["Gateway Arch", 38.624565, -90.184891, "St. Louis, MO", 18],
      ["Monument Valley", 36.986878, -110.080999, "Phoenix, AZ", 19],
      ["Great Salt Lake Desert", 40.611077, -113.452747, "Salt Lake City, UT", 20],
      ["Mount Rushmore National Memorial", 43.878864, -103.459075, "Rapid City, KS", 21],
      ["San Andreas Fault", 35.133485, -119.6714535, "Rapid City, KS", 22],
      ["Las Vegas Strip", 36.109643, -115.172615, "Las Vegas, NV", 23],
      ["Cedar Point", 41.486756, -82.686739, "Cleveland, OH", 24],
      ["Space Needle", 47.620482, -122.349128, "Seattle, WA", 25],
      ["Liberty Memorial", 39.081011, -94.586024, "Kansas City, MO", 26],
      ["Stone Mountain", 33.806051, -84.146783, "Atlanta, GA", 27],
      ["Andrew Jackson's Hermitage", 36.215011, -86.612985, "Nashville, TN", 28],
      ["Pilgrim Monument", 42.052254, -70.188645, "Provincetown, MA", 29],
      ["Hollywood Sign", 34.134062, -118.321634, "Los Angeles, CA", 30],
      ["Four Corners Monument", 36.998996, -109.045209, "Albuquerque, NM", 31],
      ["Southernmost Point", 24.546509, -81.797495, "Key West, FL", 32],
      ["Monument Rocks", 38.792915, -100.762839, "Wichita, KS", 33],
      ["Mt Elbert", 39.117811, -106.445275, "Denver, CO", 34],
      ["Hoover Dam", 36.016226, -114.737241, "Las Vegas, NV", 35]
    ];

  var infoWindowContent = [
    // Capitol Building
    ["<div style='font-family: quicksand'>" + 
      "<h3>Georgia State Capitol</h3>" +
      "<img src='assets/images/state_capitol_building.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>This gold dome building has been the symbol of Atlanta since 1889</p>" +
      "</div>" 
    ], 
    // Georgia Dome
    ["<div style='font-family: quicksand'>" + 
      "<h3>Georgia Dome</h3>" +
      "<img src='assets/images/falcons_nest.jpg' style='height: 75px; width: 75px; border-radius: 50%;'"+
      "<br>"+
      "<p>Home of the Atlanta Falcons</p>" +
      "</div>" 
    ],
    // Spaghetti Junction
    ["<div style='font-family: quicksand'>" + 
      "<h3>Spaghetti Junction</h3>" +
      "<img src='assets/images/spaghetti_junction.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Atlanta's interwined interest interchange</p>" +
      "</div>" 
    ],

    // Alcatraz Island 
    ["<div style='font-family: quicksand'>" + 
      "<h3>Alcatraz Island</h3>" +
      "<img src='assets/images/alcatraz.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>The Rock, a little island with a lot history</p>" +
      "</div>" 
    ],

    // Statue of Liberty
    ["<div style='font-family: quicksand'>" + 
      "<h3>Statue of Liberty</h3>" +
      "<img src='assets/images/statue_of_liberty.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>France's gift to America for building a successful republic</p>" +
      "</div>" 
    ],

      // Brooklyn Bridge
     ["<div style='font-family: quicksand'>" + 
      "<h3>Brooklyn Bridge</h3>" +
      "<img src='assets/images/brooklyn_bridge.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>The world's first steel-wire supension bridge that is still used today.</p>" +
      "</div>" 
     ],

    // The Alamo
    ["<div style='font-family: quicksand'>" + 
      "<h3>The Alamo</h3>" +
      "<img src='assets/images/alamo.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<p>A failed attempt to gain independence for Texas from Mexico turned into a successful multi-million dollar tourist attraction</p>" +
      "<br>"+
      "</div>" 
    ],

    // Glacier National Park
    ["<div style='font-family: quicksand'>" + 
      "<h3>Glacier National Park</h3>" +
      "<img src='assets/images/glacier_national_park.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>For millions of years glaciers have carved the lands of the park and still are today</p>" +
      "</div>" 
    ],

     // Rocky Mountain National Park
    ["<div style='font-family: quicksand'>" + 
      "<h3>Rocky Mountain National Park</h3>" +
      "<img src='assets/images/glacier_national_park.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>See some of the best landscapes that Amercica has to offer</p>" +
      "</div>" 
    ],   

     // Port of Miami
    ["<div style='font-family: quicksand'>" + 
      "<h3>Port of Miami</h3>" +
      "<img src='assets/images/port_of_miami.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Home to one of the busiest ports in the US</p>" +
      "</div>" 
    ],      

     // Disney's Magic Kingdom
    ["<div style='font-family: quicksand'>" + 
      "<h3>Disney's Magic Kingdom</h3>" +
      "<img src='assets/images/magic_kingdom.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>In this kingdom dreams really do come true</p>" +
      "</div>" 
    ],

     // Golden Gate Bridge
    ["<div style='font-family: quicksand'>" + 
      "<h3>Golden Gate Bridge</h3>" +
      "<img src='assets/images/golden_gate_bridge.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>When it opened in 1937 it was the longest supension bridge in the world</p>" +
      "</div>" 
    ],

     // Lake Tahoe
    ["<div style='font-family: quicksand'>" + 
      "<h3>Lake Tahoe</h3>" +
      "<img src='assets/images/lake_tahoe.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Voted to be America's best lake</p>" +
      "</div>" 
    ],

     // Yellowstone National Park
    ["<div style='font-family: quicksand'>" + 
      "<h3>Yellowstone National Park</h3>" +
      "<img src='assets/images/yellow_national_park.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>The country's first national park andnce you visit you'll know why it was the first to be chosen</p>" +
      "</div>" 
    ],
     // Washington Monument
    ["<div style='font-family: quicksand'>" + 
      "<h3>Washington Monument</h3>"+
      "<img src='assets/images/washington_monument.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Built to honor the first president.</p>" +
      "</div>" 
    ],

      // Niagra Falls
    ["<div style='font-family: quicksand'>" + 
      "<h3>Niagara Falls</h3>"+
      "<img src='assets/images/niagara_falls.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>At the border of the US and Canada three waterfalls come together.</p>" +
      "</div>" 
    ], 

      // Cloud Gate
    ["<div style='font-family: quicksand'>" + 
      "<h3>Cloud Gate</h3>"+
      "<img src='assets/images/cloud_gate.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Cloud Gate is a tourist attraction that reflects the skylines and the sky above Chicago.</p>" +
      "</div>" 
    ],                       

      // Milwaukee Art Museum 
    ["<div style='font-family: quicksand'>" + 
      "<h3>Milwaukee Art Museum</h3>"+
      "<img src='assets/images/mam.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>With its Quadracci Pavilion, the once hidden museum is now an international attraction.</p>" +
      "</div>" 
    ], 

      // Gateway Arch 
    ["<div style='font-family: quicksand'>" + 
      "<h3>Gateway Arch</h3>"+
      "<img src='assets/images/gateway_arch.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Here in St Louis, the Louisiana purchase was held kicking off the westward expansion.</p>" +
      "</div>" 
    ],

      // Monument Valley 
    ["<div style='font-family: quicksand'>" + 
      "<h3>Monument Valley</h3>"+
      "<img src='assets/images/monument_valley.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Director John Ford made this valley the iconic image of the west.</p>" +
      "</div>" 
    ], 

      // Great Salt Lake Desert
    ["<div style='font-family: quicksand'>" + 
      "<h3>Monument Valley</h3>"+
      "<img src='assets/images/monument_valley.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Here you will find the famouse Bonneville Salt Falts.</p>" +
      "</div>" 
    ],  

      // Mount Rushmore
    ["<div style='font-family: quicksand'>" + 
      "<h3>Mount Rushmore</h3>"+
      "<img src='assets/images/mount_rushmore.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Washington was the first, Jefferson expanded, Lincoln united, Roosevelt conserved.</p>" +
      "</div>" 
    ],

    // San Andreas Fault 
    ["<div style='font-family: quicksand'>" + 
      "<h3>San Andreas Fault</h3>"+
      "<img src='assets/images/san_andreas_fault.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>800 miles long and 10 miles deep.</p>" +
      "</div>" 
    ],

    // Las Vegas Strip 
    ["<div style='font-family: quicksand'>" + 
      "<h3>Las Vegas Strip</h3>"+
      "<img src='assets/images/las_vegas_strip.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>What happens in Vegas, stays in Vegas</p>" +
      "</div>" 
    ], 

    // Cedar Point
    ["<div style='font-family: quicksand'>" + 
      "<h3>Cedar Point</h3>"+
      "<img src='assets/images/cedar_point.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>The roller coaster capitol of the world.</p>" +
      "</div>" 
    ],


    // Space Needle
    ["<div style='font-family: quicksand'>" + 
      "<h3>Space Needle</h3>"+
      "<img src='assets/images/space_needle.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>The symbol of Seattle.</p>" +
      "</div>" 
    ], 


    // Liberty Memorial
    ["<div style='font-family: quicksand'>" + 
      "<h3>Liberty Memorial</h3>"+
      "<img src='assets/images/liberty_memorial.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Dedeicated to those that fell in WWI.</p>" +
      "</div>" 
    ], 

    // Stone Mountain
    ["<div style='font-family: quicksand'>" + 
      "<h3>Stone Mountain</h3>"+
      "<img src='assets/images/stone_mountain.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>A memorial to the Georgia confederates.</p>" +
      "</div>" 
    ], 

    //Andrew Jackson's Hermitage
    ["<div style='font-family: quicksand'>" + 
      "<h3>Andrew Jackson's Hermitage</h3>"+
      "<img src='assets/images/hermitage.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Once home to President Andrew Jackson.</p>" +
      "</div>" 
    ],    

    //Pilgrim Monument
    ["<div style='font-family: quicksand'>" + 
      "<h3>Pilgrim Monument</h3>"+
      "<img src='assets/images/pilgrim_monument.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Built to commerate the landing of the Pilgrims.</p>" +
      "</div>" 
    ],  

    //Hollywood
    ["<div style='font-family: quicksand'>" + 
      "<h3>Hollywood Sign</h3>"+
      "<img src='assets/images/hollywood.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Real estate advertisement turned cultural icon.</p>" +
      "</div>" 
    ], 


    //Four Corners Monument
    ["<div style='font-family: quicksand'>" + 
      "<h3>Hollywood Sign</h3>"+
      "<img src='assets/images/hollywood.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Arizona, Colorado, New Mexico, and Utah come together at this one spot.</p>" +
      "</div>" 
    ], 

    //Southern Most Point
    ["<div style='font-family: quicksand'>" + 
      "<h3>Souther Most Point</h3>"+
      "<img src='assets/images/southern_most_point.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Lower 48's most southern point.</p>" +
      "</div>" 
    ],  

    //Monument Rock
    ["<div style='font-family: quicksand'>" + 
      "<h3>Monument Rock</h3>"+
      "<img src='assets/images/monument_rock.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Kansas's famous badlands.</p>" +
      "</div>" 
    ],  

    //Mt Elbert
    ["<div style='font-family: quicksand'>" + 
      "<h3>Mount Elbert</h3>"+
      "<img src='assets/images/mt_elbert.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>Highest summit in the Rocky Mountains.</p>" +
      "</div>" 
    ],  
 
    //Hoover Dam
    ["<div style='font-family: quicksand'>" + 
      "<h3>Hoover Dam</h3>"+
      "<img src='assets/images/hoover_dam.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
      "<br>"+
      "<p>When it was built, it was the largest dam in the world.</p>" +
      "</div>" 
    ] 



  ];



  var infoWindow = new google.maps.InfoWindow(), marker, i;


  $("#getMarkers").on("click",function(){
            event.preventDefault();
            deleteMarkers();
            var chosenDestination = $( "#OptionDestination" ).val();
            var chosenDeparture = $( "#OptionDeparture" ).val();
            console.log("Chosen Destination: " + chosenDestination);
             console.log("Chosen Destination: " + chosenDeparture);
            //$("#myForm").bind("submit", function(){
              if ( $( "#OptionDestination" ).val() == chosenDestination ) {
                for( var i = 0; i < markerLocations.length; i++ ){
                    if ( markerLocations[i].indexOf( chosenDestination ) != -1 ) {
                        var city = i;
                        var position = new google.maps.LatLng(markerLocations[city][1], markerLocations[city][2]);
                        //bounds.extend(position);
                        marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                title: markerLocations[i][0],
                                visible: true,
                                icon: {
                                    url: "assets/images/test.png",
                                    scaledSize: new google.maps.Size( 64, 64 )
                                },
                                animation: google.maps.Animation.DROP 
                        });
                        markerHolderArray.push(marker);
                        // Add info window to marker    
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                infoWindow.setContent(infoWindowContent[i][0]);
                                infoWindow.open(map, marker);
                            }
                        })(marker, i));
                  }
              // End For loop
              } 

            // End if statement for Destination
            } 

              if ( $( "#OptionDeparture" ).val() == chosenDeparture ) {
                for( var i = 0; i < markerLocations.length; i++ ){
                    if ( markerLocations[i].indexOf( chosenDeparture ) != -1 ) {
                        var city = i;
                        var position = new google.maps.LatLng(markerLocations[city][1], markerLocations[city][2]);
                        //bounds.extend(position);
                        marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                title: markerLocations[i][0],
                                visible: true,
                                icon: {
                                    url: "assets/images/test.png",
                                    scaledSize: new google.maps.Size( 64, 64 )
                                },
                                animation: google.maps.Animation.DROP 
                        });
                        markerHolderArray.push(marker);
                        // Add info window to marker    
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                infoWindow.setContent(infoWindowContent[i][0]);
                                infoWindow.open(map, marker);
                            }
                        })(marker, i));
                  }
              // End For loop
              } 

            // End if statement for Destination
            }             
        });

    //});
  //End initMap() 
  };


  $('#go_button').on ("click", function() {
    // clearData();
    ExtractDataFromFlightAware(); //find flight number
  });

  $("#submitdd").on("click",function(){
    FindSpecificFlight();  // find flight data
  });

