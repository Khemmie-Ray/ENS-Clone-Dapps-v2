// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ENSChat {
    struct Record {
        address user;
        string avatarUrl;
        bool exists;
    }

    mapping(string => Record) public nameService;
    mapping(address => string) public addressToUsername;
    event RegisteredAddress(address _user, string _userName, string _avatarUrl);

    function create(string memory _userName, address _user, string memory _avatarUrl) external {
        require(bytes(_userName).length > 0, "Username cannot be empty");
        require(_user != address(0), "Invalid address");

        require(!nameService[_userName].exists, "Username already registered");

        nameService[_userName] = Record({
           user: _user,
           avatarUrl: _avatarUrl,
           exists: true
        });

        addressToUsername[_user] = _userName;

        emit RegisteredAddress(_user, _userName, _avatarUrl);
    }

    function getAddress(string memory _username) public view returns (address) {
         require(bytes(_username).length > 0, "Username cannot be empty");

        return nameService[_username].user;
    }

    function getUserName(address _user) external view returns (string memory) {
        return addressToUsername[_user];
    }

    function getUserRecord(string memory _userName) external view returns (Record memory) {
        require(bytes(_userName).length > 0, "Username cannot be empty");
        require(nameService[_userName].exists, "Username does not exist");

        Record memory userRecord = nameService[_userName];
        return userRecord;
    }
}