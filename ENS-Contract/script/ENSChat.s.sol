// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import "../src/ENSChat.sol";


contract ENSChatScript is Script {
    function setUp() public {}
    
     function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        ENSChat ensChat = new ENSChat();
        console.log("Contract deployed to: ", address(ensChat));

        vm.stopBroadcast();
    }
}