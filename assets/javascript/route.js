        //$(document).ready(function() {

          // Global variable
          var x =[]; // Latitues for the route
          var y =[]; // Longitutes for the route
          var z =[]; // Flight Id

          var flightidforpath = [];

          //var differentRoutes = []; // Find different da on the same route
          var LatLongArray = []; // Arrange flight path

          var lengthOfArray = 0; 

          // Route colors
          var StrokeColorArray = ['#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116'];

         // Link to flightawre site
          var fxml_url = 'https://florianhutter:fee658c6ef8fe06991d9bb320eaa8b02597716de@flightxml.flightaware.com/json/FlightXML2/';



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
               console.log("x : " + x[i] + " y : " + y[i] + " " + z[i]);
            }

            //var noOfRoutes = LatLongArray.length / lengthOfArray;

              var flightPlanCoordinates = LatLongArray;
              // Draw the route
              var flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                strokeColor: StrokeColorArray,
                strokeOpacity: 1.0,
                strokeWeight: 2
              });

            flightPath.setMap(map);


        /******* Find cities close to the the route ****************************/  

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
              //console.log(snapshot.val());
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
              //console.log(name);
            });

          //};





        /******* Find the flight route locations ****************************/  

          //Find flight route for a specific flight and copy them into the array
          /*function fetchAndPost(flight_id) { 
            console.log("passed id : " + flight_id);
            $.ajax({
              type: 'GET',
              url: fxml_url + 'DecodeFlightRoute', 
              data: { 'faFlightID': flight_id },
              success : function(result) {
                if (result.error) {
                  console.log('Failed to decode route: ' + result.error);
                  return;
                }      

                var points = result.DecodeFlightRouteResult.data;
                console.log(points);
                lengthOfArray = points.length;
                console.log(flight_id);
                for (i = 0; i < points.length; i++) { // 
                  var a = points[i].latitude;
                  var b = points[i].longitude;          
                  x.push(a);
                  y.push(b); 
                  z.push(flight_id);
                  console.log(a + "   " + "   " + "    "  + flight_id);
                }
                initMap();
                //return;
                //console.log("after : " + flight_id);
              },
              error: function(data, text) { console.log('Failed to decode route: ' + data); },
              dataType: 'jsonp',
              jsonp: 'jsonp_callback',
              //xhrFields: { withCredentials: true }
            });
          };*/

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
                console.log(result);
                for (flight of result.FlightInfoExResult.flights) {  
                  if (flight.actualdeparturetime > 0) {        
                    var OptRoute = $("<option>");
                    OptRoute.addClass("dep");
                    OptRoute.text(flight.originCity + " to " + flight.destinationCity);
                    $("#OptionDepature").append(OptRoute);
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
            data: { 'ident': $('#ident_text').val(),'howMany': 10, 'offset': 0 },
            success : function(result) {
              if (result.error) {
                  console.log('Failed to fetch flight: ' + result.error);
                  return;
              }
              console.log(">>>>>>>>>>>>>. " + result);
              for (flight of result.FlightInfoExResult.flights) { 
                if (flight.actualarrivaltime > 0) {
                  var route = ($("#OptionDepature" ).val().trim());
                  var SelectedOption =  (flight.originCity + " to " + flight.destinationCity).trim();
                  var DepatureTime = flight.filed_departuretime; //(in epoch seconds
                  if ( route == SelectedOption){
                    //fetchAndPost(flight.faFlightID);
                    $('#results').html('Flight ' + flight.ident + '    from ' + flight.originCity + '    to ' + flight.destinationCity
                      );
                      flightidforpath.push(flight.faFlightID); 
                      console.log(flight.origin);  
                      var flightoriginplace = flight.origin;
                  }      
                }
              }
/////////////////////////////////////////////////
                          for(var j = 0 ; j < flightidforpath.length ; j++ ){
                            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Spicked flight id : " + flightidforpath[j]);
                            $.ajax({
                              type: 'GET',
                              url: fxml_url + 'DecodeFlightRoute', 
                              data: { 'faFlightID' : flightidforpath[j]},
                              //data: { 'origin' : flightoriginplace }
                              success : function(result) {
                                if (result.error) {
                                  console.log('Failed to decode route: ' + result.error);
                                  return;
                                }      
                                console.log(result);
                                var points = result.DecodeFlightRouteResult.data;
                                //console.log(points);
                                lengthOfArray = points.length;
                                for (i = 0; i < points.length; i++) {  DAL675-1497849971-airline-0030,
                                  var a = points[i].latitude;
                                  var b = points[i].longitude;  
                                  x.push(a);
                                  y.push(b); 
                                  z.push(flight.faFlightID);
                                  console.log(a + "   " + b +  "    "  + flight.faFlightID);
                                }
                                                             //return;
                                //console.log("after : " + flight_id);
                                   initMap();
                              },
                              error: function(data, text) { console.log('Failed to decode route: ' + data); },
                              dataType: 'jsonp',
                              jsonp: 'jsonp_callback',
                              //xhrFields: { withCredentials: true }
                            });
                          }
                                                       
                        ////////////////////////////////////////////////////


              return;
              },
              error: function(data, text) { console.log('Failed to fetch flight: ' + data); },
              dataType: 'jsonp',
              jsonp: 'jsonp_callback',
              xhrFields: { withCredentials: true }
            });
          }




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
          