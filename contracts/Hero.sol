//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hero {
    enum HeroClass {
        Mage,
        Healer,
        Barbarian
    }

    mapping(address => uint256[]) addressToHeroes;

    function generateRandom() public view virtual returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        msg.sender
                    )
                )
            );
    }

    function getHeroes() public view returns (uint256[] memory) {
        return addressToHeroes[msg.sender];
    }

    function getStrength(uint256 hero) public pure returns (uint8) {
        //return uint8((hero & (((1 << 5) - 1) << 2)) >> 2);
        return uint8((hero >> 2) & 0x1f);
    }

    function getHealth(uint256 hero) public pure returns (uint8) {
        return uint8((hero >> 7) & 0x1f);
    }

    function getDex(uint256 hero) public pure returns (uint8) {
        return uint8((hero >> 12) & 0x1f);
    }

    function getIntellect(uint256 hero) public pure returns (uint8) {
        return uint8((hero >> 17) & 0x1f);
    }

    function getMagic(uint256 hero) public pure returns (uint8) {
        return uint8((hero >> 22) & 0x1f);
    }

    function createHero(HeroClass class) public payable {
        require(msg.value >= 0.05 ether, "Please send at least 0.05 ether");

        uint32[] memory stats = new uint32[](5);
        stats[0] = 2;
        stats[1] = 7;
        stats[2] = 12;
        stats[3] = 17;
        stats[4] = 22;

        uint8 len = 5;
        uint256 hero = uint256(class);

        do {
            uint256 pos = generateRandom() % len;
            uint256 value = (generateRandom() % (13 + len)) + 1;

            hero |= value << stats[pos];

            len--;

            stats[pos] = stats[len];
        } while (len > 0);

        addressToHeroes[msg.sender].push(hero);
    }
}
