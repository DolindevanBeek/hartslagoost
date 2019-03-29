$(document).ready(function () {

  mapboxgl.accessToken = 'pk.eyJ1IjoibW9uaWNhYm9idSIsImEiOiJjam90eWp0cWcwZGx6M3BveDJ3YTJlOHUxIn0.PjXhm5IDWOZyPcuICvaClw';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/monicabobu/cjp8bbcls04mn2rqpy0mh3gn7',
    //style: './style.json',
    center: [5.190611, 52.227386],
    zoom: 15.0,
    pitch: 50,
    bearing: 65,
    minzoom: 15.0,
    maxBounds: [
      [5.174935, 52.209490], // Southwest coordinates
      [5.199709, 52.236554] // Northeast coordinates
    ],
  });

  var lineCoordinates = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [5.181195, 52.226616], //Station POI
          [5.182931, 52.227026], //kleine drift
          [5.182037, 52.227472], //Larenseweg
          [5.183618, 52.227629], //Larenseweg
          [5.183932, 52.227849], //Larenseweg
          [5.184225, 52.227701], //Eemnesserweg
          [5.185236, 52.228080], //Galvanistraat
          [5.185614, 52.227671], //Galvanistraat
          [5.188742, 52.228376], //Edisonplein POI
          [5.188254, 52.228219], //Morsestraat
          [5.188020, 52.228729], //Morsestraat
          [5.187504, 52.229082], //Eemnesserweg
          [5.189232, 52.229739], //Eemnesserweg
          [5.189103, 52.230008], //Amperestraat
          [5.187118, 52.230771], //Larenseweg
          [5.190127, 52.232878], //Rotonde
          [5.190783, 52.232332], //Jan vd heijdenstr
          [5.191177, 52.230814], //Jan vd heijdenstr
          [5.192515, 52.228855], //Jan vd heijdenstr
          [5.192961, 52.227687], //Jan vd heijdenstr
          [5.192812, 52.223430], //Jan vd heijdenstr
          [5.193960, 52.222070], //Liebergerweg
          [5.198206, 52.221623], //Liebergerweg
          [5.198756, 52.223331], //Adelaarstraat
          [5.198358, 52.223360], //Ooievaarplein
        ],
        "type": "LineString"
      }
    }]
  };

  map.on("zoom", function (whatever) {
    var currentZoom = map.getZoom();
  });

  map.on('load', function () {

    // Add 3d buildings layer

    //var layers = map.getStyle().layers;
    // var labelLayerId;

    // for (var i = 0; i < layers.length; i++) {
    //   if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
    //     labelLayerId = layers[i].id;
    //     break;
    //   }
    // }


    // map.addLayer({
    //   'id': '3d-buildings',
    //   'source': 'composite',
    //   'source-layer': 'building',
    //   'filter': ['==', 'extrude', 'true'],
    //   'type': 'fill-extrusion',
    //   'minzoom': 15.345090211134252,
    //   'paint': {
    //     'fill-extrusion-color': '#aaa',
    //     // use an 'interpolate' expression to add a smooth transition effect to the
    //     // buildings as the user zooms in
    //     'fill-extrusion-height': [
    //       "interpolate", ["linear"], ["zoom"],
    //       15, 0,
    //       15.05, ["get", "height"]
    //     ],
    //     'fill-extrusion-base': [
    //       "interpolate", ["linear"], ["zoom"],
    //       15, 0,
    //       15.05, ["get", "min_height"]
    //     ],
    //     'fill-extrusion-opacity': .6
    //   }
    // }, labelLayerId);

    //map.addLayer(highlightLayer, 'building');

    // Add Trail line

    map.addSource('line', {
      type: 'geojson',
      lineMetrics: true,
      data: lineCoordinates
    });

    map.addLayer({
      type: 'line',
      source: 'line',
      id: 'trail',
      paint: {
        'line-color': 'red',
        'line-width': 10,
        'line-gradient': [
          'interpolate',
          ['linear'],
          ['line-progress'],
          0, "#FDC830",
          //0.25, "#8A55D5",
          //0.5, "#9B68D2",
          //0.75, "#BB8DCD",
          1, "#F37335",
        ]
      },
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      }
    });

    // Add Trees

    map.loadImage('https://dolindevanbeek.github.io/hartslagoost/photos/tree.png', function (error, image) {
      if (error) throw error;
      map.addImage('tree', image);

    });

    map.addLayer({
      "id": "trees",
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": "https://dolindevanbeek.github.io/hartslagoost/trees.geojson"
      },
      "layout": {
        "icon-image": "tree",
        "icon-size": 0.25
      }
    });

    // Create POI markers

    var markers = [
      { "name": "Edisonplein", "location": { "lng": 5.189023, "lat": 52.228369 }, "image": "./photos/edisonplein.jpg", "extrainfo": "" },
      { "name": "Korte Noordweg Industrie", "location": { "lng": 5.180891, "lat": 52.228881 }, "image": "./photos/kortenoorderweg.jpg", "extrainfo": "" },
      { "name": "Café Dudok", "location": { "lng": 5.182192, "lat": 52.227598 }, "image": "./photos/dudok.jpg", "extrainfo": "Larenseweg 1A" },
      { "name": "Bakkerstraat", "location": { "lng": 5.187123, "lat": 52.227376 }, "image": "./photos/bakkersstraat.jpg", "extrainfo": "" },
      { "name": "Zwembad de Lieberg", "location": { "lng": 5.192529, "lat": 52.226917 }, "image": "./photos/lieberg.jpg", "extrainfo": "Jan van der Heijdenstraat" },
      { "name": "Sint Joseph Kerk", "location": { "lng": 5.190222, "lat": 52.224928 }, "image": "./photos/sintjoseph.jpg", "extrainfo": "Pelikaanstraat 84" },
      { "name": "Buurthuis de Geus", "location": { "lng": 5.183732, "lat": 52.229374 }, "image": "./photos/degeus.jpg", "extrainfo": "Geuzenweg" },
      { "name": "'t Perronnetje", "location": { "lng": 5.189713, "lat": 52.225977 }, "image": "./photos/perronnetje.jpg", "extrainfo": "Kleine Drift 71" },
      { "name": "Café Noord", "location": { "lng": 5.188839, "lat": 52.233862 }, "image": "./photos/cafenoord.jpg", "extrainfo": "Jan Van Der Heijdenstraat 9" },
      { "name": "Café 't Hoekje", "location": { "lng": 5.18242, "lat": 52.230818 }, "image": "./photos/hoekje.jpg", "extrainfo": "Hoge Larenseweg 60" },
      { "name": "De Seinhorst", "location": { "lng": 5.191081, "lat": 52.231504 }, "image": "./photos/seinhorst.jpg", "extrainfo": "Jan van der Heijdenstraat" },
      { "name": "Kleine Spoorbomen", "location": { "lng": 5.183702, "lat": 52.224977 }, "image": "./photos/kleinespoorbomen.jpg", "extrainfo": "Zuiderweg" },
      { "name": "Oosterspoorplein", "location": { "lng": 5.182452, "lat": 52.227305 }, "image": "./photos/oosterspoorplein.jpg", "extrainfo": "" },
      { "name": "Villa Industria", "location": { "lng": 5.189648, "lat": 52.231815 }, "image": "./photos/villaindustria.jpg", "extrainfo": "Jan van der Heijdenstraat 36" },
    ];

    var mapMarkers = [];

    for (var i = 0; i < markers.length; i++) {
      var el = document.createElement('div');
      var name = markers[i]["name"];
      var addChildren = '<div class="image" style="background-image:url(' + markers[i]["image"] + ');"></div>' + '<div class="triangle"></div><div class="name">' + name + '</div>';
      el.insertAdjacentHTML('beforeend', addChildren);

      el.classList.add("marker", "poimarker", markers[i]["name"].replace(/\s/g, ""));
      el.addEventListener('click', function () {
        alert("hi")
      });

      var marker = new mapboxgl.Marker(el);
      mapMarkers.push(marker);
      marker.setLngLat(markers[i]["location"]).addTo(map);
    }

    // Create future later


    var futureMarkers = [
      { "name": "Sigarenfabriek", "location": { "lng": 5.187067, "lat": 52.230409 }, "image": "./photos/edisonplein.jpg", "extrainfo": "" },
      { "name": "Wybertjesfabriek", "location": { "lng": 5.186756, "lat": 52.23063 }, "image": "./photos/kortenoorderweg.jpg", "extrainfo": "" },
      { "name": "Lijsterweg Zuiderweg", "location": { "lng": 5.185964, "lat": 52.223059 }, "image": "./photos/dudok.jpg", "extrainfo": "Larenseweg 1A" },
      { "name": "Larenseweg 18", "location": { "lng": 5.183147, "lat": 52.227503 }, "image": "./photos/bakkersstraat.jpg", "extrainfo": "" },
      { "name": "Larenseweg 139", "location": { "lng": 5.18749, "lat": 52.231653 }, "image": "./photos/lieberg.jpg", "extrainfo": "Jan van der Heijdenstraat" },
      { "name": "Theater Achteron", "location": { "lng": 5.185698, "lat": 52.228416 }, "image": "./photos/sintjoseph.jpg", "extrainfo": "Pelikaanstraat 84" },
      { "name": "Noorderweg 46", "location": { "lng": 5.179564, "lat": 52.229316 }, "image": "./photos/degeus.jpg", "extrainfo": "Geuzenweg" },
      { "name": "Hunkemöller", "location": { "lng": 5.189302, "lat": 52.221826 }, "image": "./photos/perronnetje.jpg", "extrainfo": "Kleine Drift 71" },
      { "name": "Veneta Park", "location": { "lng": 5.19391, "lat": 52.220533 }, "image": "./photos/cafenoord.jpg", "extrainfo": "Jan Van Der Heijdenstraat 9" },
      { "name": "Kleine Sigarenfabriek", "location": { "lng": 5.186456, "lat": 52.223388 }, "image": "./photos/hoekje.jpg", "extrainfo": "Hoge Larenseweg 60" },
      { "name": "Werklocatie Korte Noorderweg", "location": { "lng": 5.180624, "lat": 52.22867 }, "image": "./photos/seinhorst.jpg", "extrainfo": "Jan van der Heijdenstraat" },
      { "name": "Busremise", "location": { "lng": 5.185125, "lat": 52.229081 }, "image": "./photos/kleinespoorbomen.jpg", "extrainfo": "Zuiderweg" },
    ];

    var futureMapMarkers = [];

    for (var i = 0; i < futureMarkers.length; i++) {
      var el = document.createElement('div');
      var futurename = futureMarkers[i]["name"];
      var addChildren = '<div class="dot"></div><div class="name">' + futurename + '</div>';
      el.insertAdjacentHTML('beforeend', addChildren);

      el.classList.add("futuremarker", "hidden", futureMarkers[i]["name"].replace(/\s/g, ""));

      var futureMarker = new mapboxgl.Marker(el);
      futureMapMarkers.push(marker);
      futureMarker.setLngLat(futureMarkers[i]["location"]).addTo(map);
    }


    // Create history layer

    var historyMarkers = [
      { "name": "Oude station", "location": { "lng": 5.181798, "lat": 52.226777 }, "image": "./photos/edisonplein.jpg", "extrainfo": "" },
      { "name": "t perronnetje", "location": { "lng": 5.189712, "lat": 52.225912 }, "image": "./photos/edisonplein.jpg", "extrainfo": "" },
      { "name": "Free Parking", "location": { "lng": 5.191305, "lat": 52.231993 }, "image": "./photos/edisonplein.jpg", "extrainfo": "" },
      { "name": "Stationsbrug", "location": { "lng": 5.181951, "lat": 52.226425 }, "image": "./photos/edisonplein.jpg", "extrainfo": "" },
    ];

    var historyMapMarkers = [];

    for (var i = 0; i < historyMarkers.length; i++) {
      var historyMarker = document.createElement('div');
      var historyName = historyMarkers[i]["name"];
      var historyAddChildren = '<div class="image" style="background-image:url(' + markers[i]["image"] + ');"></div>' + '<div class="triangle"></div><div class="name">' + historyName + '</div>';
      historyMarker.insertAdjacentHTML('beforeend', historyAddChildren);

      historyMarker.classList.add("marker", "historymarker", "hidden", historyMarkers[i]["name"].replace(/\s/g, ""));
      historyMarker.addEventListener('click', function () {
        var sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("open");
      });

      var historyMarker = new mapboxgl.Marker(historyMarker);
      historyMapMarkers.push(historyMarker);
      historyMarker.setLngLat(historyMarkers[i]["location"]).addTo(map);
    }

    // Create trail

    var trailMarkers = [
      { "name": "Station", "location": { "lng": 5.181195, "lat": 52.226616 } },
      { "name": "Oosterspoorplein", "location": { "lng": 5.182452, "lat": 52.227305 } },
      { "name": "Edisonplein", "location": { "lng": 5.188742, "lat": 52.228376 } },
      { "name": "Villa Industria", "location": { "lng": 5.188860, "lat": 52.232017 } },
      { "name": "Liebergerweg", "location": { "lng": 5.198206, "lat": 52.221623 } },
      { "name": "Ooievaarsplein", "location": { "lng": 5.198358, "lat": 52.223360 } },
    ];

    var trailMapMarkers = [];

    for (var i = 0; i < trailMarkers.length; i++) {
      var trailMarker = document.createElement('div');
      trailMarker.classList.add("trailmarker", trailMarkers[i]["name"].replace(/\s/g, ""));
      trailMarker.addEventListener('click', function () {
        var sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("open");
      });

      var trailMarker = new mapboxgl.Marker(trailMarker);
      trailMapMarkers.push(trailMarker);
      trailMarker.setLngLat(trailMarkers[i]["location"]).addTo(map);
    }

    // set the trail layout property to invisible so we can check it in the hidemaplayer function
    map.setLayoutProperty('trail', 'visibility', 'none');

  });


