var map;
var infowindow;
var currentPosition;
var markers = [];
var input = [];
var searchBox;
var watchGeo=null;
var permission;
var infowindowContent;

// var image = {
//         url: '../img/dot.png'
//     }

document.addEventListener("deviceready", onDeviceReady, false);
//document.addEventListener("resume", onResume, false);
//document.addEventListener("pause", onPause, false);

$(document).ready(function(){
    console.log("ready");


    $('input[name="nearby"]').on("click", function(e) {
        console.log("nearby");
        $("input[type='nearby']").attr("checked",true).checkboxradio("refresh");
        $("input[type='top-destination']").checkboxradio("refresh");
        $("#nearby").show();
    });

    $('input[name="top-destination"]').on("click", function(e) {
        console.log("top-destination");
        $("input[type='top-destination']").attr("checked",true).checkboxradio("refresh");
        $("input[type='nearby']").checkboxradio("refresh");
    });

    $('#search-input').on('input',function(e){
        $("#nearby").hide();
    });
});


function onDeviceReady() {
    console.log("onDeviceReady");
    infowindow = new google.maps.InfoWindow();
    infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    infowindow.close();

    var permissions = cordova.plugins.permissions;

    permissions.checkPermission(permissions.ACCESS_FINE_LOCATION, function(status) {
        if (status.hasPermission) {
            console.log("hasPermission");
            // open location settings
            var locationEnable = isLocationEnabled();
            if(!locationEnable){
                console.log("onDeviceReady: location is off.");
                requestLocation();
            } else {
                console.log("onDeviceReady: location is on.");
                getCurrentLocation();
            }
        } else {
            // need to request location permission
            permissions.requestPermission(permissions.ACCESS_FINE_LOCATION, onRequestPermissionSuccess, onError);
        }
    });
}

function isLocationEnabled(){
    console.log("isLocationEnabled");
    cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
            console.log("isLocationEnabled: "+enabled);
            return enabled;
    }, onError);

}

function onRequestPermissionSuccess(status){
    console.log("onRequestPermissionSuccess");
    if (status.hasPermission) {
        var locationEnable = isLocationEnabled();
        if(!locationEnable){
            console.log("onRequestPermissionSuccess: location is off.");
            requestLocation();
        } else {
            console.log("onRequestPermissionSuccess: location is on.");
            getCurrentLocation();
        }
    } else {
        alert("This app needs permission!.");
        navigator.app.exitApp();
    }
}

function requestLocation(){
    console.log("requestLocation");
    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        if(canRequest){
            cordova.plugins.locationAccuracy.request(function (success){
                getCurrentLocation();
            }, function (error){
                console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
                if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                    if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                        cordova.plugins.diagnostic.switchToLocationSettings();
                        enableLocation();
                    }
                }
            }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
        }else{
            navigator.app.exitApp();
        }
    });
}

function enableLocation(){
    console.log("enableLocation");
    cordova.plugins.diagnostic.registerLocationStateChangeHandler(function(state){
        if(state !== cordova.plugins.diagnostic.locationMode.LOCATION_OFF){
            getCurrentLocation();
        }
    });
}

function getCurrentLocation(){
    console.log("getCurrentLocation");
    if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

}

function onSuccess(position){
    initializeMap(position.coords.latitude, position.coords.longitude);
}

function onError(error){
    alert("Error message: " + error.message);
}

function initializeMap(lat, lon){
    console.log("initMap()");

    currentPosition = new google.maps.LatLng(lat, lon);
    var mapOptions = {
        center: currentPosition,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    markers = new google.maps.Marker({
        position: currentPosition,
        // icon: image,
        map: map,
        anchorPoint: new google.maps.Point(0, -29),
        title: 'my location'
    });

    input = document.getElementById('search-input');
//    searchBox = new google.maps.places.SearchBox(input);
    searchBox = new google.maps.places.Autocomplete(input);
    searchBox.bindTo('bounds', map);
    searchBox.setFields(['address_components', 'geometry', 'icon', 'name']);
    searchBox.setTypes([]);
    searchBox.setOptions({strictBounds: true});

    searchBox.addListener('place_changed', function(){
        console.log("searchBox_listener");
        searchMap();
    });
}

function searchMap() {
    console.log("searchMap()");

    markers = [];
        // Clear out the old markers.
    markers.forEach(function(marker) {
        marker.setMap(null);
    });

    markers = [];
    markers = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });


//    markers.serVisible(false);
    var places = searchBox.getPlace();
    if(!places.geometry){
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }

    if(places.geometry.viewport){
        map.fitBounds(places.geometry.viewport);
    } else {
        map.setCenter(places.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
    }
    markers.setPosition(places.geometry.location);

    var address = '';
    if (places.address_components) {
        address = [
            (places.address_components[0] && places.address_components[0].short_name || ''),
            (places.address_components[1] && places.address_components[1].short_name || ''),
            (places.address_components[2] && places.address_components[2].short_name || '')
        ].join(' ');
    }

    infowindowContent.children['place-icon'].src = places.icon;
    infowindowContent.children['place-name'].textContent = places.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, markers);
}

function getNearbyPlaces(placeType){
    console.log("getNearbyPlaces(): "+ placeType);
    map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: currentPosition,
    zoom: 15
    });
    var request = {
        location: currentPosition,
        radius: 300,
        types: [placeType]
    }
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, foundNearby);
}

function foundNearby(results, status){
    if(status == google.maps.places.PlacesServiceStatus.OK){
        for(var i = 0; i < results.length; i++){
            putMarker(results[i]);
        }
    }
}

function putMarker(place){
    var placeLoc = place.geometry.location;

//    var photos = place.photos;
//      if (!photos) {
//        return;
//      }

    markers = [];
    markers.forEach(function(marker) {
        marker.setMap(null);
     });
    markers = [];

//    var image = {
//        url: place.icon,
//        size: new google.maps.Size(71, 71),
//        origin: new google.maps.Point(0, 0),
//        anchor: new google.maps.Point(17, 34),
//        scaledSize: new google.maps.Size(25, 25)
//    };
    markers = new google.maps.Marker({
        map: map,
//        icon: image,
        title: place.name,
        position: place.geometry.location,
//        icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
    });

    google.maps.event.addListener(markers, 'click', function() {
    var address = '';
    if (place.address_components) {
        address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
    }
    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, this);
    });
}

function nearbyRestaurant(){
    console.log("nearbyRestaurant");
    $("#nearby").hide();
//    document.getElementById("search-input").value = "Restaurants";
    getNearbyPlaces("restaurant");
}

function nearbyHotel(){
    console.log("nearbyHotel");
    $("#nearby").hide();
//    document.getElementById("search-input").value = "Hotels";
    getNearbyPlaces("lodging");
}

function nearbyBar(){
    console.log("nearbyBar");
    $("#nearby").hide();
//    document.getElementById("search-input").value = "Bars and pubs";
    getNearbyPlaces("bar");
}

function onResume(){
    console.log("onResume");
    watchPosition()
}

function onPause(){
    console.log("onPause");
    navigator.geolocation.clearWatch(watchGeo);
}

function watchPosition(){
    watchGeo = navigator.geolocation.watchPosition(onWatchSuccess, onWatchError, {timeout: 1000, enableHighAccuracy: true});
}

function onWatchSuccess(position){
    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != latitude && updatedLongitude != longitude) {
        latitude = updatedLatitude;
        longitude = updatedLongitude;
        currentPosition = new google.maps.LatLng(latitude, longitude);
    }
}

function onWatchError(error) {
    console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}



