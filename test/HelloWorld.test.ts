import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat";
import { expect } from "chai";

//1. Set up environment
//2. Deploy contract
//3. Test function

describe("HelloWorld.sol", () => {
    it("should say hi", async () => {
        //2.
        const HelloWorld = await ethers.getContractFactory("HelloWorld").then(c => c.deploy().then(d => d.deployed()))

        expect(await HelloWorld.hello()).to.equal("Hello FiveElements")
    })
})