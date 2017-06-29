    // $(document).ready(function() {

    // Global variable

    var z =[]; // Flight Id
    var LatLongArray = []; // Arrange flight path

    var pointerId =[]; var ptLt=[]; var ptLg=[]; var ptDes=[]; // Attractions

    var lengthOfArray = 0; 

    // Route colors
    var StrokeColorArray = ['#FF0000','#8E44AD','#2980B9','#229954','#ECF0F1','#212F3D','#F1C40F','#EC7063','#808B96','#FF0000','#8E44AD','#2980B9','#229954','#ECF0F1','#212F3D','#F1C40F','#EC7063','#808B96','#FF0000','#8E44AD','#2980B9','#229954','#ECF0F1','#212F3D','#F1C40F','#EC7063','#808B96'];
    var StrokeAdd = 0; // can be removed

    var noOfClicks = 1;
    var latRoutes = []; // Latitues for the route
    var longRoutes = []; // Longitutes for the route
    var NoOfPoints =[0]; // No of points for each flight

    /*var routePointers = {latitue : "", longitude : "",flightId : "",clickedNumber : ""}*/

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
       // var tempInfo = (childSnapshot.val().info);

        pointerId.push(temppointerId);
        ptDes.push(tempptDes);
        ptLt.push(tempptLt);
        ptLg.push(tempptLg);
        //info.push(tempInto);

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

      for (var i = 0 ; i < noOfClicks ; i++){ 
        var LatLongArray = [];
        var startPoint = NoOfPoints[i-1];
        var endPoint = NoOfPoints[i] + NoOfPoints[i-1];
        endPoint = startPoint + endPoint;
        console.log("start : " + startPoint + "   End point : " + endPoint);
        //console.log(startPoint + "  " + endPoint);
        for (var j = startPoint; j < endPoint ; j++){ 
          LatLongArray.push({lat: latRoutes[j], lng: longRoutes[j]}); //Route   
          var flightPlanCoordinates = LatLongArray;  
          var flightPath = new google.maps.Polyline({   
              path: flightPlanCoordinates,
              geodesic: true,
              strokeColor: StrokeColorArray[i],
              strokeOpacity: 1.0,
              strokeWeight: 2
            });
            flightPath.setMap(map);
            StrokeAdd++;
        }
      }
       
      // Adding pointers of attractions
      for(var j = 0; j < ptLt.length; j++ ) {  
        var latitu = {lat:  ptLt[j] , lng: ptLg[j]};
        var title = pointerId[j];
        //var InfoWindowContent = info[j];
       // var infoWindow = new google.maps.InfoWindow(), marker, j;

        var marker = new google.maps.Marker({
          position: latitu,
          map: map,
          title: title,
          icon: {
            url: "assets/images/test.png",
            scaledSize: new google.maps.Size( 32, 32 )
          },
          animation: google.maps.Animation.DROP 
        });
      }

      // google.maps.event.addListener(marker, 'click', (function(marker, j) {
      //   return function() {
      //       infoWindow.setContent(InfoWindowContent);
      //       infoWindow.open(map, marker);
      //   }
      // })(marker, j));

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
              latRoutes.push(a);
              longRoutes.push(b);
              z.push(flight_id);
          };
          NoOfPoints.push(lengthOfArray);
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
              OptRoute.text(flight.originCity + " to " + flight.destinationCity + " on " + moment.unix(flight.filed_departuretime).format('dddd, MMMM Do, YYYY h:mm:ss A'));
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
      $(this).attr( "disabled", true );
      $("#submitdd").attr({"disabled" :false , "value" : "Find Route"});
      $("OptionDepature").attr("disabled",false);
    });

    $("#submitdd").on("click",function(){
      var selectedId = $("#OptionDepature").find('option:selected').attr('id');
      findFlightRoute(selectedId);
      $("#OptionDepature").find('option:selected').remove();
      $('#results').html("Flight Route Selected");
      $("#go_button").attr("disabled",true);
      $(this).attr('value', 'Another Route');    
      //$("#OptionDepature").attr("disabled",true);  
      noOfClicks++;
    });

    $("#reset").on("click",function(){
      window.location.reload();
      $("#go_button").attr( "disabled", false );
      $("#submitdd").attr("disabled",true);
      $("#OptionDepature").attr("disabled",false);
    });
    

    // });
