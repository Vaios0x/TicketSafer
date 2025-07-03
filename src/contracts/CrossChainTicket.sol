// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@layerzerolabs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";

/**
 * @title CrossChainTicket
 * @dev NFT Ticket system with cross-chain capabilities using LayerZero
 */
contract CrossChainTicket is ERC721, Ownable, ReentrancyGuard, NonblockingLzApp {
    // ============ Constants ============

    // Chain IDs for supported networks
    uint16 public constant SEPOLIA_CHAIN_ID = 1;           // Ethereum Sepolia
    uint16 public constant ARB_SEPOLIA_CHAIN_ID = 2;      // Arbitrum Sepolia
    uint16 public constant OP_SEPOLIA_CHAIN_ID = 3;       // Optimism Sepolia
    uint16 public constant BASE_SEPOLIA_CHAIN_ID = 4;     // Base Sepolia
    uint16 public constant POLYGON_AMOY_CHAIN_ID = 5;     // Polygon Amoy
    uint16 public constant FUJI_CHAIN_ID = 6;             // Avalanche Fuji

    // ============ Storage ============

    // Mapping from ticket ID to its original chain ID
    mapping(uint256 => uint16) public originalChain;
    
    // Mapping from ticket ID to its current chain ID
    mapping(uint256 => uint16) public currentChain;
    
    // Mapping from ticket ID to its locked status
    mapping(uint256 => bool) public isLocked;
    
    // Counter for ticket IDs
    uint256 private _ticketIdCounter;

    // Mapping for trusted remote addresses on different chains
    mapping(uint16 => bytes) public trustedRemoteLookup;

    // ============ Events ============

    event TicketMinted(address indexed to, uint256 indexed ticketId);
    event TicketBridgeInitiated(uint256 indexed ticketId, uint16 indexed targetChain);
    event TicketBridgeCompleted(uint256 indexed ticketId, uint16 indexed sourceChain);
    event ChainPathAdded(uint16 indexed chainId, bytes path);
    event BridgingPaused(bool paused);

    // ============ Errors ============

    error TicketLocked();
    error InvalidChainId();
    error InvalidPath();
    error BridgingPaused();
    error NotTicketOwner();

    // ============ Constructor ============

    constructor(
        address _lzEndpoint
    ) ERC721("TicketSafer", "TSAFE") NonblockingLzApp(_lzEndpoint) {
        _ticketIdCounter = 1;
    }

    // ============ External Functions ============

    /**
     * @dev Mints a new ticket
     * @param to Address to mint the ticket to
     */
    function mintTicket(address to) external returns (uint256) {
        uint256 ticketId = _ticketIdCounter++;
        
        originalChain[ticketId] = uint16(block.chainid);
        currentChain[ticketId] = uint16(block.chainid);
        
        _safeMint(to, ticketId);
        
        emit TicketMinted(to, ticketId);
        return ticketId;
    }

    /**
     * @dev Initiates the bridge of a ticket to another chain
     * @param ticketId The ID of the ticket to bridge
     * @param targetChain The chain ID to bridge to
     */
    function bridgeTicket(
        uint256 ticketId,
        uint16 targetChain
    ) external payable nonReentrant {
        // Validaciones
        if (!_isApprovedOrOwner(msg.sender, ticketId)) revert NotTicketOwner();
        if (isLocked[ticketId]) revert TicketLocked();
        if (trustedRemoteLookup[targetChain].length == 0) revert InvalidChainId();

        // Bloquear el ticket en esta cadena
        isLocked[ticketId] = true;
        
        // Preparar datos para enviar
        bytes memory payload = abi.encode(
            ticketId,
            msg.sender,
            currentChain[ticketId],
            originalChain[ticketId]
        );

        // Enviar mensaje cross-chain
        _lzSend(
            targetChain,
            payload,
            payable(msg.sender),
            address(0x0),
            bytes(""),
            msg.value
        );

        emit TicketBridgeInitiated(ticketId, targetChain);
    }

    // ============ Internal Functions ============

    /**
     * @dev Handles the receipt of a LayerZero message
     * @param _srcChainId The source chain ID
     * @param _srcAddress The source address
     * @param _payload The payload of the message
     */
    function _nonblockingLzReceive(
        uint16 _srcChainId,
        bytes memory _srcAddress,
        bytes memory _payload
    ) internal override {
        // Decodificar payload
        (
            uint256 ticketId,
            address recipient,
            uint16 previousChain,
            uint16 originalChainId
        ) = abi.decode(_payload, (uint256, address, uint16, uint16));

        // Verificar que el mensaje viene de una fuente confiable
        require(
            _srcAddress.length == trustedRemoteLookup[_srcChainId].length &&
            keccak256(_srcAddress) == keccak256(trustedRemoteLookup[_srcChainId]),
            "Invalid source"
        );

        // Actualizar estado del ticket
        currentChain[ticketId] = uint16(block.chainid);
        originalChain[ticketId] = originalChainId;
        
        // Mintear el ticket en esta cadena
        _safeMint(recipient, ticketId);

        emit TicketBridgeCompleted(ticketId, _srcChainId);
    }

    // ============ Admin Functions ============

    /**
     * @dev Sets the trusted remote address for a chain
     * @param _chainId The chain ID
     * @param _path The path to the trusted remote
     */
    function setTrustedRemote(
        uint16 _chainId,
        bytes calldata _path
    ) external onlyOwner {
        trustedRemoteLookup[_chainId] = _path;
        emit ChainPathAdded(_chainId, _path);
    }

    /**
     * @dev Estimates fees for bridging
     * @param _targetChain The target chain ID
     * @param _payload The payload to send
     */
    function estimateFees(
        uint16 _targetChain,
        bytes calldata _payload
    ) external view returns (uint256 nativeFee, uint256 zroFee) {
        return lzEndpoint.estimateFees(
            _targetChain,
            address(this),
            _payload,
            false,
            bytes("")
        );
    }
} 