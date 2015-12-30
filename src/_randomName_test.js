(function() {
  'use strict';
  var assert = require("./assert");

  describe("quick-test", function () {
    it("runs test", function () {
      assert.equal(3 + 1, 4);
    });
  });
}());
