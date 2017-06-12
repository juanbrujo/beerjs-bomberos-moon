(function(root) {
  'use strict'

  // Function that returns a Moon Instance
  var init = function() {
    return new Moon({
      render: function(h) {
        return h("section", {attrs: {"class": "mapa"}}, {"shouldRender": false, "eventListeners": {}}, [])
      }
    });
  }

  // If in node, export it,
  // if in the browser, create a global variable
  // with the instance
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = init;
  } else {
    root.app = init();
  }
})(this);