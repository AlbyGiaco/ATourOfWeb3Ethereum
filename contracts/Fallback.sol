//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface IFallback {
    function count() external;
}

contract Fallback {
    function foo() internal view {
        console.log("hello word");
    }

    fallback() external payable {
        foo();
        console.log("fallback");

        revert("You shound't be here");
    }
}
