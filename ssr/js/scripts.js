(function(root) {
  'use strict'

  var api   = "https://bomberos-cl-api.herokuapp.com/bomberos";

  var init = function() {
    return new Moon({
      data: {
        title: "Bomberos 🇨🇱 - Mapa Geolocalizado",
        bomberos: []
      },
      template: `<div>
        <header class="navbar">
          <div class="row">
            <div class="column-9">
              <a class="navbar-brand" href="#">{{title}}</a>
            </div>
          </div>
        </header>
        <main>
          <section class="mapa" id="mapa"></section>
        </main>
        <footer>
          <p>Proyecto financiado por <a href="http://www.beerjs.cl/">BeerJS Santiago</a>. Información rescatada de <a href="https://bomberos-cl-api.herokuapp.com/">Bomberos API</a> gracias a <a href="https://gist.github.com/lgaticaq/94a1f2dab326a7ab0226f09e1132556c#file-bomberos-json">lgaticaq</a></p>
        </footer>
      </div>`,
      methods: {

        setMap: function(){

          var self = this;
          
          axios.get(api).then(function(response) {

              self.set('bomberos', response.data);

              // set map
              var mapOptions = {
                zoom: 4,
                center: new google.maps.LatLng(-34.977985, -71.25288),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
              }

              var map = new google.maps.Map(document.getElementById("mapa"), mapOptions),
                  infowindow = new google.maps.InfoWindow(),
                  bomba = self.get('bomberos'),
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
                    '<p>Región: ' + value.region + '</p>'+
                    '</div>');
                    infowindow.open(map, marker);
                  }
                })(marker, i));

              });

            }).catch(function (error) {
              console.log(error);
          });
        }
      }

    });
  }



  if(typeof module !== 'undefined' && module.exports) {
    module.exports = init;
  } else {
    root.app = init();
  }

})(this);
