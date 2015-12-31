(function() {
  'use strict';
  var assert = require("./assert");
  var randomName = require("./randomName");

  describe("random name picker", function () {

    it("sets a default class on an element", function () {
      var element = document.createElement("div");

      randomName.initialize(element);

      assert.isTrue(element.classList.contains("random-name-picker"));
    });

    it("adds a button inside an element", function () {
      var element = document.createElement("div");

      randomName.initialize(element);
      var firstChild = element.firstChild.nodeName;

      assert.equal(firstChild, "BUTTON");
    });
  });
}());
