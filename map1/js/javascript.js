let map = L.map('map').setView([58.373523, 26.716045], 12);

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'OpenStreetMap contributors'
});

osm.addTo(map);


function popUpInfo(feature, layer) {
    layer.bindPopup(feature.properties.NIMI);
}

function createCircle(feature, latlng) {
    let options = {
        radius: 5,
        fillColor: 'red',
        fillOpacity: 0.5,
        color: 'red',
        weight: 1,
        opacity: 1
    };

    return L.circleMarker(latlng, options);
}

async function addCelltowersGeoJson(url) {
    const response = await fetch(url);
    const data = await response.json();

    const markers = L.geoJson(data);

    const clusters = L.markerClusterGroup();
    clusters.addLayer(markers);
    clusters.addTo(map);
}

function getColor(property) {
    switch (property) {
        case 1: return '#ff0000';
        case 13: return '#009933';
        case 6: return '#0000ff';
        case 7: return '#ff0066';
        default: return '#ffffff';
    }
}

function polygonStyle(feature) {
    return {
        fillColor: getColor(feature.properties.OBJECTID),
        fillOpacity: 0.5,
        weight: 1,
        opacity: 1,
        color: 'grey'
    };
}

async function addDistrictsGeoJson(url) {
    const response = await fetch(url);
    const data = await response.json();

    const polygons = L.geoJson(data, {
    onEachFeature: popUpInfo,
    style: polygonStyle
});

    polygons.addTo(map);
}

function defaultMapSettings() {
    map.setView([58.373523, 26.716045], 12);
}

addDistrictsGeoJson('geojson/tartu_city_districts_edu.geojson');
addCelltowersGeoJson('geojson/tartu_city_celltowers_edu.geojson');