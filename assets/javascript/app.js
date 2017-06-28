$(document).ready(function(){});

// This example requires the Geometry library. Include the libraries=geometry
// parameter when you first load the API.
var openWeatherKey = "14a1400145a1d42b43dd8b077ba520fd";

function initMap() {


  // Variable to hold the bounds to call later
  var bounds = new google.maps.LatLngBounds();

  // Marker for single location for testing
  // var capitolBuilding = new google.maps.LatLng(33.749,-84.388111);

  // An array for multiple marker locations
  var markers = [
  ["Capitol building", 33.749,-84.388111],
  ["Georiga Dome", 33.757707,-84.400835],
  ["Spaghetti Junction", 33.891792,-84.25908],
  ];

  // An arrary to hold marker information
  var infoWindowContent = [
    // Capitol Building
    ["<div>" + 
      "<h3>Georgia State Capitol</h3" +
      "<p>This gold dome building has been the symbol of Atlanta since 1889</p>" +
      "</div>" 
    ],
    // Georgia Dome
    ["<div style='200px'>" + 
      "<h5>Georgia Dome</h3>" +
      "<br>"+
      "<p>Home of the Atlanta Falcons</p>" +
      "</div>" 
    ],
    // Spaghetti Junction
    ["<div>" + 
      "<h3>Spaghetti Junction</h3>" +
      "<p>Atlanta's interwined interest interchange</p>" +
      "</div>" 
    ]

  ];

  //Display info on the map
  var infoWindow = new google.maps.InfoWindow(), marker, i;

  //Display a center starting point on the map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: {lat: 33.776410, lng: -84.389269}
  });



  // Display geodesic line from starting location to ending location
  var line = new google.maps.Polyline({
    path: [
        // Hartsfield
        new google.maps.LatLng(33.640919, -84.427872), 
        // Tech Campus
        new google.maps.LatLng(33.776410, -84.389269), 
        // Ireland
        new google.maps.LatLng(53.330873, -6.19315),
        //Spain
        new google.maps.LatLng(40.313045, -3.678843)
    ],
    // line styling
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    geodesic: true,
    map: map
  });

  // Display single marker
  // var marker = new google.maps.Marker({
  //     position: capitolBuilding, // marker coordinates
  //     map: map,
  //     title:"Capitol Building"
  // });

  // Display multiple markers on a page using a for loop
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
      //Call the bounds variable to fit all the markers on screen
       map.fitBounds(bounds);

      // Allow each marker to have an info window   
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
          infoWindow.setContent(infoWindowContent[i][0]);
          infoWindow.open(map, marker);
        }
      })(marker, i));
    } 

            var flightPlanCoordinates = [
          {lat: 37.772, lng: -122.214},
          {lat: 21.291, lng: -157.821},
          {lat: -18.142, lng: 178.431},
          {lat: -27.467, lng: 153.027}
        ];
        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        flightPath.setMap(map);
}

    $.ajax({
        type: 'GET',
        url: fxml_url + 'FlightInfoEx',
        data: { 'ident': $('#ident_text').val(), 'howMany': 10, 'offset': 0 },
        success : function(result) {
            if (result.error) {
                alert('Failed to fetch flight: ' + result.error);
                return;
            }
            for (flight of result.FlightInfoExResult.flights) {
                if (flight.actualdeparturetime > 0) {
                    // display some textual details about the flight.
                    $('#results').html('Flight ' + flight.ident + ' from ' + flight.origin + ' to ' + flight.destination);

                    // display the route on a map.
                    fetchAndRenderRoute(flight.faFlightID);
                    console.log();
                    console.log();
                    return;
                }
            }
            alert('Did not find any useful flights');
        },
        error: function(data, text) { alert('Failed to fetch flight: ' + data); },
        dataType: 'jsonp',
        jsonp: 'jsonp_callback',
        xhrFields: { withCredentials: true }
        });
    });
});


// Fetch the planned route for a specified flight_id.
function fetchAndRenderRoute(flight_id) {
    $.ajax({
       type: 'GET',
       url: fxml_url + 'DecodeFlightRoute' + "MapFlight", 
       data: { 'faFlightID': flight_id }, 
       success : function(result) {
           if (result.error) {
               alert('Failed to decode route: ' + result.error);
               return;
           }

           // Initialize a data table using the Google API.
           var table = new google.visualization.DataTable();
           table.addColumn('number', 'Lat');
           table.addColumn('number', 'Lon');
           table.addColumn('string', 'Name');

           // Insert all of the points into the data table.
           var points = result.DecodeFlightRouteResult.data;
           table.addRows(points.length);
          //console.log data
          console.log(points);
           console.log(points[3].latitude);

           for (rowid = 0; rowid < points.length; rowid++) {
                table.setCell(rowid, 0, points[rowid].latitude);
                table.setCell(rowid, 1, points[rowid].longitude);
                table.setCell(rowid, 2, points[rowid].name + ' (' + points[rowid].type + ')' );

           }

           // Render the data table into a map using Google Maps API.
           var map = new google.visualization.Map(document.getElementById('map_div'));
           map.draw(table, {showTip: true, showLine: true, lineWidth: 3, lineColor: '#009900'});
       },
       error: function(data, text) { alert('Failed to decode route: ' + data); },
       dataType: 'jsonp',
       jsonp: 'jsonp_callback',
       xhrFields: { withCredentials: true }
   });