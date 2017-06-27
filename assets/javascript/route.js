    // $(document).ready(function() {

    // Global variable
    var x =[]; // Latitues for the route
    var y =[]; // Longitutes for the route
    var z =[]; // Flight Id
    var LatLongArray = []; // Arrange flight path

    var pointerId =[]; var ptLt=[]; var ptLg=[]; var ptDes=[]; // Attractions

    var lengthOfArray = 0; 

    // Route colors
    var StrokeColorArray = ['#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116','#FF0000','#800000','#FF5733','#935116'];
    var StrokeAdd = 0; // can be removed

    // Link to flightawre site
    var fxml_url = 'https://florianhutter:fee658c6ef8fe06991d9bb320eaa8b02597716de@flightxml.flightaware.com/json/FlightXML2/';


    /******* Firebase ***************************************************/

    function ExtractDataFromFirebase() {
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
      locations .ref().on("child_added", function(childSnapshot, prevChildKey) {
        var temppointerId = (childSnapshot.val().attraction);
        var tempptDes = (childSnapshot.val().city);
        var tempptLt = (childSnapshot.val().latitude);
        var tempptLg = (childSnapshot.val().longitude);

        pointerId.push(temppointerId);
        ptDes.push(tempptDes);
        ptLt.push(tempptLt);
        ptLg.push(tempptLg);

      },function (error) {
        console.log("Error: " + error.code);
      });
    };

    //find pointers of Attractions
    ExtractDataFromFirebase();
    

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

      // Adding pointers of attractions
      for(var j = 0; j < ptLt.length; j++ ) {  
        var latitu = {lat:  ptLt[j] , lng: ptLg[j]};
        var title = pointerId[j];
        var marker = new google.maps.Marker({
          position: latitu,
          map: map,
          title: title,
          animation: google.maps.Animation.DROP 
        });
      }
    }; 


    /******* Flight-aware - Origin Depature *****************************/  

    function findFlightRoute(flight_id){
      $.ajax({
        type: 'GET',
        url: fxml_url + 'GetHistoricalTrack', 
        data: { 'faFlightID' : flight_id},
        success : function(result) {
          if (result.error) {
            console.log('Failed to decode route: ' + result.error);
            return;
          };   
          console.log(result);
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
          console.log(flight_id);
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
              console.log('Failed to fetch flight: ' + result.error);
              return;
          }
          //add flight depature and destination places
          console.log(result);
          for (flight of result.FlightInfoExResult.flights) {  
            if (flight.actualdeparturetime > 0) {        
              var OptRoute = $("<option>");
              OptRoute.addClass("dep");
              OptRoute.text(flight.originCity + " to " + flight.destinationCity + " on " + flight.filed_departuretime);
              OptRoute.attr("id",flight.faFlightID);
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
    };
        

    /******* Click Events ***********************************************/ 
    
    $('#go_button').on ("click", function() {
      // clearData();
      ExtractDataFromFlightAware(); //find flight number
      console.log("length of fb : " + ptLt.length);
    });

    $("#submitdd").on("click",function(){
      var selectedId = $("#OptionDepature").find('option:selected').attr('id');
      findFlightRoute(selectedId);
      $('#results').html("Flight Route Selected");
    });

    $("#reset").on("click",function(){
      window.location.reload();
    });
    

    // });