
//=========================================Custom Marker Locations===========================================================
var markerLocations = [
      ["Capitol building", 33.749,-84.388111, "Atlanta", 0],
      ["Georiga Dome", 33.757707,-84.400835, "Atlanta", 1],
      ["Spaghetti Junction", 33.891792,-84.25908, "Atlanta", 2],
      ["Alcatraz Island", 37.826733, -122.42284, "San Francisco", 3],
      ["Statue of Liberty", 40.689247, -74.0445, "New York", 4],
      ["Brooklyn Bridge", 40.706234, -73.99699, "New York", 5],
      ["The Alamo", 29.425772, -98.48581, "San Antonio", 6],
      ["Glacier National Park", 48.759613, -113.787022, "West Glacier", 7],
      ["Rocky Mountain National Park", 40.366342, -105.561041, "Dennver", 8],
      ["Port of Miami", 25.778518, -80.178033, "Miami", 9],
      ["Disney's Magic Kingdom", 28.418742, -81.581175, "Orlando", 10] ,
      ["Golden Gate Bridge", 37.819528, -122.478484, "San Francisco", 11],
      ["Lake Tahoe", 39.106927, -120.041346, "San Francisco", 12],
      ["Yellowstone National Park", 44.440724, -110.581395, "Cheyenne", 13],
      ["Washington Monument", 38.889430, -77.035264, "Washington D.C.",14],
      ["Niagra Falls", 43.089561, -79.069241, "Buffalo",15],
      ["Cloud Gate", 41.882683, -87.623316, "Chicago",16],
      ["Milwaukee Art Museum", 43.039298, -87.897010, "Milwaukee",17],
      ["Gateway Arch", 38.624565, -90.184891, "St. Louis",18],
      ["Monument Valley", 36.986878, -110.080999, "Phoenix",19],
      ["Great Salt Lake Desert", 40.611077, -113.452747, "Salt Lake City",20],
      ["Mount Rushmore National Memorial", 43.878864, -103.459075, "Rapid City",21],
      ["San Andreas Fault", 35.133485, -119.6714535, "Rapid City",22],
      ["Las Vegas Strip", 36.109643, -115.172615, "Las Vegas",23],
      ["Cedar Point", 41.486756, -82.686739, "Cleveland",24],
      ["Space Needle", 47.620482, -122.349128, "Seattle",25],
      ["Liberty Memorial", 39.081011, -94.586024, "Kansas City",26],
      ["Stone Mountain", 33.806051, -84.146783, "Atlanta",27],
      ["Andrew Jackson's Hermitage", 36.215011, -86.612985, "Nashville",28],
      ["Pilgrim Monument", 42.052254, -70.188645, "Provincetown",29],
      ["Hollywood Sign", 34.134062, -118.321634, "Los Angeles",30],
      ["Four Corners Monument", 36.998996, -109.045209, "Albuquerque",31],
      ["Southernmost Point", 24.546509, -81.797495, "Key West",32],
      ["Monument Rocks", 38.792915, -100.762839, "Wichita",33],
      ["Mt Elbert", 39.117811, -106.445275, "Denver",34],
      ["Hoover Dam", 36.016226, -114.737241, "Las Vegas",35]
    ];

