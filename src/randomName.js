(function() {
  'use strict';
    function initialize(element) {
      var button = document.createElement("button");
      element.appendChild(button);
      element.classList.add("random-name-picker");
    }
  exports.initialize = initialize;
}());