/** START TUIO **/


  var TuioCanvas = {
    init: function () {
      this.Main.init();
    }
  };

  TuioCanvas.Main = (function () {
    var client = null,
      screenW = null,
      screenH = null,
      time = null,
      canvas = null,
      context = null,
      objSize = 50,

      init = function () {
        screenW = $(window).innerWidth();
        screenH = $(window).innerHeight();

        initClient();
      },

      initClient = function () {
        client = new Tuio.Client({
          host: "http://localhost:5000"
        });
        client.on("connect", onConnect);
        client.on("addTuioObject", onAddTuioObject);
        client.on("removeTuioObject", onRemoveTuioObject);
        client.connect();
      },

      onConnect = function () {
        console.log("onConnect");
        logObject();
      },

      logObject = function () {
        // functions are fun
      },

      onAddTuioObject = function (addObject) {

        console.log("yay added ");
        var historyMarkers = document.getElementsByClassName('historymarker');
        var futureMarkers = document.getElementsByClassName('futuremarker');

        if (addObject.symbolId == 2) {
          hideMapLayer(map, "trail");
        }

        if (addObject.symbolId == 3) {
          console.log("added number 3");
          hideHTMLLayer(historyMarkers);
        }

        if (addObject.symbolId == 1) {
          console.log("added number 1");
          hideHTMLLayer(futureMarkers);
        }
      }

    onRemoveTuioObject = function (removeObject) {

      console.log("yay removed ");
      var historyMarkers = document.getElementsByClassName('historymarker');
      var futureMarkers = document.getElementsByClassName('futuremarker');

      if (removeObject.symbolId == 2) {
        hideMapLayer(map, "trail");
      }

      if(removeObject.symbolId == 3) {
        console.log("removed number 3");
        hideHTMLLayer(historyMarkers);
      }

      if (removeObject.symbolId == 1) {
        console.log("removed number 1");
        hideHTMLLayer(futureMarkers);
      }


    }

    return {
      init: init
    };
  }());

  $(function () {
    TuioCanvas.init();
  });

  /*** menu functions  ***/

  $("#showtrail").click(function () {
    hideMapLayer(map, "trail");
    console.log("clicked showtrail");
  });

  $("#showhistory").click(function () {
    var historyMarkers = document.getElementsByClassName('historymarker');

    hideHTMLLayer(historyMarkers);
    console.log("clicked showhistory");
  });

  $("#showfuture").click(function () {
    var futureMarkers = document.getElementsByClassName('futuremarker');

    hideHTMLLayer(futureMarkers);
    console.log("clicked showfuture");
  });

});

