import "@nomiclabs/hardhat-ethers";
import { Contract } from "ethers";
import { ethers } from "hardhat";

async function deploy(name, ...args) {
  const Contract = await ethers.getContractFactory(name);
  const contract: Contract = await Contract.deploy(...args);
  await contract.deployed();

  return contract;
}

async function printStorage(contract, name, count) {
  for (let i = 0; i < count; i++) {
    console.log(
      name,
      i,
      await ethers.provider.getStorageAt(contract.address, i)
    );
  }
}

async function fallback() {
  const alice = await deploy("Alice");
  const bob = await deploy("Bob", alice.address);

  await printStorage(bob, "B", 3);
  await bob.setB(0x45);
  console.log("-----------------------------------------");
  await printStorage(bob, "B", 3);
}

fallback();
