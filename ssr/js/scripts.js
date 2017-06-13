/*=============================
  Primary Application Code
=============================*/

var Moon  = require("moonjs");
var axios = require("axios");
var api   = "https://bomberos-cl-api.herokuapp.com/bomberos";


var app = new Moon({
  el: "#app",
  data: {
    name: "",
    bomberos: [],
    errors: []
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
          var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(-34.977985, -71.25288),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          }

          var map = new google.maps.Map(document.getElementById("mapa"), mapOptions),
              infowindow = new google.maps.InfoWindow(),
              bomba = that.get('bomberos'),
              marker,
              i;

          google.maps.event.addListener(map, 'click', function() {
            infowindow.close();
          }); 

          bomba.map(function(value, index){

            marker = new google.maps.Marker({
              position: new google.maps.LatLng(value.latitude, value.longitud),
              map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent('<div id="balloon">'+
                '<p><b>' + value.name + '</b></p>'+
                '<p>Dirección: ' + value.address + '</p>'+
                '<p>Fono: <a href="tel:' + value.phone + '">' + value.phone + '</a></p>'+
                '<p>Comuna: ' + value.city + '</p>'+
                '</div>');
                infowindow.open(map, marker);
              }
            })(marker, i));

          });

      })
        .catch(e => {
          this.set('errors', e);
      });

    }
  }
});
