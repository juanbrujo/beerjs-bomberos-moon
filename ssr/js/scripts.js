/*=============================
  Primary Application Code
=============================*/

var Moon  = require("moonjs");
var axios = require("axios");
// var GMaps = require("gmaps");
var api   = "https://bomberos-cl-api.herokuapp.com/bomberos";


var app = new Moon({
  el: "#app",
  data: {
    name: "",
    bomberos: []
  },
  methods: {
    createMap() {}
  },
  hooks: {
    mounted: function() {
      // get data
      axios.get(api)
        .then(response => {
          var that = this;
          that.set("bomberos", response.data);

          // set map

          // var map = new GMaps({
          //   el: '#mapa',
          //   lat: -34.977985,
          //   lng: -71.25288,
          //   zoom: 4
          // });

          var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(-34.977985, -71.25288),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }

          var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

          var infowindow = new google.maps.InfoWindow();
          var marker,
              i,
              cantBomberos = that.get('bomberos').length
              bomba = that.get('bomberos');

    console.log("cantBomberos: " + cantBomberos);

          bomba.map(function(value, index){
            //console.log(value)
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(value.latitude, value.longitud),
              map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(value.name +  '\n' + value.address +  '\n' + value.phone  +  '\n' + value.city);
                infowindow.open(map, marker);
              }
            })(marker, i));
          });

/*
          var marker = new google.maps.Marker();
          var infowindow = new google.maps.InfoWindow();
          var locations = that.get('bomberos');
          locations.map(function(value, index){
            map.addMarker({
              lat: value.latitude,
              lng: value.longitud,
              click: function(e) {
                infowindow.open(map, marker);
              }
            });
          })
*/
          /*
          locations.forEach(function(index, value) {
            console.log('value: ' + value)
            mymap.addMarker({
              lat: value.lat,
              lng: value.lng,
              title: value.city,
              click: function(e) {
                alert('This is '+value.city+', gujarat from India.');
              }
            });
         });
         */

      })
        .catch(e => {
          this.errors.push(e)
      });

      // set map

      /*
      var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(-34.977985, -71.25288),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
*/
      // var infowindow = new google.maps.InfoWindow({
      //   content: '<div id="content">'+
      //       '<h1 id="firstHeading" class="firstHeading">Curicó</h1>'+
      //       '<div id="bodyContent"><p>Curicó, Chile. Región del Maule.</p></div>'+
      //       '</div>'
      // });
      //var marker = new google.maps.Marker({
      //  position: mapOptions.center,
      //  map: map
      //})
      //marker.addListener('click', function() {
      //  infowindow.open(map, marker);
      //});

/*
      var infowindow = new google.maps.InfoWindow();
      var marker,
          i,
          cantBomberos = this.get('bomberos').length;

console.log(this.get('bomberos'))

      for (i = 0; i < cantBomberos; i++) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(bomberos[i][1], bomberos[i][2]),
          map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(bomberos[i][0], bomberos[i][6]);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }
*/

    }
  }
});
