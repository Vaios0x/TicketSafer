const { ethers } = require("hardhat");

// LayerZero Endpoints para Testnets
const LZ_ENDPOINTS = {
  sepolia: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
  arbitrumSepolia: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
  optimismSepolia: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
  baseSepolia: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
  polygonAmoy: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
  fuji: "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706"  // Endpoint de Fuji
};

// Chain IDs de LayerZero
const CHAIN_IDS = {
  sepolia: 1,
  arbitrumSepolia: 2,
  optimismSepolia: 3,
  baseSepolia: 4,
  polygonAmoy: 5,
  fuji: 6
};

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Obtener el nombre de la red actual
  const network = await ethers.provider.getNetwork();
  const networkName = network.name;

  console.log("Network:", networkName);

  // Obtener el endpoint de LayerZero para esta red
  const lzEndpoint = LZ_ENDPOINTS[networkName];
  if (!lzEndpoint) {
    throw new Error(`No LayerZero endpoint configured for ${networkName}`);
  }

  // Desplegar el contrato
  const CrossChainTicket = await ethers.getContractFactory("CrossChainTicket");
  const ticket = await CrossChainTicket.deploy(lzEndpoint);
  await ticket.deployed();

  console.log("CrossChainTicket deployed to:", ticket.address);

  // Configurar trusted remotes para otras redes
  console.log("Setting up trusted remotes...");
  
  // Aquí necesitarías las direcciones de los contratos en otras redes
  // Este es un ejemplo de cómo se configuraría
  const remoteAddresses = {
    sepolia: "0x...",        // Llenar con la dirección real
    arbitrumSepolia: "0x...", // Llenar con la dirección real
    optimismSepolia: "0x...", // Llenar con la dirección real
    baseSepolia: "0x...",    // Llenar con la dirección real
    polygonAmoy: "0x...",    // Llenar con la dirección real
    fuji: "0x..."           // Llenar con la dirección real
  };

  // Configurar trusted remotes para cada red
  for (const [chain, address] of Object.entries(remoteAddresses)) {
    if (chain !== networkName && address) {
      const chainId = CHAIN_IDS[chain];
      // El path es la dirección del contrato en la otra red
      const path = ethers.utils.solidityPack(
        ['address', 'address'],
        [address, ticket.address]
      );
      
      try {
        await ticket.setTrustedRemote(chainId, path);
        console.log(`Trusted remote set for ${chain}`);
      } catch (error) {
        console.error(`Error setting trusted remote for ${chain}:`, error);
      }
    }
  }

  console.log("Deployment and configuration completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 