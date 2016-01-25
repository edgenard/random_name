(function() {
  'use strict';

  var NAMES;
  var weightedNames;

  function initialize(element) {
    var button = document.createElement("button");
    element.appendChild(button);
    button.innerHTML = "Click to add names";
    element.classList.add("random-name-picker");
    button.addEventListener("click", startAddingNames);
    NAMES = [];
    weightedNames = [];
  }

  function startAddingNames(event) {
    event.preventDefault();
    var parent = event.currentTarget.parentElement;
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "name-input");
    input.addEventListener("keypress", inputListener);

    parent.removeChild(parent.firstChild);

    var moreButton = document.createElement("button");
    moreButton.setAttribute("id", "more-names");
    moreButton.addEventListener("click", function (event) {
      event.preventDefault();

      if(input.value.length === 0) return;
      addToNameList(input.value);
      updateNameCount();
      input.setAttribute("value", "");
    });

    var closeButton = document.createElement("button");
    closeButton.setAttribute("id", "finished-with-names");
    closeButton.addEventListener("click", function (event) {
      event.preventDefault();
      if(input.value.length === 0 && NAMES.length === 0) {
        numberOfNames.innerHTML = 'PLEASE ADD NAMES TO LIST';
        return;
      }
      addToNameList(input.value);
      updateNameCount();

      input.parentNode.removeChild(input);
      moreButton.parentNode.removeChild(moreButton);
      closeButton.parentNode.removeChild(closeButton);
      numberOfNames.parentNode.removeChild(numberOfNames);

      var pickNames = document.createElement("button");
      pickNames.setAttribute("id", "pick-names");
      parent.appendChild(pickNames);

      var editNames = document.createElement("button");
      editNames.setAttribute("id", "edit-names");
      parent.appendChild(editNames);

      var resetList = document.createElement("button");
      resetList.setAttribute("id", "reset-list");
      parent.appendChild(resetList);

      var chosenName = document.createElement("p");
      chosenName.setAttribute("id", "chosen-name");
      parent.appendChild(chosenName);
    });

    var numberOfNames = document.createElement("p");
    numberOfNames.setAttribute("id", "number-of-names");

    moreButton.innerHTML = "Add name to list";
    closeButton.innerHTML = "Finished adding names";
    parent.appendChild(input);
    parent.appendChild(moreButton);
    parent.appendChild(closeButton);
    parent.appendChild(numberOfNames);
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
    var nameCountParagraph = document.getElementById("number-of-names");
    nameCountParagraph.innerHTML = "Number of names: " + NAMES.length;
  }


  module.exports = {
    initialize: initialize,
    weightedNames: weightedNames
  };
}());
