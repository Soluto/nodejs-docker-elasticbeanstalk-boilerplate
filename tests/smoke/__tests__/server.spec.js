const { expect } = require("chai");
const fetch = require("node-fetch");

describe("greet", () => {
  it("greets the user", async () => {
    const result = await (await fetch(process.env.API_URL)).text()
    expect(result).to.equal('Welcome')
  });
});
