$(document).ready(function(){
  var destionation1Value = "";
  var destination2Value = "";


});



function initMap() {


  //====Display a center starting point==========================
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: {lat: 37.6334167, lng: -90.9594444},
      mapTypeId: 'terrain'
    });

function deleteMarkers() {
    if (markerHolderArray) {
        for (var i = 0; i < markerHolderArray.length; i++) {
            markerHolderArray[i].setVisible(false);
        }
        markerHolderArray = [];
    }
}

function showMarkers() {
    if (markerHolderArray) {
        for (var i = 0; i < markerHolderArray.length; i++) {
            markerHolderArray[i].setVisible(true);
        }
        //markerHolderArray = [];
    }
}



  //===========================================================
  var markerHolderArray = [];


  // Variable to hold the bounds to call later
  var bounds = new google.maps.LatLngBounds();

  //========An array for marker locations==================================================
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

  function showMarkers(destination1Value){
    // for(var i = 0; i < markerLocations.length; i++){
    //   var position = new google.maps.LatLng(markerLocations[i][1], markerLocations[i][2]);
    //   bounds.extend(position);
    //   marker = new google.maps.Marker({
    //     position: position,
    //     map: map,
    //     title: markerLocations[i][0],
    //     icon: {
    //       url: "assets/images/test.png",
    //       scaledSize: new google.maps.Size(64, 64)
    //     },
    //     //visible: true
    //   });
    //   //push markers to the empty array holder to the markers
    //   markerHolderArray.push(marker);
    //   console.log("Holder Array: "+ markerHolderArray[i])
    // // End For loop
    // }
  // End Function
  }

  // showMarkers();


  //================Marker information for info window=========================================
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
  //var infoWindow = new google.maps.InfoWindow(), marker, i;



