// Define configuración inicial de la cartografía
var mapCenter = [43.3227, -1.9835]; // lat, lon
var mapZoom = 14; // valores entre 1-19. Según la base cartográfica puede variar el rango

// Define contenedor para el mapa
var map;

// Define bases cartográfica
// 1. Mapbox
var mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
var mapboxAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
var mapboxBase = L.tileLayer(mapboxUrl, {
	attribution: mapboxAttr,
	maxZoom: 18,
	id: 'skotperez.nkgo660p',
	accessToken: 'pk.eyJ1Ijoic2tvdHBlcmV6IiwiYSI6ImNpZmVjMWd1bTAwZnp1Y2tuenhncHlvNHMifQ.yHojMKQz04-JIz6N4HyjyA'
});
var satelliteBase = L.tileLayer(mapboxUrl, {
	attribution: mapboxAttr,
	maxZoom: 18,
	id: 'skotperez.nnf00875',
	accessToken: 'pk.eyJ1Ijoic2tvdHBlcmV6IiwiYSI6ImNpZmVjMWd1bTAwZnp1Y2tuenhncHlvNHMifQ.yHojMKQz04-JIz6N4HyjyA'
});
// 2. OpenStreetMap
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttr = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osmBase = new L.tileLayer(osmUrl, {
	attribution: osmAttr,
	minZoom: 1,
	maxZoom: 18,
});

// Define función para cargar el mapa
function mapInit() {
	map = new L.map('map', {
		center: mapCenter,
		zoom: mapZoom,
		layers: [osmBase] // capas a mostrar inicialmente en el mapa
	});
}

// Define función para añadir menú para elegir la base cartográfica a mostrar
function baseMapSwitcher() {
	var baseMaps = {
		"OpenStreetMap": osmBase,
		"Mapbox": mapboxBase,
		"Mapbox Satélite": satelliteBase
	};
	L.control.layers(baseMaps).addTo(map);
}

// Define función para añadir el buscador al mapa
function mapSearch() {
	new L.Control.GeoSearch({
		provider: new L.GeoSearch.Provider.OpenStreetMap(),
		position: 'topcenter',
		showMarker: false,
		retainZoomLevel: false
	}).addTo(map);
}

// Cuando la página (document) haya cargado...
$(document).ready(function() {

	// ...muestra el mapa
	mapInit();

	// ...añade menú de bases cartográficas
	baseMapSwitcher();

	// ...añade buscador
	mapSearch();

	// ...añade trazas en formato GPX
	omnivore.gpx('data/20160317-174533.gpx').addTo(map);
	omnivore.gpx('data/20160317-182653.gpx').addTo(map);

});
