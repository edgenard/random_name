(function() {
  'use strict';
    function initialize(element) {
      var button = document.createElement("button");
      element.appendChild(button);
      button.innerHTML = "Click to add names";
      element.classList.add("random-name-picker");
      button.addEventListener("click", startAddingNames);
    }

    function startAddingNames(event) {
      event.preventDefault();
      var parent = event.currentTarget.parentElement;
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.addEventListener("keypress", inputListener);

      parent.removeChild(parent.firstChild);
      parent.appendChild(input);

      var moreButton = document.createElement("button");
      moreButton.addEventListener("click", function (event) {
        event.preventDefault();
      });

      var closeButton = document.createElement("button");
      closeButton.addEventListener("click", function (event) {
        event.preventDefault();
      });
      moreButton.innerHTML = "Add more names";
      closeButton.innerHTML = "Finished adding names";
      parent.appendChild(moreButton);
      parent.appendChild(closeButton);
    }

    function inputListener (event) {
      if(event.key === "Enter" || event.keyIdentifier === "Enter"){
        event.preventDefault();
      }
    }

  exports.initialize = initialize;
}());
