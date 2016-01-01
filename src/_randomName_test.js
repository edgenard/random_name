(function() {
  'use strict';
  var assert = require("./assert");
  var randomName = require("./randomName");

  describe("random name picker", function () {

    it("sets a default class on the given element", function () {
      var element = document.createElement("div");

      randomName.initialize(element);

      assert.isTrue(element.classList.contains("random-name-picker"));
    });

    it("adds a button inside the given element", function () {
      var element = document.createElement("div");

      randomName.initialize(element);
      var button = element.firstChild.nodeName;

      assert.equal(button, "BUTTON");
    });

    it("the button inside says Click to add names", function () {
      var element = document.createElement("div");

      randomName.initialize(element);
      var button = element.firstChild;

      assert.equal(button.innerHTML, "Click to add names");
    });

    it("adds a click listener to the button", function () {
      var element = document.createElement("div");
      var mouseClick = setupMouseClick();

      randomName.initialize(element);
      var button = element.firstChild;

      //When an event is triggered, if the element has an event listener and that
      //event listener has event.preventDefault() called, it will return false
      assert.isFalse(button.dispatchEvent(mouseClick));
    });

    it("clicking the button removes the button and puts an input text box", function () {
      var element =  document.createElement("div");
      var mouseClick = setupMouseClick();

      randomName.initialize(element);
      var button = element.firstChild;
      button.dispatchEvent(mouseClick);

      assert.equal(element.firstChild.nodeName, "INPUT");
    });

    it("clicking the button also puts in two other buttons", function () {
      var element = document.createElement("div");
      var mouseClick = setupMouseClick();
      randomName.initialize(element);
      var button = element.firstChild;


      button.dispatchEvent(mouseClick);
      var secondChild = element.children[1].nodeName;
      var thirdChild = element.children[2].nodeName;

      assert.equal(secondChild, "BUTTON");
      assert.equal(thirdChild, "BUTTON");
    });
  });

  function setupMouseClick(){
    var mouseClick = document.createEvent("MouseEvent");
    mouseClick.initEvent("click", false, true);
    return mouseClick;
  }

}());
