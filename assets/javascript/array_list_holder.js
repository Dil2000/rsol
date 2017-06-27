
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
