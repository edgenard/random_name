(function() {
  'use strict';
  var assert = require("./vendor/chai-2.1.0.js").assert;

  describe("quick-test", function () {
    it("runs test", function () {
      assert.equal(3 + 1, 4);
    });
  });
}());
