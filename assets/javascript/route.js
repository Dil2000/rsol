
    // Global variable

    var LatLongArray = []; // Arrange flight path

    var pointerId =[]; var ptLt=[]; var ptLg=[]; var ptDes=[]; // Attractions

    var lengthOfArray = 0; 
   
    var latRoutes = []; // Latitues for the route
    var longRoutes = []; // Longitutes for the route
    var NoOfPoints =[0]; // No of points for each flight

    // Route colors
    var StrokeColorArray = ['#FF0000','#8E44AD','#2980B9','#229954','#826080','#183756','#F1C40F','#EC7063','#808B96','#FF0000','#8E44AD','#2980B9','#229954','#826080','#183756','#F1C40F','#EC7063','#808B96','#FF0000','#8E44AD','#2980B9','#229954','#826080','#183756','#F1C40F','#EC7063','#808B96'];
    var StrokeAdd = 0; 

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

      /**************************    Travis Points details      ***************************/
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
          "<img src='assets/images/yellow_stone_national_park.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
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
          "<h3>Four Corner's Monument</h3>"+
          "<img src='assets/images/four_corners_monument.jpg' style='height: 75px; width: 75px; border-radius: 50%;'>" +
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

      /***********************************************************************/
      
      // Basic map settings
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: {lat: 37.6334167, lng: -90.9594444},
        mapTypeId: 'terrain'
      });      
      // Find pointers for different routes
      for(var i = 0 ; i < NoOfPoints.length ; i++){
        var LatLongArray = [];
        var total = 0;
        var beforeTotal = 0;
        for (var e = 1 ; e < (i +1); e++ ) {
          total = total + NoOfPoints[e];
          beforeTotal = total - NoOfPoints[e];
        }
        // Draw the route
        for (var j = beforeTotal; j < total ; j++){ 
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
          //StrokeAdd++;
        }

      }

      // Adding pointers of attractions
      for(var j = 0; j < ptLt.length; j++ ) {  
        var latitu = {lat:  ptLt[j] , lng: ptLg[j]};
        var title = pointerId[j];

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
       
        // Travis Link
        var infoWindow = new google.maps.InfoWindow(), marker, j;

        // Travis - Add info window to marker    
        google.maps.event.addListener(marker, 'click', (function(marker, j) {
          return function() {
              infoWindow.setContent(infoWindowContent[j][0]);
              infoWindow.open(map, marker);
          }
        })(marker, j));  
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
              latRoutes.push(a);
              longRoutes.push(b);
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
          //return;
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
      ExtractDataFromFlightAware(); //find flight number
      $(this).attr( "disabled", true );
      $("#submitdd").attr({"disabled" :false , "value" : "Find Route"});
      $("OptionDepature").attr("disabled",false);
    });

    $("#submitdd").on("click",function(){
      var selectedId = $("#OptionDepature").find('option:selected').attr('id');
      findFlightRoute(selectedId); //find flight route
      var RouteText = $("#OptionDepature option:selected").text();
      StrokeAdd++;
      var newDiv = $("<div>");
      newDiv.css("color",StrokeColorArray[StrokeAdd]);
      newDiv.text(RouteText);
      newDiv.append("<br/>");
      $("#results").prepend(newDiv);
      $("#OptionDepature").find('option:selected').remove();      
      $("#go_button").attr("disabled",true);
      $(this).attr('value', 'Another Route');    
    });

    $("#reset").on("click",function(){
      window.location.reload();
      $("#go_button").attr( "disabled", false );
      $("#submitdd").attr("disabled",true);
      $("#OptionDepature").attr("disabled",false);
    });
    