//===============================================Info Window for Custom Marker Locations===========================================
  var infoWindowContent = [
    // Capitol Building
    ["<div style='100px'>" + 
      "<h3>Georgia State Capitol</h3>" +
      "<img src='assets/images/state_capitol_building.jpg' style='height: 75px; width: 75px;'>" +
      "<p>This gold dome building has been the symbol of Atlanta since 1889</p>" +
      "</div>" 
    ], 
    // Georgia Dome
    ["<div style='150px'>" + 
      "<h3>Georgia Dome</h3>" +
      "<img src='assets/images/falcons_nest.jpg' style='height: 75px; width: 75px;'"+
      "<p>Home of the Atlanta Falcons</p>" +
      "</div>" 
    ],
    // Spaghetti Junction
    ["<div style='150px'>" + 
      "<h3>Spaghetti Junction</h3>" +
      "<img src='assets/images/spaghetti_junction.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Atlanta's interwined interest interchange</p>" +
      "</div>" 
    ],

    // Alcatraz Island 
    ["<div style='150px'>" + 
      "<h3>Alcatraz Island</h3>" +
      "<img src='assets/images/alcatraz.jpg' style='height: 75px; width: 75px;'>" +
      "<p>The Rock, a little island with a lot history</p>" +
      "</div>" 
    ],

    // Statue of Liberty
    ["<div style='150px'>" + 
      "<h3>Statue of Liberty</h3>" +
      "<img src='assets/images/statue_of_liberty.jpg' style='height: 75px; width: 75px;'>" +
      "<p>France's gift to America for building a successful republic</p>" +
      "</div>" 
    ],

      // Brooklyn Bridge
     ["<div style='150px'>" + 
      "<h3>Brooklyn Bridge</h3>" +
      "<img src='assets/images/brooklyn_bridge.jpg' style='height: 75px; width: 75px;'>" +
      "<p>The world's first steel-wire supension bridge that is still used today.</p>" +
      "</div>" 
     ],

    // The Alamo
    ["<div style='150px'>" + 
      "<h3>The Alamo</h3>" +
      "<img src='assets/images/alamo.jpg' style='height: 75px; width: 75px;'>" +
      "<p>A failed attempt to gain independence for Texas from Mexico turned into a successful multi-million dollar tourist attraction</p>" +
      "</div>" 
    ],

    // Glacier National Park
    ["<div style='150px'>" + 
      "<h3>Glacier National Park</h3>" +
      "<img src='assets/images/glacier_national_park.jpg' style='height: 75px; width: 75px;'>" +
      "<p>For millions of years glaciers have carved the lands of the park and still are today</p>" +
      "</div>" 
    ],

     // Rocky Mountain National Park
    ["<div style='150px'>" + 
      "<h3>Rocky Mountain National Park</h3>" +
      "<img src='assets/images/glacier_national_park.jpg' style='height: 75px; width: 75px;'>" +
      "<p>See some of the best landscapes that Amercica has to offer</p>" +
      "</div>" 
    ],   

     // Port of Miami
    ["<div style='150px'>" + 
      "<h3>Port of Miami</h3>" +
      "<img src='assets/images/port_of_miami.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Home to one of the busiest ports in the US</p>" +
      "</div>" 
    ],      

     // Disney's Magic Kingdom
    ["<div style='150px'>" + 
      "<h3>Disney's Magic Kingdom</h3>" +
      "<img src='assets/images/magic_kingdom.jpg' style='height: 75px; width: 75px;'>" +
      "<p>In this kingdom dreams really do come true</p>" +
      "</div>" 
    ],

     // Golden Gate Bridge
    ["<div style='150px'>" + 
      "<h3>Golden Gate Bridge</h3>" +
      "<img src='assets/images/golden_gate_bridge.jpg' style='height: 75px; width: 75px;'>" +
      "<p>When it opened in 1937 it was the longest supension bridge in the world</p>" +
      "</div>" 
    ],

     // Lake Tahoe
    ["<div style='150px'>" + 
      "<h3>Lake Tahoe</h3>" +
      "<img src='assets/images/lake_tahoe.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Voted to be America's best lake</p>" +
      "</div>" 
    ],

     // Yellowstone National Park
    ["<div style='150px'>" + 
      "<h3>Yellowstone National Park</h3>" +
      "<img src='assets/images/yellow_national_park.jpg' style='height: 75px; width: 75px;'>" +
      "<p>The country's first national park andnce you visit you'll know why it was the first to be chosen</p>" +
      "</div>" 
    ],
     // Washington Monument
    ["<div style='150px'>" + 
      "<h3>Washington Monument</h3>"+
      "<img src='assets/images/washington_monument.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Built to honor the first president.</p>" +
      "</div>" 
    ],

      // Niagra Falls
    ["<div style='150px'>" + 
      "<h3>Niagara Falls</h3>"+
      "<img src='assets/images/niagara_falls.jpg' style='height: 75px; width: 75px;'>" +
      "<p>At the border of the US and Canada three waterfalls come together.</p>" +
      "</div>" 
    ], 

      // Cloud Gate
    ["<div style='150px'>" + 
      "<h3>Cloud Gate</h3>"+
      "<img src='assets/images/cloud_gate.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Cloud Gate is a tourist attraction that reflects the skylines and the sky above Chicago.</p>" +
      "</div>" 
    ],                       

      // Milwaukee Art Museum 
    ["<div style='150px'>" + 
      "<h3>Milwaukee Art Museum</h3>"+
      "<img src='assets/images/mam.jpg' style='height: 75px; width: 75px;'>" +
      "<p>With its Quadracci Pavilion, the once hidden museum is now an international attraction.</p>" +
      "</div>" 
    ], 

      // Gateway Arch 
    ["<div style='150px'>" + 
      "<h3>Gateway Arch</h3>"+
      "<img src='assets/images/gateway_arch.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Here in St Louis, the Louisiana purchase was held kicking off the westward expansion.</p>" +
      "</div>" 
    ],

      // Monument Valley 
    ["<div style='150px'>" + 
      "<h3>Monument Valley</h3>"+
      "<img src='assets/images/monument_valley.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Director John Ford made this valley the iconic image of the west.</p>" +
      "</div>" 
    ], 

      // Great Salt Lake Desert
    ["<div style='150px'>" + 
      "<h3>Monument Valley</h3>"+
      "<img src='assets/images/monument_valley.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Here you will find the famouse Bonneville Salt Falts.</p>" +
      "</div>" 
    ],  

      // Mount Rushmore
    ["<div style='150px'>" + 
      "<h3>Mount Rushmore</h3>"+
      "<img src='assets/images/mount_rushmore.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Washington was the first, Jefferson expanded, Lincoln united, Roosevelt conserved.</p>" +
      "</div>" 
    ],

    // San Andreas Fault 
    ["<div style='150px'>" + 
      "<h3>San Andreas Fault</h3>"+
      "<img src='assets/images/san_andreas_fault.jpg' style='height: 75px; width: 75px;'>" +
      "<p>800 miles long and 10 miles deep.</p>" +
      "</div>" 
    ],

    // Las Vegas Strip 
    ["<div style='150px'>" + 
      "<h3>Las Vegas Strip</h3>"+
      "<img src='assets/images/las_vegas_strip.jpg' style='height: 75px; width: 75px;'>" +
      "<p>What happens in Vegas, stays in Vegas</p>" +
      "</div>" 
    ], 

    // Cedar Point
    ["<div style='150px'>" + 
      "<h3>Cedar Point</h3>"+
      "<img src='assets/images/cedar_point.jpg' style='height: 75px; width: 75px;'>" +
      "<p>The roller coaster capitol of the world.</p>" +
      "</div>" 
    ],


    // Space Needle
    ["<div style='150px'>" + 
      "<h3>Space Needle</h3>"+
      "<img src='assets/images/space_needle.jpg' style='height: 75px; width: 75px;'>" +
      "<p>The symbol of Seattle.</p>" +
      "</div>" 
    ], 


    // Liberty Memorial
    ["<div style='150px'>" + 
      "<h3>Liberty Memorial</h3>"+
      "<img src='assets/images/liberty_memorial.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Dedeicated to those that fell in WWI.</p>" +
      "</div>" 
    ], 

    // Stone Mountain
    ["<div style='150px'>" + 
      "<h3>Stone Mountain</h3>"+
      "<img src='assets/images/stone_mountain.jpg' style='height: 75px; width: 75px;'>" +
      "<p>A memorial to the Georgia confederates.</p>" +
      "</div>" 
    ], 

    //Andrew Jackson's Hermitage
    ["<div style='150px'>" + 
      "<h3>Andrew Jackson's Hermitage</h3>"+
      "<img src='assets/images/hermitage.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Once home to President Andrew Jackson.</p>" +
      "</div>" 
    ],    

    //Pilgrim Monument
    ["<div style='150px'>" + 
      "<h3>Pilgrim Monument</h3>"+
      "<img src='assets/images/pilgrim_monument.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Built to commerate the landing of the Pilgrims.</p>" +
      "</div>" 
    ],  

    //Hollywood
    ["<div style='150px'>" + 
      "<h3>Hollywood Sign</h3>"+
      "<img src='assets/images/hollywood.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Real estate advertisement turned cultural icon.</p>" +
      "</div>" 
    ], 


    //Four Corners Monument
    ["<div style='150px'>" + 
      "<h3>Hollywood Sign</h3>"+
      "<img src='assets/images/hollywood.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Arizona, Colorado, New Mexico, and Utah come together at this one spot.</p>" +
      "</div>" 
    ], 

    //Southern Most Point
    ["<div style='150px'>" + 
      "<h3>Souther Most Point</h3>"+
      "<img src='assets/images/southern_most_point.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Lower 48's most southern point.</p>" +
      "</div>" 
    ],  

    //Monument Rock
    ["<div style='150px'>" + 
      "<h3>Monument Rock</h3>"+
      "<img src='assets/images/monument_rock.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Kansas's famous badlands.</p>" +
      "</div>" 
    ],  

    //Mt Elbert
    ["<div style='150px'>" + 
      "<h3>Mount Elbert</h3>"+
      "<img src='assets/images/mt_elbert.jpg' style='height: 75px; width: 75px;'>" +
      "<p>Highest summit in the Rocky Mountains.</p>" +
      "</div>" 
    ],  
 
    //Hoover Dam
    ["<div style='150px'>" + 
      "<h3>Hoover Dam</h3>"+
      "<img src='assets/images/hoover_dam.jpg' style='height: 75px; width: 75px;'>" +
      "<p>When it was built, it was the largest dam in the world.</p>" +
      "</div>" 
    ] 



  ];

  //=========================================================Coordinates============================================================
