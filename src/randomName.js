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
    moreButton.addEventListener("click", moreNames);

    var finishedButton = document.createElement("button");
    finishedButton.setAttribute("id", "finished-with-names");
    finishedButton.addEventListener("click", finishedWithNames);

    var numberOfNames = document.createElement("p");
    numberOfNames.setAttribute("id", "number-of-names");

    moreButton.innerHTML = "Add name to list";
    finishedButton.innerHTML = "Finished adding names";
    parent.appendChild(input);
    parent.appendChild(moreButton);
    parent.appendChild(finishedButton);
    parent.appendChild(numberOfNames);
  }


  function moreNames(event){
    event.preventDefault();
    var input = document.getElementById("name-input");
    if(input.value.length === 0) return;
    addToNameList(input.value);
    updateNameCount();
    input.value = '';
  }

  function finishedWithNames(event){
    event.preventDefault();
    var parent = event.currentTarget.parentElement;
    var numberOfNames = document.getElementById("number-of-names");
    var input = document.getElementById("name-input");

    if(input.value.length === 0 && picker.names.length === 0) {
      numberOfNames.innerHTML = 'PLEASE ADD NAMES TO LIST';
      return;
    }
    if(input.value.length !== 0) {
      addToNameList(input.value);
      updateNameCount();
    }
    clearOut(parent);
    addElementsToPickNames(parent);
    makeWeightedList();
  }

  function clearOut(element){
    var firstChild = element.firstChild;
    while (firstChild){
      element.removeChild(firstChild);
      firstChild = element.firstChild;
    }
  }

  function addElementsToPickNames(parent){
    var pickNames = document.createElement("button");
    pickNames.setAttribute("id", "pick-names");
    pickNames.innerHTML = "Pick a random name";
    parent.appendChild(pickNames);
    pickNames.addEventListener("click", function (event) {
      event.preventDefault();
      chosenName.innerHTML = "Choosing a name...";
      if (picker.weightedNames.length < 1){
        chosenName.innerHTML = "All names have been picked, click Reset List to pick again";
        return;
      }
      var name = takeOutRandomItem(picker.weightedNames);
      setTimeout(function () {
        chosenName.innerHTML = name;
      }, 1000);
    });


    var editNames = document.createElement("button");
    editNames.setAttribute("id", "edit-names");
    editNames.innerHTML = "Edit names on list";
    parent.appendChild(editNames);
    editNames.addEventListener("click", function (event) {
      event.preventDefault();
      var namesList = document.createElement("ul");
      namesList.setAttribute("id", "names-list");
      var instructions = document.createElement("h3");
      instructions.setAttribute("id", "edit-instructions");
      instructions.innerHTML = "Double click on a name to edit then hit Enter/Return to save";
      parent.appendChild(instructions);
      parent.appendChild(namesList);
      picker.names.forEach(function (name, index) {
        var listItem = document.createElement("li");
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete " + name;
        listItem.innerHTML = name;
        listItem.setAttribute("data-index", index);
        deleteButton.setAttribute("data-index", index);
        namesList.appendChild(listItem);
        namesList.appendChild(deleteButton);
      });
      namesList.addEventListener("dblclick", editThisName);
      namesList.addEventListener("click", deleteThisName);

      var finishedEditing = document.createElement("button");
      finishedEditing.setAttribute("id", "finished-editing");
      finishedEditing.innerHTML = "Finished editing names";
      parent.appendChild(finishedEditing);
      finishedEditing.addEventListener("click", removeEditingElements);

    });

    var resetList = document.createElement("button");
    resetList.setAttribute("id", "reset-list");
    resetList.innerHTML = "Reset the list";
    parent.appendChild(resetList);
    resetList.addEventListener("click", function (event) {
      event.preventDefault();
      picker.weightedNames = [];
      makeWeightedList();
      chosenName.innerHTML = "The list has been reset. Click Pick a name to choose another name";
    });

    var chosenName = document.createElement("p");
    chosenName.setAttribute("id", "chosen-name");
    parent.appendChild(chosenName);
  }

  function editThisName(event){
    var listItem = event.target;
    if(listItem.tagName !== "LI") return;
    var input = document.createElement("input");
    input.value = listItem.innerHTML;
    listItem.innerHTML = "";
    listItem.appendChild(input);
    input.addEventListener("keypress", editName);
  }

  function editName(event) {
    if (event.key === "Enter" || event.keyIdentifier === "Enter") {
      event.preventDefault();
      var inputField = event.target;
      var newName = inputField.value;
      var listItem = inputField.parentElement;
      var index = listItem.getAttribute("data-index");
      picker.names[index] = newName;
      listItem.removeChild(inputField);
      listItem.innerHTML = newName;
      makeWeightedList();
    } else {
      return;
    }
  }

  function deleteThisName(event){
    event.preventDefault();
    var button = event.target;
    if(button.tagName !== "BUTTON") return;
    var index = button.dataset.index;
    var nameListing = button.previousElementSibling;
    if (nameListing.tagName === "LI" && nameListing.dataset.index === index) {
      nameListing.parentElement.removeChild(nameListing);
      button.parentElement.removeChild(button);
    }
    picker.names.splice(index, 1);
    makeWeightedList();
  }

  function removeEditingElements(event) {
    event.preventDefault();
    var finishedEditing = document.getElementById("finished-editing");
    var namesList = document.getElementById("names-list");
    var instructions = document.getElementById("edit-instructions");
    var parent = finishedEditing.parentNode;
    parent.removeChild(instructions);
    parent.removeChild(namesList);
    parent.removeChild(finishedEditing);

  }

  function takeOutRandomItem(list){
    var randomIndex = Math.floor(Math.random() * list.length);
    var name = list[randomIndex];
    list.splice(randomIndex, 1);
    return name;
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
    picker.weightedNames = [];
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
