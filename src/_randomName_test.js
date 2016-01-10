/* globals KeyBoardEvent: false */
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

    describe("Adding Names", function () {
      beforeEach("Setup for adding names", function () {
        this.element = document.createElement("div");
        document.body.appendChild(this.element);
        var mouseClick = setupMouseClick();
        randomName.initialize(this.element);
        var button = this.element.firstChild;
        button.dispatchEvent(mouseClick);
      });

      afterEach("clear body", function () {
        document.body.removeChild(this.element);
      });

      it("clicking the button removes the button and puts an input text box", function () {
        assert.equal(this.element.firstChild.nodeName, "INPUT");
      });

      it("input box has an id of name-input", function () {
        var input = document.getElementById("name-input");

        assert.isNotNull(input);
      });

      it("clicking the button also puts in two other buttons", function () {
        var secondChild = this.element.children[1].nodeName;
        var thirdChild = this.element.children[2].nodeName;

        assert.equal(secondChild, "BUTTON");
        assert.equal(thirdChild, "BUTTON");
      });

      it("has a button with an id of more-names", function () {
        var moreButton = document.getElementById("more-names");

        assert.isNotNull(moreButton);
      });

      it("has button with an id of finished-with-names", function () {
        var finishButton = document.getElementById("finished-with-names");

        assert.isNotNull(finishButton);
      });

      it("clicking the button adds a paragraph", function () {
        var paragraph = document.getElementById("number-of-names");

        assert.equal(paragraph.nodeName, "P");
      });

      it("the paragraph has an id of number-of-names", function () {
        var paragraph = document.getElementById("number-of-names");


        assert.isNotNull(paragraph);
      });

      it("the two other buttons have the write inner text", function () {
        var moreButton = document.getElementById("more-names");
        var finishButton = document.getElementById("finished-with-names");

        assert.equal(moreButton.innerHTML, "Add more names");
        assert.equal(finishButton.innerHTML, "Finished adding names");
      });

      it("input box listens for return key", function () {
        var input = this.element.firstChild;
        var enter = setupKeyPress("Enter");

        assert.isFalse(input.dispatchEvent(enter));
      });

      it("input doesn't listen for other keys", function () {
        var input = this.element.firstChild;
        var dKey = setupKeyPress("d");

        assert.isTrue(input.dispatchEvent(dKey));
      });

      it("more button has event listener", function () {
        var moreButton = this.element.children[1];
        var mouseClick = setupMouseClick();

        assert.isFalse(moreButton.dispatchEvent(mouseClick));
      });

      it("finish adding names button has event listner", function () {
        var finishButton = this.element.children[2];
        var mouseClick = setupMouseClick();

        assert.isFalse(finishButton.dispatchEvent(mouseClick));
      });

      it("hitting enter on input does not add name if empty", function () {
        var input = this.element.children[0];
        var paragraph = document.getElementById("number-of-names");
        var enter = setupKeyPress("Enter");

        input.dispatchEvent(enter);

        assert.equal(paragraph.innerHTML, "");
      });

      it("adds a name by pressing enter", function () {
        var input = this.element.children[0];
        var paragraph = document.getElementById("number-of-names");
        var enter = setupKeyPress("Enter");

        input.setAttribute("value", "New Name");
        input.dispatchEvent(enter);

        assert.equal(paragraph.innerHTML, "Number of names: 1");
      });

      it("adding a name with enter clears the input box", function () {
        var input = this.element.children[0];
        var enter = setupKeyPress("Enter");

        input.setAttribute("value", "Name");
        input.dispatchEvent(enter);

        assert.equal(input.value, "");
      });

      it.skip("does not add a name with empty input with moreButton", function () {
        var input = this.element.children[0];
        var moreButton;
      });
    });


  });

  function setupMouseClick(){
    var mouseClick = document.createEvent("MouseEvent");
    mouseClick.initEvent("click", false, true);
    return mouseClick;
  }

  function setupKeyPress(keypressed) {
    var keyboardEvent;
    if(typeof window.KeyboardEvent !== "function"){
      keyboardEvent = document.createEvent("KeyboardEvent");
      keyboardEvent.initKeyboardEvent("keypress", false, true, window, keypressed, 0, "", false, "");
    }else {
      keyboardEvent = new KeyboardEvent('keypress', {
        key: keypressed,
        keyIdentifier: keypressed,
        cancelable: true
      });
    }
    return keyboardEvent;
  }

}());
