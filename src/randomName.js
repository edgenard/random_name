(function() {
  'use strict';
    function initialize(element) {
      var button = document.createElement("button");
      element.appendChild(button);
      button.innerHTML = "Click to add names";
      element.classList.add("random-name-picker");
      button.addEventListener("click", function (event) {
        event.preventDefault();
        var parent = event.currentTarget.parentElement;
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        parent.removeChild(parent.firstChild);
        parent.appendChild(input);
      });
    }
  exports.initialize = initialize;
}());
