(function() {
  'use strict';

  var NAMES = [];

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

    var moreButton = document.createElement("button");
    moreButton.setAttribute("id", "more-names");
    moreButton.addEventListener("click", function (event) {
      event.preventDefault();
    });

    var closeButton = document.createElement("button");
    closeButton.setAttribute("id", "finished-with-names");
    closeButton.addEventListener("click", function (event) {
      event.preventDefault();
    });

    var nameCountParagraph = document.createElement("p");
    nameCountParagraph.setAttribute("id", "number-of-names");

    moreButton.innerHTML = "Add more names";
    closeButton.innerHTML = "Finished adding names";
    parent.appendChild(input);
    parent.appendChild(moreButton);
    parent.appendChild(closeButton);
    parent.appendChild(nameCountParagraph);
  }

  function inputListener (event) {
    if(event.key === "Enter" || event.keyIdentifier === "Enter"){
      event.preventDefault();
      var value = event.currentTarget.value;
      if(value.length === 0) return;
      event.currentTarget.setAttribute("value", "");
      addToNameList(value);
      updateNameCount();
    } else {
      return;
    }
  }

  function addToNameList(name) {
    NAMES.push(name);
  }

  function updateNameCount() {
    var nameCountParagraph;
    nameCountParagraph = document.getElementById("number-of-names");
    nameCountParagraph.innerHTML = "Number of names: " + NAMES.length;

  }


  exports.initialize = initialize;
}());
