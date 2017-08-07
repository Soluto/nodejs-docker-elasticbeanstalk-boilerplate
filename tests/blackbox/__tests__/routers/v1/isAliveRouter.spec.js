const { expect } = require("chai");
const fetch = require("node-fetch");

describe("isAlive", () => {
  it("returns OK", async () => {
    const result = await (await fetch(`${process.env.API_URL}/api/v1/isalive`)).text()
    expect(result).to.equal('OK')
  });
});
