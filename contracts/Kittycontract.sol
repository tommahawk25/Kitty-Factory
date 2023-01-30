// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./Ownable.sol";

contract Kittycontract is IERC721, Ownable {

    uint256 public constant CREATION_LIMIT_GEN0 = 10;
    string public constant name = "SekyKitties";
    string public constant symbol = "SK";

    bytes4 internal constant ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    bytes4 private constant _INTERFACE_ID_ERC_721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC_165 = 0x01ffc9a7;

    event Birth(address owner, uint256 tokenId, uint256 mumId, uint256 dadId, uint256 genes, uint256 generation);

    struct Kitty {
        uint256 genes;
        uint256 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    Kitty[] kitties;

    mapping(address => uint256) ownershipTokenCount;
    mapping(uint256 => address) public ownerOfToken;
    mapping (uint256 => address) public tokenIdToApproved;
    mapping(address => mapping(address => bool)) private toApprovedAll; //owner address => operator address => bool

    uint256 public gen0Counter;

/*     constructor() public {
        _createKitty(0, 0, 0, 0, address(0));
    } */

    function breed(uint256 _dadId, uint256 _mumId) public returns (uint256 tokenId) {
        require(_owns(msg.sender, _dadId), "You don't own the token");
        require(_owns(msg.sender, _mumId), "You don't own the token"); 

        (,,,uint256 dadGeneration, uint256 dadGenes,) = getKitty(_dadId); 
        (,,,uint256 mumGeneration, uint256 mumGenes,) = getKitty(_mumId); 

        uint256 kittyGenes = _mixGenes(dadGenes, mumGenes);
        uint256 kittyGeneration = _kittyGeneration(dadGeneration, mumGeneration);

        _createKitty(_mumId, _dadId, kittyGeneration, kittyGenes, msg.sender);  
        return tokenId;
    }

    function _mixGenes (uint256 _dadGenes, uint256 _mumGenes) view internal returns (uint256) {
         // Takes first half of dad genes and second half of mum genes and connects it to create new kitty genes.
/*         uint256 firstHalf = _dadGenes / 100000;
        uint256 secondHalf = _mumGenes % 100000;
        uint256 kittyGenes = firstHalf * 100000 + secondHalf;
        return kittyGenes; */
    
        uint256[8] memory genesArray;
        uint8 random = uint8(block.timestamp % 255); //binary number between 00000000-11111111
        uint256 i;
        uint256 index = 7;
        uint256 kittyGenes = 0;

        for (i = 1; i <= 128; i = i * 2) {
            if(random & i != 0) {
                genesArray[index] = uint8(_mumGenes % 100);
            }
            else {
                genesArray[index] = uint8(_dadGenes % 100);
            }
            _mumGenes /= 100;
            _dadGenes /= 100;
            if (index == 0) {
                break;
            }
            else {
                index--;
            }
        }
/*
        bitwise operator &
        00000001 = 1
        00000010 = 2
        00000100 = 4
        00001000 = 8
        00010000 = 16
        00100000 = 32
        01000000 = 64
        10000000 = 128
        */

        for (i = 0; i <= 7 ; i++) {
            kittyGenes *= 100;
            kittyGenes += genesArray[i];        
        }

        return kittyGenes;
    }

    function _kittyGeneration(uint256 _dadGeneration, uint256 _mumGeneration) pure internal returns (uint256) {
        uint256 kittyGeneration;
        if (_dadGeneration > _mumGeneration) {
            kittyGeneration = _dadGeneration + 1;
        }
        else if (_mumGeneration > _dadGeneration) {
            kittyGeneration = _mumGeneration + 1;
        }
        else {
            kittyGeneration = _dadGeneration + 1;
        }
        return kittyGeneration;
    }
        
    function supportInterface(bytes4 _interfaceId) external pure returns (bool) {
        return (_interfaceId == _INTERFACE_ID_ERC_721 || _interfaceId == _INTERFACE_ID_ERC_165);
    }

    function approve(address _approved, uint256 _tokenId) external {
        require(_owns(msg.sender, _tokenId) || msg.sender == tokenIdToApproved[_tokenId]);
        _approve(_approved, _tokenId);
        emit Approval(ownerOfToken[_tokenId], _approved, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) external {
        require(_operator != msg.sender);
        _setApprovalForAll(_operator, _approved);
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function getApproved(uint256 _tokenId) external view returns (address) {
        require(_tokenId < kitties.length);
        return tokenIdToApproved[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator) public view returns (bool) {
        return toApprovedAll[_owner][_operator];
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) external {
        require(_isOwnerOrApproved(_from, _to, _tokenId));
        _safeTransfer(_from, _to, _tokenId, data);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external {
        require(_isOwnerOrApproved(_from, _to, _tokenId));
        _safeTransfer(_from, _to, _tokenId, "");
    }

    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory data) internal {
        _transfer(_from, _to, _tokenId);
        require(_checkERC721Support(_from, _to, _tokenId, data));
    }

    function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory data) internal returns (bool) {
        if(!_isContract(_to)) {
            return true;
        }
        else {
            //Call onERC721Received in the _to contract
            bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, data);
            //Check return value
            return returnData == ERC721_RECEIVED;
        }
    }

    function _isContract(address _to) view internal returns (bool) {
        uint32 size;
        assembly{
            size := extcodesize(_to)
        }
        return size > 0;
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external {
        require(_isOwnerOrApproved(_from, _to, _tokenId));
        _transfer(_from, _to, _tokenId);
    }

    function getKitty(uint256 _tokenId) public view returns (
        uint256 birthTime,
        uint256 mumId,
        uint256 dadId,
        uint256 generation,
        uint256 genes,
        address owner
    ) {
        Kitty storage kitty = kitties[_tokenId]; // We create only a pointer, because storage is already created. By creating memory we would duplicate the storage.

        birthTime = uint256(kitty.birthTime); // It's better to display uint256 on frontend.
        mumId = uint256(kitty.mumId);
        dadId = uint256(kitty.dadId);
        generation = uint256(kitty.generation);
        genes = kitty.genes;
        owner = ownerOfToken[_tokenId];
    }

    function getKittyGenes(uint256 _tokenId) public view returns (uint256 kittyGenes) {
        Kitty storage kitty = kitties[_tokenId]; // We create only a pointer, because storage is already created. By creating memory we would duplicate the storage.

        kittyGenes = kitty.genes;
    }

        function getKittyGeneration(uint256 _tokenId) public view returns (uint256 kittyGeneration) {
        Kitty storage kitty = kitties[_tokenId]; // We create only a pointer, because storage is already created. By creating memory we would duplicate the storage.

        kittyGeneration = uint256(kitty.generation);
    }


    function createKittyGen0(uint256 _genes) public onlyOwner {
        require(gen0Counter < CREATION_LIMIT_GEN0);
        gen0Counter++;
        _createKitty(0, 0, 0, _genes, msg.sender);
    }

    function _createKitty(
        uint256 _mumId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) private returns (uint256 tokenId) {
        Kitty memory _kitty = Kitty({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });

        kitties.push(_kitty);
        tokenId = kitties.length - 1;
        ownerOfToken[tokenId] = _owner;
        _transfer(address(0), _owner, tokenId);
        emit Birth(_owner, tokenId, _mumId, _dadId, _genes, _generation);
        return tokenId;
    }

    function balanceOf(address owner) public view returns (uint256 balance) {
        return ownershipTokenCount[owner];
    }

    function totalSupply() public view returns (uint256 total) {
        return kitties.length;
    }


    function ownerOf(uint256 _tokenId) external view returns (address owner) {
        return ownerOfToken[_tokenId];
    }

    function transfer(address _to, uint256 _tokenId) external {
        require(_to != address(0));
        require(_to != address(this));
        require(_owns(msg.sender, _tokenId));
        _transfer(msg.sender, _to, _tokenId);
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        ownerOfToken[_tokenId] = _to;
        ownershipTokenCount[_to]++;
        if (_from != address(0)) {
               ownershipTokenCount[_from]--;
               delete tokenIdToApproved[_tokenId];
        }
        emit Transfer(msg.sender, _to, _tokenId);
    }

    function _owns(address _sender, uint256 _tokenId) internal view returns (bool) {
        return _sender == ownerOfToken[_tokenId];
    }

    function _approve(address _approved, uint256 _tokenId) internal {
        tokenIdToApproved[_tokenId] = _approved;
    }

    function _setApprovalForAll(address _operator, bool _approved) internal {
        toApprovedAll[msg.sender][_operator] = _approved;
    }

    function _approvedFor(address _approved, uint256 _tokenId) internal view returns (bool) {
        return _approved == tokenIdToApproved[_tokenId];
    }

    function _isOwnerOrApproved(address _from, address _to, uint256 _tokenId) internal view returns (bool) {
        require(_owns(_from, _tokenId));
        require(_to != address(0));
        require(_tokenId < kitties.length);

        return (msg.sender == _from || _approvedFor(msg.sender, _tokenId) || isApprovedForAll(_from, msg.sender));  
    }

    function tokensOfOwner(address _owner) public view returns(uint256[] memory ownerTokens) {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalCats = totalSupply();
            uint256 resultIndex = 0;

            uint256 catId;

            for (catId = 1; catId <= totalCats; catId++) {
                if (ownerOfToken[catId] == _owner) {
                    result[resultIndex] = catId;
                    resultIndex++;
                }
            }
            return result;
        }
    }
}
