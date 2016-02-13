/* globals KeyBoardEvent: false */
(function() {
  'use strict';
  var assert = require("./assert");
  // var randomName = require("./randomName");
  var picker = window.RandomPicker;

  describe("random name picker", function () {

    it("sets a default class on the given element", function () {
      var element = document.createElement("div");

      picker.initialize(element);

      assert.isTrue(element.classList.contains("random-name-picker"));
    });

    it("adds a button inside the given element", function () {
      var element = document.createElement("div");

      picker.initialize(element);
      var button = element.firstChild.nodeName;

      assert.equal(button, "BUTTON");
    });

    it("the button inside says 'Click to add names'", function () {
      var element = document.createElement("div");

      picker.initialize(element);
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
          this.input.value = "";
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
          this.input.value = "New Name";
          this.input.dispatchEvent(this.enter);

          assert.equal(this.paragraph.innerHTML, "Number of names: 1");
        });

        it("adding a name with enter clears the input box", function () {
          this.input.value = "New Name";
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
          this.input.value = "New Name";
          this.moreButton.dispatchEvent(this.click);

          assert.equal(this.numberOfNames.innerHTML, "Number of names: 1");
        });

        it("does not add a name with empty input with moreButton", function () {
          this.moreButton.dispatchEvent(this.click);

          assert.equal(this.numberOfNames.innerHTML, "");
        });

        it("clears the input box after clicking more button", function () {
          this.input.value = "Name";
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
          this.input.value = "new name";
          this.finishedButton.dispatchEvent(this.click);

          assert.equal(this.numberOfNames.innerHTML, "Number of names: 1");
        });

        it("does not add a name if input is blank", function () {
          this.input.value = "New Name";
          var moreButton = document.getElementById("more-names");
          moreButton.dispatchEvent(this.click);
          this.finishedButton.dispatchEvent(this.click);

          assert.equal(this.numberOfNames.innerHTML, "Number of names: 1");
        });

        it("sends message if finished button clicked with no names", function () {
          this.finishedButton.dispatchEvent(this.click);

          assert.equal(this.numberOfNames.innerHTML, "PLEASE ADD NAMES TO LIST");
        });

        it("removes the input field when finished", function () {
          this.input.value = "New Name";
          this.finishedButton.dispatchEvent(this.click);
          var input = document.getElementById("name-input");

          assert.isNull(input);
        });

        it("removes the more button when finished", function () {
          this.input.value = "New Name";
          this.finishedButton.dispatchEvent(this.click);
          var moreButton = document.getElementById("more-names");

          assert.isNull(moreButton);
        });

        it("removes the finished button when finished", function () {
          this.input.value = "New Name";
          this.finishedButton.dispatchEvent(this.click);
          var finishedButton = document.getElementById("finished-with-names");

          assert.isNull(finishedButton);
        });

        it("removes the numberOfNames paragraph", function () {
          this.input.value = "New Name";
          this.finishedButton.dispatchEvent(this.click);
          var numberOfNames = document.getElementById("number-of-names");

          assert.isNull(numberOfNames);
        });

        it("adds a button to pick names when finished", function () {
          this.input.value = "New Name";
          this.finishedButton.dispatchEvent(this.click);
          var pickNames = document.getElementById("pick-names");

          assert.equal(pickNames.nodeName, "BUTTON");
        });

        it("button to pick names has the right text", function () {
          this.input.value = "New Name";
          this.finishedButton.dispatchEvent(this.click);
          var pickNames = document.getElementById("pick-names");

          assert.equal(pickNames.innerHTML, "Pick a random name");
        });

        it("adds a button to edit list", function () {
          this.input.value = "New Name";
          this.finishedButton.dispatchEvent(this.click);
          var editNames = document.getElementById("edit-names");

          assert.equal(editNames.nodeName, "BUTTON");
        });

        it("edit button has the right text", function () {
          this.input.value = "New Name";
          this.finishedButton.dispatchEvent(this.click);
          var editNames = document.getElementById("edit-names");

          assert.equal(editNames.innerHTML, "Edit names on list");
        });

        it("adds a button to reset list", function () {
          this.input.value = "New Name";
          this.finishedButton.dispatchEvent(this.click);
          var resetList = document.getElementById("reset-list");

          assert.equal(resetList.nodeName, "BUTTON");
        });

        it("reset button has the right text", function () {
          this.input.value = "New Name";
          this.finishedButton.dispatchEvent(this.click);
          var resetList = document.getElementById("reset-list");

          assert.equal(resetList.innerHTML, "Reset the list");
        });

        it('adds a paragraph to show chosen name', function () {
          this.input.value = "New Name";
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
        this.click = setupMouseClick();
        finishedButton.dispatchEvent(this.click);
        this.pickNames = document.getElementById("pick-names");
        this.resetList = document.getElementById("reset-list");
        this.editNames = document.getElementById("edit-names");
        this.chosenName = document.getElementById("chosen-name");
        this.weightedNames = picker.weightedNames;
      });

      it("has a weightedNames list", function () {
        assert.isNotNull(this.weightedNames);
      });

      it("weightedNames has the correct number of items", function () {
        assert.equal(this.weightedNames.length, 15);
      });

      it("says it is choosing a name", function () {
        this.pickNames.dispatchEvent(this.click);

        assert.equal(this.chosenName.innerHTML, "Choosing a name...");
      });

      it("it shows the chosen name after 1 second", function (done) {
        this.pickNames.dispatchEvent(this.click);
        var chosenName = this.chosenName;
        setTimeout(function () {
          try{
            assert.include(picker.names, chosenName.innerHTML);
            done();
          } catch(e){
            done(e);
          }
        }, 1100);
      });

      it("weightedNames has one less after picking name", function () {
        this.pickNames.dispatchEvent(this.click);

        assert.equal(this.weightedNames.length, 14, "WeightedNames list should have one less item");
      });

      it("should say when every name has been picked", function () {
        var length = this.weightedNames.length;
        for (var i = 0; i < length ; i++) {
          this.pickNames.dispatchEvent(this.click);
        }

        this.pickNames.dispatchEvent(this.click);

        assert.equal(this.chosenName.innerHTML, "All names have been picked, click Reset List to pick again");
      });

      it("clicking reset list should repopulate the weightedList", function () {
        this.pickNames.dispatchEvent(this.click);

        this.resetList.dispatchEvent(this.click);
        this.weightedNames = picker.weightedNames;

        assert.equal(this.weightedNames.length, 15);
      });

      it("should say when a lsit has been reset", function () {
        this.resetList.dispatchEvent(this.click);

        assert.equal(this.chosenName.innerHTML, "The list has been reset. Click Pick a name to choose another name");
      });

      it("clicking edit names shows the list of names", function () {
        this.editNames.dispatchEvent(this.click);

        var namesList = document.getElementById("names-list");
        assert.isNotNull(namesList);
      });

      it('names list has the right number of names', function () {
        this.editNames.dispatchEvent(this.click);
        var namesList = document.getElementById("names-list");
        var numNames = namesList.children.length;

        assert.equal(numNames, 5);
      });

      it("each name has a data-index that matches list index", function () {
        this.editNames.dispatchEvent(this.click);
        var namesList = document.getElementById("names-list");
        var dataIndex;
        for (var i = 0; i < namesList.children.length; i++) {
        dataIndex = namesList.children[i].getAttribute("data-index");
        assert.equal(dataIndex, i);
        }
      });

      it("double-clicking on list item adds an input field as its child", function () {
        this.editNames.dispatchEvent(this.click);
        var namesList = document.getElementById("names-list");
        var listItem = namesList.children[0];
        listItem.dispatchEvent(setupDblClick());

        var inputField = listItem.children[0];

        assert.equal(inputField.tagName, "INPUT");
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

  function setupDblClick(){
    var doubleClick = document.createEvent("MouseEvent");
    doubleClick.initEvent("dblclick", true, true);
    return doubleClick;
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
    picker.initialize(element);
    var button = element.firstChild;
    button.dispatchEvent(setupMouseClick());
  }

  function addNamesToList() {
    var names = ["Joey", "Zoe", "Chloe", "Tony", "Bill"];
    var input = document.getElementById("name-input");
    var moreButton = document.getElementById("more-names");
    var click = setupMouseClick();

    names.forEach(function (name) {
      input.value = name;
      moreButton.dispatchEvent(click);
    });
  }

}());
