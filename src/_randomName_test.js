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

    it("the button inside says 'Click to add names'", function () {
      var element = document.createElement("div");

      randomName.initialize(element);
      var button = element.firstChild;

      assert.equal(button.innerHTML, "Click to add names");
    });


    describe("Adding Names", function () {
      beforeEach("Setup for adding names", function () {
        this.element = document.createElement("div");
        setupApp(this.element);
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

      it("clicking the button adds a paragraph with the id number-of-names", function () {
        var paragraph = document.getElementById("number-of-names");

        assert.equal(paragraph.nodeName, "P");
      });


      it("the two other buttons have the write inner text", function () {
        var moreButton = document.getElementById("more-names");
        var finishButton = document.getElementById("finished-with-names");

        assert.equal(moreButton.innerHTML, "Add name to list");
        assert.equal(finishButton.innerHTML, "Finished adding names");
      });

      describe("Adding names with input", function () {
        beforeEach("setup input field", function () {
          this.input = document.getElementById("name-input");
          this.enter = setupKeyPress("Enter");
          this.paragraph = document.getElementById("number-of-names");
        });

        afterEach("clear input field", function () {
          this.input.setAttribute("value", "");
        });

        it("input box listens for Enter key", function () {
          assert.isFalse(this.input.dispatchEvent(this.enter));
        });

        it("input doesn't listen for other keys", function () {
          var dKey = setupKeyPress("d");

          assert.isTrue(this.input.dispatchEvent(dKey));
        });

        it("hitting enter on input does not add name if empty", function () {
          this.input.dispatchEvent(this.enter);

          assert.equal(this.paragraph.innerHTML, "");
        });


        it("adds a name by pressing enter", function () {
          this.input.setAttribute("value", "New Name");
          this.input.dispatchEvent(this.enter);

          assert.equal(this.paragraph.innerHTML, "Number of names: 1");
        });

        it("adding a name with enter clears the input box", function () {
          this.input.setAttribute("value", "Name");
          this.input.dispatchEvent(this.enter);

          assert.equal(this.input.value, "");
        });
      });

      describe("Adding names by using more button", function () {
        beforeEach("setup for using more button", function () {
          this.input = document.getElementById("name-input");
          this.moreButton = document.getElementById("more-names");
          this.numberOfNames = document.getElementById("number-of-names");
          this.click = setupMouseClick();
        });

        afterEach("clear input field", function () {
          this.input.value = "";
        });

        it("adds a name by clicking the more names button", function () {
          this.input.setAttribute("value", "name");
          this.moreButton.dispatchEvent(this.click);

          assert.equal(this.numberOfNames.innerHTML, "Number of names: 1");
        });

        it("does not add a name with empty input with moreButton", function () {
          this.moreButton.dispatchEvent(this.click);

          assert.equal(this.numberOfNames.innerHTML, "");
        });

        it("clears the input box after clicking more button", function () {
          this.input.setAttribute("value", "Name");
          this.moreButton.dispatchEvent(this.click);

          assert.equal(this.input.value, "");
        });
      });

      describe("Finished adding names", function () {
        beforeEach("setup to test finish button", function () {
          this.input = document.getElementById("name-input");
          this.finishedButton = document.getElementById("finished-with-names");
          this.numberOfNames = document.getElementById("number-of-names");
          this.click = setupMouseClick();
        });

        afterEach("clear input field", function () {
          this.input.value = "";
        });

        it("adds a name if finished button is clicked", function () {
          this.input.setAttribute("value", "New Name");
          this.finishedButton.dispatchEvent(this.click);

          assert.equal(this.numberOfNames.innerHTML, "Number of names: 1");
        });

        it("sends message if finished button clicked with no names", function () {
          this.finishedButton.dispatchEvent(this.click);

          assert.equal(this.numberOfNames.innerHTML, "PLEASE ADD NAMES TO LIST");
        });

        it("removes the input field when finished", function () {
          this.input.setAttribute("value", "New Name");
          this.finishedButton.dispatchEvent(this.click);
          var input = document.getElementById("name-input");

          assert.isNull(input);
        });

        it("removes the more button when finished", function () {
          this.input.setAttribute("value", "New Name");
          this.finishedButton.dispatchEvent(this.click);
          var moreButton = document.getElementById("more-names");

          assert.isNull(moreButton);
        });

        it("removes the finished button when finished", function () {
          this.input.setAttribute("value", "New Name");
          this.finishedButton.dispatchEvent(this.click);
          var finishedButton = document.getElementById("finished-with-names");

          assert.isNull(finishedButton);
        });

        it("adds a button to pick names when finished", function () {
          this.input.setAttribute("value", "New Name");
          this.finishedButton.dispatchEvent(this.click);
          var pickNames = document.getElementById("pick-names");

          assert.equal(pickNames.nodeName, "BUTTON");
        });

        it("adds a button to edit list", function () {
          this.input.setAttribute("value", "New Name");
          this.finishedButton.dispatchEvent(this.click);
          var editNames = document.getElementById("edit-names");

          assert.equal(editNames.nodeName, "BUTTON");
        });

        it("adds a button to reset list", function () {
          this.input.setAttribute("value", "New Name");
          this.finishedButton.dispatchEvent(this.click);
          var resetList = document.getElementById("reset-list");

          assert.equal(resetList.nodeName, "BUTTON");
        });

        it('adds a paragraph to show chosen name', function () {
          this.input.setAttribute("value", "New Name");
          this.finishedButton.dispatchEvent(this.click);
          var chosenName = document.getElementById("chosen-name");

          assert.equal(chosenName.nodeName, "P");
        });
      });

    });


    describe("Picking Names", function () {
      beforeEach("Setup for picking names", function () {
        this.element = document.createElement("div");
        setupApp(this.element);
        addNamesToList();
        var finishedButton = document.getElementById("finished-with-names");
        finishedButton.dispatchEvent(setupMouseClick());
        this.pickNames = document.getElementById("pick-names");
        this.chosenName = document.getElementById("chosen-name");
      });

      afterEach("Clean up Names", function () {
        this.element.parentNode.removeChild(this.element);
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

  function setupApp(element) {
    document.body.appendChild(element);
    randomName.initialize(element);
    var button = element.firstChild;
    button.dispatchEvent(setupMouseClick());
  }

  function addNamesToList() {
    var names = ["Joey", "Zoe", "Chloe", "Tony", "Bill"];
    var input = document.getElementById("name-input");
    var moreButton = document.getElementById("more-names");
    var click = setupMouseClick();

    names.forEach(function (name) {
      input.setAttribute("value", name);
      moreButton.dispatchEvent(click);
    });
  }

}());
