  // $(document).ready(function() {

    // Global variable
    var x =[]; // Latitues for the route
    var y =[]; // Longitutes for the route
    var z =[]; // Flight Id
    var LatLongArray = []; // Arrange flight path


    //var pointerId =[]; var ptLt=[]; var ptLg=[]; var ptDes=[]; // Attractions

    var lengthOfArray = 0; 

    // Route colors
    var StrokeColorArray = ['#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116'];
    var StrokeAdd = 0; // can be removed

    // Link to flightawre site
    var fxml_url = 'https://florianhutter:fee658c6ef8fe06991d9bb320eaa8b02597716de@flightxml.flightaware.com/json/FlightXML2/';


    /******* Firebase ***************************************************/

    // function ExtractDataFromFirebase() {
    //   // Initialize Firebase
    //   var config = {
    //     apiKey: "AIzaSyAHgsPmMGCsVEgrimgvdy3Fdghhf9Eloeo",
    //     authDomain: "group-project-gt.firebaseapp.com",
    //     databaseURL: "https://group-project-gt.firebaseio.com",
    //     projectId: "group-project-gt",
    //     storageBucket: "group-project-gt.appspot.com",
    //     messagingSenderId: "624105688641"
    //   };
    //   firebase.initializeApp(config);

    //   var locations = firebase.database();       
    //   locations .ref().on("child_added", function(childSnapshot, prevChildKey) {
    //     var temppointerId = (childSnapshot.val().attraction);
    //     var tempptDes = (childSnapshot.val().city);
    //     var tempptLt = (childSnapshot.val().latitude);
    //     var tempptLg = (childSnapshot.val().longitude);

    //     pointerId.push(temppointerId);
    //     ptDes.push(tempptDes);
    //     ptLt.push(tempptLt);
    //     ptLg.push(tempptLg);

    //   },function (error) {
    //     console.log("Error: " + error.code);
    //   });
    // };

    // //find pointers of Attractions
    // ExtractDataFromFirebase();
    

    /******* Draw route and pointers in Google Map ****************************/    

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
      //var noOfRoutes = LatLongArray.length / lengthOfArray;
      var flightPlanCoordinates = LatLongArray;
      // Draw the route
      var flightPath = new google.maps.Polyline({         
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: StrokeColorArray[StrokeAdd],
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      flightPath.setMap(map);
      StrokeAdd++;

      //**************************************************Markers*******************************************************
      // Function to delete markers 
      function deleteMarkers() {
        if (markerHolderArray) {
            for (var i = 0; i < markerHolderArray.length; i++) {
                markerHolderArray[i].setVisible(false);
            }
            markerHolderArray = [];
        }
      }

      markerHolderArray = [];

      var markerLocations = [
          ["Capitol building", 33.749,-84.388111, "Atlanta, GA", 0],
          ["Georiga Dome", 33.757707,-84.400835, "Atlanta, GA", 1],
          ["Spaghetti Junction", 33.891792,-84.25908, "Atlanta, GA", 2],
          ["Test", 32.657876,-96.817802, "Dallas, TX", 3],
          ["Test 2", 40.701464,-74.010184, "New York City", 4],
          ["Alcatraz Island", 37.826733, -122.42284, "San Francisco, CA", 5],
          ["Statue of Liberty", 40.689247, -74.0445, "New York, NY", 6],
          ["Brooklyn Bridge", 40.706234, -73.99699, "New York, NY", 7],
          ["The Alamo", 29.425772, -98.48581, "San Antonio, TX", 8],
          ["Glacier National Park", 48.759613, -113.787022, "West Glacier", 9],
          ["Rocky Mountain National Park", 40.366342, -105.561041, "Denver, CO", 10],
          ["Port of Miami", 25.778518, -80.178033, "Miami, FL", 11],
          ["Disney's Magic Kingdom", 28.418742, -81.581175, "Orlando, FL", 12] ,
          ["Golden Gate Bridge", 37.819528, -122.478484, "San Francisco, CA", 13],
          ["Lake Tahoe", 39.106927, -120.041346, "San Francisco, CA", 14],
          ["Yellowstone National Park", 44.440724, -110.581395, "Cheyenne", 15],
          ["Washington Monument", 38.889430, -77.035264, "Washington D.C.", 16],
          ["Niagra Falls", 43.089561, -79.069241, "Buffalo, NY", 17],
          ["Cloud Gate", 41.882683, -87.623316, "Chicago, IL" ,18],
          ["Milwaukee Art Museum", 43.039298, -87.897010, "Milwaukee, WI", 19],
          ["Gateway Arch", 38.624565, -90.184891, "St. Louis, MO", 20],
          ["Monument Valley", 36.986878, -110.080999, "Phoenix, AZ", 21],
          ["Great Salt Lake Desert", 40.611077, -113.452747, "Salt Lake City, UT", 22],
          ["Mount Rushmore National Memorial", 43.878864, -103.459075, "Rapid City, SD", 23],
          ["San Andreas Fault", 35.133485, -119.6714535, "San Francisco, CA", 24],
          ["Las Vegas Strip", 36.109643, -115.172615, "Las Vegas", 25],
          ["Cedar Point", 41.486756, -82.686739, "Cleveland, OH", 26],
          ["Space Needle", 47.620482, -122.349128, "Seattle, WA", 27],
          ["Liberty Memorial", 39.081011, -94.586024, "Kansas City, MO", 28],
          ["Liberty Memorial", 39.081011, -94.586024, "Kansas City, MO", 29],
          ["Stone Mountain", 33.806051, -84.146783, "Atlanta, GA", 30],
          ["Andrew Jackson's Hermitage", 36.215011, -86.612985, "Nashville, TN", 31],
          ["Pilgrim Monument", 42.052254, -70.188645, "Provincetown, MA", 32],
          ["Hollywood Sign", 34.134062, -118.321634, "Los Angeles, CA", 33],
          ["Four Corners Monument", 36.998996, -109.045209, "Albuquerque, NM", 34],
          ["Southernmost Point", 24.546509, -81.797495, "Key West, FL", 35],
          ["Monument Rocks", 38.792915, -100.762839, "Wichita, KS", 36],
          ["Mt Elbert", 39.117811, -106.445275, "Denver. CO", 37],
          ["Hoover Dam", 36.016226, -114.737241, "Las Vegas, NV", 38]
      ];

      // // Adding pointers of attractions
      // for(var j = 0; j < ptLt.length; j++ ) {  
      //   var latitu = {lat:  ptLt[j] , lng: ptLg[j]};
      //   var title = pointerId[j];
      //   var marker = new google.maps.Marker({
      //     position: latitu,
      //     map: map,
      //     title: title,
      //     icon: {
      //         url: "assets/images/test.png",
      //         scaledSize: new google.maps.Size( 64, 64 )
      //     },
      //     animation: google.maps.Animation.DROP 
      //   });
      // }
      $("#getMarkers").on("click",function(){

            //$("#myForm").bind("submit", function(event){

            event.preventDefault();
            //deleteMarkers();
            var aaaa = $( "#OptionDeparture option:selected" ).text();
            console.log("Submit Text: " + aaaa );
            //option:selected
            //var aaaa = $( "#OptionDepature " ).val();
            //console.log("Submit Text is: " +   aaaa );
              //if (   == "New York, NY" ) {

              //   for( var i = 0; i < markerLocations.length; i++ ){
              //       if ( markerLocations[i].indexOf( "New York, NY") != -1 ) {
              //           var city = i;
              //           var position = new google.maps.LatLng(markerLocations[city][1], markerLocations[city][2]);
              //           //bounds.extend(position);
              //           marker = new google.maps.Marker({
              //                   position: position,
              //                   map: map,
              //                   title: markerLocations[i][0],
              //                   visible: true,
              //                   icon: {
              //                       url: "assets/images/test.png",
              //                       scaledSize: new google.maps.Size( 64, 64 )
              //                   }
              //           });
              //           markerHolderArray.push(marker);
              //           // Add info window to marker    
              //           google.maps.event.addListener(marker, 'click', (function(marker, i) {
              //               return function() {
              //                   infoWindow.setContent(infoWindowContent[i][0]);
              //                   infoWindow.open(map, marker);
              //               }
              //           })(marker, i));
              //     }
              // // End For loop
              // } 

            // End if statement
            //} 

      // End jQuery on click
      });


    //========End initMap 
    }; 


    /******* Flight-aware - Origin Depature *****************************/  

    function findFlightRoute(flight_id){
      $.ajax({
        type: 'GET',
        url: fxml_url + 'GetHistoricalTrack', 
        data: { 'faFlightID' : flight_id},
        success : function(result) {
          if (result.error) {
            //console.log('Failed to decode route: ' + result.error);
            return;
          };   
          //console.log(result);
          var points = result.GetHistoricalTrackResult.data;
          lengthOfArray = points.length;
          for (i = 0; i < points.length; i++) {
            var a = points[i].latitude;
            var b = points[i].longitude;  
            x.push(a);
            y.push(b); 
            z.push(points[i].timestamp);
          };
          //return;
          initMap();
          //console.log(flight_id);
        },
        error: function(data, text) { console.log('Failed to decode route: ' + data); },
        dataType: 'jsonp',
        jsonp: 'jsonp_callback',
        //xhrFields: { withCredentials: true }
      });
    };


    /******* Find the flight details of a selected flight number ********/ 

    function ExtractDataFromFlightAware(){
      $.ajax({
        type: 'GET',
        url: fxml_url + 'FlightInfoEx',// --------  url: fxml_url + 'FlightInfoEx
        data: { 'ident': $('#ident_text').val(), 'howMany': 10, 'offset': 0 },
        success : function(result) {
          if (result.error) {
              //console.log('Failed to fetch flight: ' + result.error);
              return;
          }
          //add flight depature and destination places
          //console.log(result);
          for (flight of result.FlightInfoExResult.flights) {  
            if (flight.actualdeparturetime > 0) {        
              var OptRoute = $("<option>");
              OptRoute.addClass("dep");
              OptRoute.text(flight.originCity + " to " + flight.destinationCity + " on " + flight.filed_departuretime);
              OptRoute.attr("id",flight.faFlightID);
              OptRoute.attr("value", flight.destinationCity);
              $("#OptionDepature").append(OptRoute);
            }              
          }                      
          return;
          //console.log('Did not find any useful flights');
        },
        error: function(data, text) { console.log('Failed to fetch flight: ' + data); },
        dataType: 'jsonp',
        jsonp: 'jsonp_callback',
        xhrFields: { withCredentials: true }
      });
    };
        

    /******* Click Events ***********************************************/ 
    
    $('#go_button').on ("click", function() {
      // clearData();
      ExtractDataFromFlightAware(); //find flight number
      //console.log("length of fb : " + ptLt.length);
    });

    $("#submitdd").on("click",function(){
      var selectedId = $("#OptionDepature").find('option:selected').attr('id');
      findFlightRoute(selectedId);
      $('#results').html("Flight Route Selected");
    });

    $("#reset").on("click",function(){
      //window.location.reload();

    });
    

    // });
