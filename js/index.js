// setting the initial map coordinates - Lat, Lng, zoom
var mymap = L.map('mapid', {
    center: [49.0139, 31.2858],
    zoom: 6,
    minZoom: 3,
    maxZoom: 20
});

var mapStyle = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
     maxZoom: 20,
    minZoom: 3,
}).addTo(mymap);

//Adding city names - feature for the tiles which are lacking of lables
mymap.createPane('labels');
var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
    pane: 'labels'
}).addTo(mymap);

//Styles of geomarkers
var customStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.5
};

// To attach popup content to each geomarker
function onEachFeature(feature, layer) {
    // does this feature have a property named name?
    if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name + "<br/>" + feature.properties.city + "<br/>" + "<img src=" + feature.properties.icon_url + " width=80 height=80/>");
    }
}
//TODO - move data to external geojson
var postals = [{
        "type": "Feature",
        "properties": {
            "name": "Відділення поштового зв’язку Богданівка Центру поштового зв'язку № 7",
            "city": "Богданівка",
          "url": "https://gis.stackexchange.com/questions/31951/how-to-show-a-popup-on-mouse-over-not-on-click",
            "icon_url": "https://securecdn.pymnts.com/wp-content/uploads/2017/11/bahamas-post-office-einvoice.jpg",
            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [36.045025, 47.105638 ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "name": " ",
            "city": " ",
          "url": "https://gis.stackexchange.com/questions/31951/how-to-show-a-popup-on-mouse-over-not-on-click",
            "icon_url": "https://securecdn.pymnts.com/wp-content/uploads/2017/11/bahamas-post-office-einvoice.jpg",
            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [30.523400, 50.450100]
        }
    },  {
        "type": "Feature",
        "properties": {
            "name": " ",
            "city": " ",
          "url": "https://gis.stackexchange.com/questions/31951/how-to-show-a-popup-on-mouse-over-not-on-click",
            "icon_url": "https://securecdn.pymnts.com/wp-content/uploads/2017/11/bahamas-post-office-einvoice.jpg",
            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [24.029717, 49.839683]
        }
    },
 
    {
        "type": "Feature",
        "properties": {
            "name": " ",
            "city": " ",
          "url": "https://gis.stackexchange.com/questions/31951/how-to-show-a-popup-on-mouse-over-not-on-click",
            "icon_url": "https://securecdn.pymnts.com/wp-content/uploads/2017/11/bahamas-post-office-einvoice.jpg",
            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [28.658667, 50.254650]
        }
    },
   
    {
        "type": "Feature",
        "properties": {
            "name": " ",
            "city": " ",
          "url": "https://gis.stackexchange.com/questions/31951/how-to-show-a-popup-on-mouse-over-not-on-click",
            "icon_url": "https://securecdn.pymnts.com/wp-content/uploads/2017/11/bahamas-post-office-einvoice.jpg",

            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [28.468217, 49.233083]
        }

    }
];

//Geomarker styles for custom icon
var postalIcon = L.icon({
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/map-markers-1/512/mail_office-512.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var postalsMap = new L.markerClusterGroup({
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true
});
mymap.addLayer(postalsMap);

L.geoJSON(postals, {
style: customStyle,
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: postalIcon}).on('mouseover', onMouseover).on('mouseout', onMouseout).on('click', markerOnClick);
    }
}).addTo(mymap);
mymap.clearLayers();
//Open and close marker popup on mouse hover
function onMouseover(e) {
 this.openPopup();
}
function onMouseout(e) {
            this.closePopup();
}
//To load new web page on click. TODO: CHANGE TO OPEN RELATIVE URLS
function markerOnClick(e) {
  location.href = this.feature.properties.url;
}

function minimizeInfo(div1) {
    var getInfo = document.getElementsByClassName(div1)
    for (var i = 0; i < getInfo.length; i++) {
        getInfo[i].classList.remove('minimize')
    }
    div1.classList.add('minimize');
}
