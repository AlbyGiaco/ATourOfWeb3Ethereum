//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Storage.sol";

contract Alice {
    function setA(uint256 _a) public {
        AppStorage storage s = Storage.get();
        s.a = _a;
    }

    function getA() public view returns (uint256) {
        AppStorage storage s = Storage.get();

        return s.a;
    }
}
