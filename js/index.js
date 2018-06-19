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
          "url": "Bohdanivka.html",
            "icon_url": "https://raw.githubusercontent.com/sandro-tyron/post_offices/master/images_2/Bohdanivka/IMG_7282.jpg",
            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [36.045025, 47.105638 ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "name": "Відділення поштового зв'язку Жидачів Центру поштового зв'язку №4  ",
            "city": "Жидачів",
          "url": "Zhydachiv.html",
            "icon_url": "https://raw.githubusercontent.com/sandro-tyron/post_offices/master/images_2/Zhydachiv/IMG_6468.jpg",
            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [24.136284, 49.388087]
        }
    },  {
        "type": "Feature",
        "properties": {
            "name": "Відділення поштового зв’язку Маріуполь 55 Центру поштового зв'язку № 5 ",
            "city": "Маріуполь",
          "url": "Mariupol.html",
            "icon_url": "https://raw.githubusercontent.com/sandro-tyron/post_offices/master/images_2/Mariupol/IMG_6920.jpg",
            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [37.538690, 47.098015]
        }
    },
 
    {
        "type": "Feature",
        "properties": {
            "name": "Міське відділення поштового зв’язку №2 Центру поштового зв'язку № 7 м. Токмак",
            "city": "Чернігівка",
          "url": "Chernihivka.html",
            "icon_url": "https://raw.githubusercontent.com/sandro-tyron/post_offices/master/images_2/Chernihivka/-IMG_7375.jpg",
            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [36.219728, 47.191164]
        }
    },
   
    {
        "type": "Feature",
        "properties": {
            "name": "Відділення поштового зв'язку № 6 м. Тернопіль ",
            "city": "Тернопіль ",
          "url": "Ternopil.html",
            "icon_url": "https://raw.githubusercontent.com/sandro-tyron/post_offices/master/images_2/Ternopil/IMG_1106.JPG",

            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [25.601085, 49.545188]
        }

    },
    
    {
        "type": "Feature",
        "properties": {
            "name": "Відділення поштового зв'язку № 1 м. Львів ",
            "city": "Львів ",
          "url": "Lviv.html",
            "icon_url": "https://raw.githubusercontent.com/sandro-tyron/post_offices/master/images_2/Ternopil/IMG_1106.JPG",

            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [24.041070, 49.816494]
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
