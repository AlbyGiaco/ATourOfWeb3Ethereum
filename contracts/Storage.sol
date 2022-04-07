//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

struct AppStorage {
    uint256 a;
    uint256 b;
    uint8 c;
    uint8 d;
    address AliceAddress;
}

library Storage {
    bytes32 constant key = keccak256("my-storage-location");

    function get() internal pure returns (AppStorage storage s) {
        bytes32 k = key;
        assembly {
            s.slot := k
        }
    }
}
