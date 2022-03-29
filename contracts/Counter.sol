//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    uint256 counter;

    event CounterInc(uint16 counter);

    function count() public {
        counter++;
        console.log("Counter is now: ", counter);
        emit CounterInc(uint16(counter));
    }

    function getCounter() public view returns (uint8) {
        return uint8(counter);
    }
}
