//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Alice.sol";
import "./Storage.sol";

contract Bob {
    AppStorage s;

    constructor(address _Alice) {
        s.AliceAddress = _Alice;
        s.b = 4;
        s.c = 0x45;
        s.d = 0xf5;
    }

    function setB(uint256 _b) public {
        s.b = _b;

        s.AliceAddress.delegatecall(
            abi.encodeWithSignature("setA(uint256)", _b + 1)
        );

        /* Alice(s.AliceAddress).setA(_b + 1); */
    }

    function getB() public view returns (uint256) {
        return s.b;
    }
}
