import '@nomiclabs/hardhat-ethers'
import { Contract } from 'ethers';
import { ethers } from 'hardhat'

async function deploy() {
    const HelloWorld = await ethers.getContractFactory("HelloWorld").then(c => c.deploy().then(d => d.deployed()))
    return HelloWorld;
}

async function sayHello(hello: Contract) {
    console.log('Say Hello: ', await hello.hello());
}

deploy().then(sayHello);