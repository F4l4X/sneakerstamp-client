//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NikeNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public owner;
    mapping(uint=>string) private nfts;

    modifier onlyOwner() {
        require(msg.sender == owner, 'address not allowed to mint');
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        address ownerAddress
    ) ERC721(_name, _symbol) {
        owner = ownerAddress;
    }

    function createToken(string memory tokenURI, string memory tokenUUID)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(owner, newItemId);
        _setTokenURI(newItemId, tokenURI);
        nfts[newItemId] = tokenUUID;
        emit tokenCreated(newItemId);
        return newItemId;
    }

    function transferNFT(uint256 tokenId, string memory _uuid) public {
        require( keccak256(abi.encodePacked(nfts[tokenId])) == keccak256(abi.encodePacked(_uuid)), "No nft found");

        _transfer(owner, msg.sender, tokenId);
    }

    function getLastId() public view returns (uint256){
        return _tokenIds.current();
    }

    event tokenCreated(uint256 tokenId);
}
