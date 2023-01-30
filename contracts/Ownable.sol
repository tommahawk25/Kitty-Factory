// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


contract Ownable {

    address payable internal owner;

    modifier onlyOwner {
         require(payable(msg.sender) == owner);
        _; // run the function
    }

    constructor () {
        owner = payable(msg.sender);
    }
}