// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint256 public count;

    event Increment(address indexed caller, uint256 newCount);
    event Decrement(address indexed caller, uint256 newCount);

    function increment() external {
        count += 1;
        emit Increment(msg.sender, count);
    }

    function decrement() external {
        require(count > 0, "count is zero");
        count -= 1;
        emit Decrement(msg.sender, count);
    }
}