//short figts 1 of 5-------------------------
var IAHtoJAXCoordinatess = [
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
   strokeColor: '#00FFFF',
   strokeOpacity: 1.0,
   strokeWeight: 2
   //map:map
});

IAHtoJAXPath,setMAP(map);

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
   strokeColor: '#00FFFF',
   strokeOpacity: 1.0,
   strokeWeight: 2
   //map:map
});

MSPtoINDPath.setMAP(map);

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
   strokeColor: '#00FFFF',
   strokeOpacity: 1.0,
   strokeWeight: 2
   //map:map
});

MSPtoSLCPath.setMAP(map);

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
   strokeColor: '#00FFFF',
   strokeOpacity: 1.0,
   strokeWeight: 2
   //map:map
});

CLTtoPHLPath.setMAP(map);

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
   strokeColor: '#00FFFF',
   strokeOpacity: 1.0,
   strokeWeight: 2
   //map:map
});

PDXtoSANPath.setMAP(map);


// // Long flights 1 of 5----------------------------------
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
   strokeColor: '#00FFFF',
   strokeOpacity: 1.0,
   strokeWeight: 2
   //map:map
});

SFOtoBSOPath.setMAP(map);


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
   strokeColor: '#00FFFF',
   strokeOpacity: 1.0,
   strokeWeight: 2
   //map:map
});

LAXtoJAXPath.setMAP(map);

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

var PDXtoHOUSPath = new google.maps.Polyline({
   path: PDXtoHOUCoordinates,
   geodesic: true,
   strokeColor: '#00FFFF',
   strokeOpacity: 1.0,
   strokeWeight: 2
   //map:map
});

PDXtoHOUPath.setMAP(map);

// Long fights 4 0f 5-----------------------------------
var SEAtoMIACoordiantes = [
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
   strokeColor: '#00FFFF',
   strokeOpacity: 1.0,
   strokeWeight: 2
   //map:map
});

SEAtoMIAPath.setMAP(map);

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
   strokeColor: '#00FFFF',
   strokeOpacity: 1.0,
   strokeWeight: 2
   //map:map
});

MSPtoMSYPath.setMAP(map);