//==============Coordinates================================================================
  // Short fights 2 0f 5-----------------
  var IAHtoJAXCoordinates = [
    //IAH airport
    {lat: 29.990326, lng: -95.336952},
    {lat: 30.012031, lng: -94.866943},
    {lat: 29.458731, lng: -94.42749},
    {lat: 29.487425, lng: -92.504883},
    {lat: 30.533876, lng: -89.439699},
    {lat: 30.57172, lng: -87.989502},
    {lat: 30.845647, lng: -86.638184},
    {lat: 30.65209, lng: -84.660645},
    {lat: 30.37169, lng: -82.087097},
    // JAX airport
    {lat: 30.494243, lng: -81.688156}
  ];
  var IAHtoJAXPath = new google.maps.Polyline({
     path: IAHtoJAXCoordinates,
     geodesic: true,
     strokeColor: '#FF0000',
     strokeOpacity: 1.0,
     strokeWeight: 2
     //map:map
  });

  // Short fights 2 0f 5-----------------
  var MSPtoINDCoordinates = [
    //MSP airport
    {lat:44.933453,lng:-93.060379},
    {lat: 44.957024, lng: -93.427735},
    {lat: 44.699898, lng: -93.47168},
    {lat: 44.598291, lng: -93.175049},
    {lat: 44.559164, lng: -92.746582},
    {lat: 43.913724, lng: -91.779785},
    {lat: 43.691708, lng: -91.274414},
    {lat: 43.004647, lng: -89.956055},
    {lat: 40.313044, lng: -87.539064},
    {lat: 39.854938, lng: -86.514587},
    {lat: 39.894987, lng: -86.314087},
    {lat: 39.804316, lng:-86.171265 },
    {lat: 39.717223, lng: -86.295547},
    // IND airport
    {lat: 39.717223, lng: -86.295547}
  ];

  var MSPtoINDPath = new google.maps.Polyline({
     path: MSPtoINDCoordinates,
     geodesic: true,
     strokeColor: '#FF0000',
     strokeOpacity: 1.0,
     strokeWeight: 2
     //map:map
  });

  //short figts 3 of 5----------------------------------
  var MSPtoSLCCoordinates = [
    {lat: 40.79016, lng :-111.979179 },
    {lat: 40.480382, lng: -111.840821},
    {lat: 40.178874, lng:-111.42334 },
    {lat: 40.178874, lng: -109.072266},
    {lat: 40.128491, lng: -107.358399},
    {lat: 41.244773, lng: -104.0625},
    {lat: 42.5207, lng: -98.657227},
    {lat: 43.421009, lng: -96.459961},
    {lat: 44.885066, lng: -93.222427}
    ];

  var MSPtoSLCPath = new google.maps.Polyline({
     path: MSPtoSLCCoordinates,
     geodesic: true,
     strokeColor: '#FF0000',
     strokeOpacity: 1.0,
     strokeWeight: 2
     //map:map
  });

  // short figts 4 of 5-------------------------------
  var CLTtoPHLCoordinates = [
    // CHL airport
    {lat: 35.187278, lng: -80.892334},
    {lat: 35.115415, lng: -80.859375},
    {lat: 34.985003, lng: -80.831909},
    {lat: 34.867905, lng: -80.793457},
    {lat: 34.813803, lng: -80.727539},
    {lat: 34.83635, lng: -80.623169},
    {lat: 35.007503, lng: -80.606689},
    {lat: 35.330812, lng: -80.667114},
    {lat: 35.835629, lng: -80.2771},
    {lat: 37.317752, lng:-79.321289},
    {lat: 38.882481, lng: -77.047119},
    {lat: 39.414977, lng: -76.014404},
    {lat: 39.783213, lng: -75.772705},
    {lat: 40.178873, lng: -75.15747},
    {lat: 40.22083, lng: -75.025634},
    {lat: 40.086477, lng: -74.970703},
    // PHL airport
    {lat: 39.874439, lng: -75.242615}
  ];

  var CLTtoPHLPath = new google.maps.Polyline({
     path: CLTtoPHLCoordinates,
     geodesic: true,
     strokeColor: '#FF0000',
     strokeOpacity: 1.0,
     strokeWeight: 2
     //map:map
  });

  // short figts 5 of 5--------------------------------------
  var PDXtoSANCoordinates = [
    //PDX airport
    {lat: 45.590017, lng: -122.595062},
    {lat: 45.305855, lng: -122.255959},
    {lat: 45.213017, lng: -122.915064},
    {lat: 43.992828, lng: -122.871119},
    {lat: 33.454362, lng: -118.267825},
    //SAN airport
    {lat: 32.733863, lng: -117.193394}
  ];

  var PDXtoSANPath = new google.maps.Polyline({
     path: PDXtoSANCoordinates,
     geodesic: true,
     strokeColor: '#FF0000',
     strokeOpacity: 1.0,
     strokeWeight: 2
     //map:map
  });

  // Long flights 1 of 5----------------------------------
  var SFOtoBSOCoordinates = [
    // SFO airport
    {lat: 37.621302, lng: -122.379112},
    {lat: 38.212288, lng: -122.574463},
    {lat: 39.402244, lng: -120.146484},
    {lat: 40.913512, lng: -114.169925},
    {lat: 41.836827, lng: -104.018555},
    {lat: 42.000325, lng: -90.131837},
    {lat: 42.682435, lng: -73.344727},
    //BSO airport
    {lat: 42.365647, lng: -71.009789}
  ];

  var SFOtoBSOPath = new google.maps.Polyline({
     path: SFOtoBSOCoordinates,
     geodesic: true,
     strokeColor: '#FF0000',
     strokeOpacity: 1.0,
     strokeWeight: 2
     //map:map
  });

  // Long fights 2 0f 5-----------------------------------
  var LAXtoJAXCoordinates = [
    //LAX airport
    {lat: 33.941651, lng: -118.408585},
    {lat: 34.161818, lng: -116.477052},
    {lat: 34.939985, lng: -114.653322},
    {lat: 36.967449, lng: -107.512207},
    {lat: 38.169114, lng: -102.062988},
    {lat: 39.300298, lng: -95.097656},
    {lat: 40.044437, lng: -87.626952},
    {lat: 39.89288, lng: -80.551757},
    {lat: 40.128491, lng: -74.838867},
    //JAX airport
    {lat: 40.128491, lng: -74.838867}
  ];

  var LAXtoJAXPath = new google.maps.Polyline({
     path: LAXtoJAXCoordinates,
     geodesic: true,
     strokeColor: '#FF0000',
     strokeOpacity: 1.0,
     strokeWeight: 2
     //map:map
  });

  // Long fights 3 0f 5-----------------------------------
  var PDXtoHOUCoordinates = [
    //PDX airport
    {lat: 45.590017, lng: -122.595062},
    {lat: 45.352147, lng: -122.036134},
    {lat: 45.521746, lng: -121.179201},
    {lat: 42.032983, lng: -113.906255},
    {lat: 35.424873, lng: -103.051758},
    {lat: 32.063961, lng: -95.976564},
    //HOU airport
    {lat: 29.990623, lng: -95.337296}
  ];

  var PDXtoHOUPath = new google.maps.Polyline({
     path: PDXtoHOUCoordinates,
     geodesic: true,
     strokeColor: '#FF0000',
     strokeOpacity: 1.0,
     strokeWeight: 2
     //map:map
  });

  // Long fights 4 0f 5-----------------------------------
  var SEAtoMIACoordinates = [
    //SEA airport
    {lat: 47.45038, lng: -122.309074},
    {lat: 48.107439, lng: -122.431643},
    {lat: 48.048718, lng: -120.849609},
    {lat: 47.754099, lng: -116.191406},
    {lat: 46.739869, lng: -113.994141},
    {lat: 44.777937, lng: -109.951175},
    {lat: 40.913513, lng: -102.106934},
    {lat: 37.788082, lng: -96.943361},
    {lat: 37.020099, lng: -94.746094},
    {lat: 30.562262, lng: -84.946289},
    {lat: 28.729131, lng: -82.573243},
    {lat: 26.096255, lng: -80.639648},
    {lat: 25.992612, lng: -80.189209},
    // MIA airport
    {lat: 25.795873, lng: -80.287056}
  ];

  var SEAtoMIAPath = new google.maps.Polyline({
     path: SEAtoMIACoordinates,
     geodesic: true,
     strokeColor: '#FF0000',
     strokeOpacity: 1.0,
     strokeWeight: 2
     //map:map
  });

  // Long fights 5 0f 5-----------------------------------
  var MSPtoMSYCoordinates = [
    //MSP airport
    {lat: 44.885066, lng: -93.222427},
    {lat: 45.089037, lng: -93.735352},
    {lat: 44.684278, lng: -93.559569},
    {lat: 43.468869, lng: -93.22998},
    {lat: 42.39101, lng: -92.416992},
    {lat: 40.563896, lng: -92.263184},
    {lat: 38.616872, lng: -91.867675},
    {lat: 36.474308, lng: -91.340331},
    {lat: 34.052661, lng: -90.966797},
    {lat: 31.334872, lng: -90.307617},
    {lat: 30.97761, lng: -90.527344},
    //MSY airport
    {lat: 29.992259, lng: -90.259037}
  ];

  var MSPtoMSYPath = new google.maps.Polyline({
     path: SEAtoMIACoordinates,
     geodesic: true,
     strokeColor: '#FF0000',
     strokeOpacity: 1.0,
     strokeWeight: 2
     //map:map
  });




  //=================================Populate map with markers on load then hide all markers======================
    // for( i = 0; i < markers.length; i++ ) {
    //   var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    //   bounds.extend(position);
    //   marker = new google.maps.Marker({
    //       position: position,
    //       map: map,
    //       title: markers[i][0],
    //       icon: {
    //         url: "assets/images/test.png",
    //         scaledSize: new google.maps.Size(64, 64)
    //       },
    //       visible: false
    //   });

  //===============================================================================================================
      $("#myForm").on("submit", function(event){
            showMarkers();
            //console.log("Holder Array: "+markerHolderArray[i]);
            // Have to have event.preventDeefault or form will not work!
             event.preventDefault();
             // set variables to user input so that different select values can be used
             destination1Value = $("#Destination_1").val();
             destination2Value = $("#Destination_2").val();
             // Get the jQuery values for the select field then loop through the markers array
            // for(i = 0; i < markers.length; i++){
            //   // if the city equals the user input display the marker by repopulating the map and make this visible
            //   if (markers[i][3]== destination1Value || markers[i][3]== destination2Value){
            //      markers[i].setMap(map);
            //   }

            // }
            //showMarkers();
            //console.log(markerHolderArray.JSON.tostringify());
            //console.log(JSON.stringify(markerHolderArray));






            //====Get values for short==============
            if ( destination1Value == "IAHtoJAX" ) {
              IAHtoJAXPath.setMap(map);
              //var markerHolderArray = [];
              //markerHolderArray.pop();
              //console.log(markerHolderArray);
              deleteMarkers();
              for(var i = 0; i < markerLocations.length; i++){
                  if (markerLocations[i].indexOf("San Francisco") != -1) {
                      //console.log(markerLocations[i].indexOf("San Francisco"));
                      //console.log(markerLocations);
                      var city = i;
                      var position = new google.maps.LatLng(markerLocations[city][1], markerLocations[city][2]);
                      bounds.extend(position);
                      //console.log()
                      marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                title: markerLocations[i][0],
                                visible: true,
                                //zIndex: markerLocations[i][4],
                                icon: {
                                url: "assets/images/test.png",
                                scaledSize: new google.maps.Size(64, 64)
                            }
                      });
                      markerHolderArray.push(marker);
                  }
              // End For loop
              } 

            } 
            else {
              IAHtoJAXPath.setMap(null);

            }



            if (destination1Value == "MSPtoIND"){
              MSPtoINDPath.setMap(map);
              deleteMarkers();
                //var markerHolderArray = [];
                //markerHolderArray.pop();
                //console.log(markerHolderArray[i]);
                    for(var i = 0; i < markerLocations.length; i++){
                        if (markerLocations[i].indexOf("Atlanta") != -1) {
                          console.log(markerLocations[i].indexOf("Atlanta"));
                           console.log(markerLocations);
                          var city = i;
                          var position = new google.maps.LatLng(markerLocations[city][1], markerLocations[city][2]);
                          bounds.extend(position);
                          marker = new google.maps.Marker({
                                  position: position,
                                  map: map,
                                  title: markerLocations[i][0],
                                  visible: true,
                                  icon: {
                                  url: "assets/images/test.png",
                                  scaledSize: new google.maps.Size(64, 64)
                              }

                          });
                          //markerHolderArray.pop();
                          //push markers to the empty array holder to the markers
                          markerHolderArray.push(marker);
                          console.log(markerHolderArray);
                          //markerHolderArray[i].setMap(map);
                        }
                    // End For loop
                    } 



            } 
            else {
              MSPtoINDPath.setMap(null);
                  // function itsafunction(){
                  //     for ( i = 0; markerHolderArray.length; i++){
                  //         if ( markerHolderArray[i][3] == "San Francisco") {
                  //             markerHolderArray[i].splice(0, 3);
                  //         }
                  //     }
                  // }
              // for ( var i = 0; i < markerHolderArray.length; i++ ){
              //   if ( markerHolderArray[i][0] !== "Atlanta"){
              //     markerHolderArray[i].setMap(null);
              //     markerHolderArray=[];
              //   } else {
              //     markerHolderArray[i].setMap(map);
              //   }
              // }

              // deleteMarkers();
            }

            if (destination1Value == "MSPtoSLC"){
              MSPtoSLCPath.setMap(map);
              deleteMarkers();
                  for(var i = 0; i < markerLocations.length; i++){
                        if (markerLocations[i].indexOf("New York") != -1) {
                          console.log(markerLocations[i].indexOf("New York"));
                           console.log(markerLocations);
                          var city = i;
                          var position = new google.maps.LatLng(markerLocations[city][1], markerLocations[city][2]);
                          bounds.extend(position);
                          marker = new google.maps.Marker({
                                  position: position,
                                  map: map,
                                  title: markerLocations[i][0],
                                  visible: true,
                                  icon: {
                                  url: "assets/images/test.png",
                                  scaledSize: new google.maps.Size(64, 64)
                              }

                          });
                          //markerHolderArray.pop();
                          //push markers to the empty array holder to the markers
                          markerHolderArray.push(marker);
                          console.log(markerHolderArray);
                          //markerHolderArray[i].setMap(map);
                        }
                    // End For loop
                    } 


            } else {
              MSPtoSLCPath.setMap(null);
              // for ( var i = 0; i < markerHolderArray.length; i++ ){
              //   if ( markerHolderArray[i][0] !== "New York"){
              //     markerHolderArray[i].setMap(null);
              //     markerHolderArray=[];
              //   } else {
              //     markerHolderArray[i].setMap(map);
              //   }
              // }
              // if ( markerHolderArray[0][3] !== "New York"){
              //     markerHolderArray[0][3].setVisible(false);
              //   } 
              // deleteMarkers();
            }


            // if (destination1Value == "CLTtoPHL"){
            //   CLTtoPHLPath.setMap(map);
            // } else {
            //   CLTtoPHLPath.setMap(null);
            // }


            // if (destination1Value == "PDXtoSAN"){
            //   PDXtoSANPath.setMap(map);
            // } else {
            //   PDXtoSANPath.setMap(null);
            // }

            // //===Get values for long===========
            // if (destination2Value == "SFOtoBSO"){
            //   SFOtoBSOPath.setMap(map);
            // } else {
            //   SFOtoBSOPath.setMap(null);
            // }

            // if (destination2Value == "LAXtoJAX"){
            //   LAXtoJAXPath.setMap(map);
            // } else {
            //   LAXtoJAXPath.setMap(null);
            // }

            // if (destination2Value == "PDXtoHOU"){
            //   PDXtoHOUPath.setMap(map);
            // } else {
            //   PDXtoHOUPath.setMap(null);
            // }

            // if (destination2Value == "SEAtoMIA"){
            //   SEAtoMIAPath.setMap(map);
            // } else {
            //   SEAtoMIAPath.setMap(null);
            // }

            // if (destination2Value == "MSPtoMSY"){
            //   MSPtoMSYPath.setMap(map);
            // } else {
            //   MSPtoMSYPath.setMap(null);
            // }


      });


      //Call the bounds variable to fit all the markers on screen
       //map.fitBounds(bounds);

      // Allow each marker to have an info window   
      // google.maps.event.addListener(marker, 'click', (function(marker, i) {
      // return function() {
      //     infoWindow.setContent(infoWindowContent[i][0]);
      //     infoWindow.open(map, marker);
      //   }
      // })(marker, i));

// End initMap()
} 

 