/*** EXTERNAL FUNCTIONS ***/

function hideHTMLLayer(htmlElements) {

  var poiMarkers = document.getElementsByClassName('poimarker');

  for (var i = 0; i < poiMarkers.length; i++) {

    if (poiMarkers[i].classList.contains("hidden")) {

      poiMarkers[i].classList.remove("hidden");
    }

    else {
      poiMarkers[i].classList.add("hidden");
    }
  };

  for (var i = 0; i < htmlElements.length; i++) {

    if (htmlElements[i].classList.contains("hidden")) {

      htmlElements[i].classList.remove("hidden");
    }

    else {
      htmlElements[i].classList.add("hidden");
    }
  }
}

function hideMapLayer(map, clickedLayer) {

  var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
  var trailMarkers = document.getElementsByClassName('trailmarker');
  var poiMarkers = document.getElementsByClassName('poimarker');

  if (clickedLayer === "trail" && visibility === 'visible') {
    map.setLayoutProperty(clickedLayer, 'visibility', 'none');
    this.className = '';

    for (var i = 0; i < trailMarkers.length; i++) {
      trailMarkers[i].classList.remove("show");
    }

    for (var i = 0; i < poiMarkers.length; i++) {
      poiMarkers[i].classList.remove("hidden");
    }

  }

  else {
    this.className = 'active';
    map.setLayoutProperty(clickedLayer, 'visibility', 'visible');

    for (var i = 0; i < trailMarkers.length; i++) {
      trailMarkers[i].classList.add("show");
    }

    for (var i = 0; i < poiMarkers.length; i++) {
      poiMarkers[i].classList.add("hidden");
    }
  }
}