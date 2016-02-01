(function() {
  'use strict';

  if(typeof RandomPicker === "undefined"){
    window.RandomPicker = {};
  }

  var picker = window.RandomPicker;



  picker.initialize = function (element) {
    var button = document.createElement("button");
    element.appendChild(button);
    button.innerHTML = "Click to add names";
    element.classList.add("random-name-picker");
    button.addEventListener("click", startAddingNames);
    this.names = [];
    this.weightedNames = [];
  };

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
      input.value = '';
    });

    var closeButton = document.createElement("button");
    closeButton.setAttribute("id", "finished-with-names");
    closeButton.addEventListener("click", function (event) {
      event.preventDefault();
      if(input.value.length === 0 && picker.names.length === 0) {
        numberOfNames.innerHTML = 'PLEASE ADD NAMES TO LIST';
        return;
      }
      if(input.value.length !== 0) {
        addToNameList(input.value);
        updateNameCount();
      }


      input.parentNode.removeChild(input);
      moreButton.parentNode.removeChild(moreButton);
      closeButton.parentNode.removeChild(closeButton);
      numberOfNames.parentNode.removeChild(numberOfNames);

      var pickNames = document.createElement("button");
      pickNames.setAttribute("id", "pick-names");
      pickNames.innerHTML = "Pick a random name";
      parent.appendChild(pickNames);

      var editNames = document.createElement("button");
      editNames.setAttribute("id", "edit-names");
      parent.appendChild(editNames);
      editNames.innerHTML = "Edit names on list";

      var resetList = document.createElement("button");
      resetList.setAttribute("id", "reset-list");
      parent.appendChild(resetList);
      resetList.innerHTML = "Reset the list";

      var chosenName = document.createElement("p");
      chosenName.setAttribute("id", "chosen-name");
      parent.appendChild(chosenName);

      makeWeightedList();
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
      event.currentTarget.value = "";
      addToNameList(value);
      updateNameCount();
    } else {
      return;
    }
  }

  function addToNameList(name) {
    picker.names.push(name);
  }

  function updateNameCount() {
    var nameCountParagraph = document.getElementById("number-of-names");
    nameCountParagraph.innerHTML = "Number of names: " + picker.names.length;
  }

  function makeWeightedList() {
    picker.names.forEach(function (name) {
      picker.weightedNames.push(name);
      picker.weightedNames.push(name);
      picker.weightedNames.push(name);
    });

  }

  // module.exports = {
  //   initialize: initialize,
  //   weightedNames: weightedNames
  // };
}());
