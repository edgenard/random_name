(function() {
  'use strict';
    function initialize(element) {
      var button = document.createElement("button");
      element.appendChild(button);
      element.classList.add("random-name-picker");
      button.addEventListener("click", function (event) {
        event.preventDefault();
      });
    }
  exports.initialize = initialize;
}());
