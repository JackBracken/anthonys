var map;
var marker;
var pos = new google.maps.LatLng(52.250039, -6.341374);

function initialize() {
  var mapOptions = { zoom: 15, center: pos, mapTypeId: google.maps.MapTypeId.ROADMAP };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  marker = new google.maps.Marker({
    map:map,
    draggable:true,
    animation: google.maps.Animation.DROP,
    position: pos
  });
  google.maps.event.addListener(marker, 'click', toggleBounce);
}

function toggleBounce() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
google.maps.event.addDomListener(window, 'load', initialize);