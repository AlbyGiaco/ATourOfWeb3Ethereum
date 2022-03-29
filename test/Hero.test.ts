import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import exp from "constants";
import { Contract } from "ethers";
import { ethers } from "hardhat";

//1. Set up environment
//2. Deploy contract
//3. Test function

describe("Hero.sol", () => {
  //2.
  const createHeroContract = async () => {
    const Hero = await ethers
      .getContractFactory("TestHero")
      .then((c) => c.deploy().then((d) => d.deployed()));
    return Hero;
  };

  let Hero: Contract;

  before(async () => {
    Hero = await createHeroContract();
  });

  /*  it("should return 0 heroes", async () => {
    expect(await Hero.getHeroes()).to.deep.equal([]);
  }); */

  it("should fail at creating hero cause of payment", async () => {
    let e: any;
    try {
      await Hero.createHero(0, { value: ethers.utils.parseEther("0.04") });
    } catch (err) {
      e = err;
    }

    expect(e.message.includes("Please send at least 0.05 ether")).to.equal(
      true
    );
  });

  it("should return strength of heroes", async () => {
    Hero.setRandom(69);
    await Hero.createHero(0, {
      value: ethers.utils.parseEther("0.06"),
    });
    const heroes = await Hero.getHeroes().then((h: any) => h[0]);

    expect(await Hero.getStrength(heroes)).to.be.equal(6);
    expect(await Hero.getHealth(heroes)).to.be.equal(2);
    expect(await Hero.getDex(heroes)).to.be.equal(14);
    expect(await Hero.getIntellect(heroes)).to.be.equal(10);
    expect(await Hero.getMagic(heroes)).to.be.equal(16);
  });
});
