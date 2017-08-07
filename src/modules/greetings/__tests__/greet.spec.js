const greet = require("../greet");
const {expect} = require('chai')

describe("greet", () => {
  it("greets the user", () => {
      expect(greet()).to.equal(`Welcome`)
  });
});
