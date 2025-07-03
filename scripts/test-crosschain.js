const { ethers } = require("hardhat");

// Chain IDs para las pruebas
const CHAIN_IDS = {
  SEPOLIA: 1,
  ARB_SEPOLIA: 2,
  OP_SEPOLIA: 3,
  BASE_SEPOLIA: 4,
  POLYGON_AMOY: 5,
  FUJI: 6
};

// Tiempos estimados de finalización por red (en segundos)
const FINALITY_TIMES = {
  [CHAIN_IDS.SEPOLIA]: 180,      // ~3 minutos
  [CHAIN_IDS.ARB_SEPOLIA]: 120,  // ~2 minutos
  [CHAIN_IDS.OP_SEPOLIA]: 120,   // ~2 minutos
  [CHAIN_IDS.BASE_SEPOLIA]: 120, // ~2 minutos
  [CHAIN_IDS.POLYGON_AMOY]: 180, // ~3 minutos
  [CHAIN_IDS.FUJI]: 180          // ~3 minutos
};

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Testing with account:", deployer.address);

  // Obtener la instancia del contrato (asume que ya está desplegado)
  const CrossChainTicket = await ethers.getContractFactory("CrossChainTicket");
  const ticket = await CrossChainTicket.attach("DIRECCIÓN_DEL_CONTRATO"); // Reemplazar con la dirección real

  console.log("Testing CrossChainTicket functionality...");

  try {
    // 1. Mint un nuevo ticket
    console.log("\n1. Minting new ticket...");
    const mintTx = await ticket.mintTicket(deployer.address);
    const mintReceipt = await mintTx.wait();
    
    // Obtener el ID del ticket del evento
    const mintEvent = mintReceipt.events.find(e => e.event === 'TicketMinted');
    const ticketId = mintEvent.args.ticketId;
    console.log(`Ticket minted with ID: ${ticketId}`);

    // 2. Verificar el estado inicial del ticket
    console.log("\n2. Checking initial ticket state...");
    const originalChain = await ticket.originalChain(ticketId);
    const currentChain = await ticket.currentChain(ticketId);
    console.log(`Original Chain: ${originalChain}`);
    console.log(`Current Chain: ${currentChain}`);

    // 3. Probar bridge a diferentes redes
    const targetChains = [
      { id: CHAIN_IDS.ARB_SEPOLIA, name: "Arbitrum Sepolia" },
      { id: CHAIN_IDS.FUJI, name: "Avalanche Fuji" }
    ];

    for (const targetChain of targetChains) {
      console.log(`\n=== Testing bridge to ${targetChain.name} ===`);
      
      // Estimar fees
      console.log("\n3. Estimating bridge fees...");
      const payload = ethers.utils.defaultAbiCoder.encode(
        ['uint256', 'address', 'uint16', 'uint16'],
        [ticketId, deployer.address, currentChain, originalChain]
      );
      
      const [nativeFee, zroFee] = await ticket.estimateFees(targetChain.id, payload);
      console.log(`Native Fee: ${ethers.utils.formatEther(nativeFee)} ETH`);
      console.log(`ZRO Fee: ${ethers.utils.formatEther(zroFee)} ZRO`);

      // Iniciar el bridge
      console.log("\n4. Initiating bridge...");
      const bridgeTx = await ticket.bridgeTicket(ticketId, targetChain.id, {
        value: nativeFee
      });
      await bridgeTx.wait();
      console.log(`Bridge to ${targetChain.name} initiated!`);

      // Verificar el estado del ticket
      console.log("\n5. Checking ticket state after bridge initiation...");
      const isLocked = await ticket.isLocked(ticketId);
      console.log(`Ticket locked: ${isLocked}`);

      // Mostrar tiempo estimado de finalización
      const finalityTime = FINALITY_TIMES[targetChain.id];
      console.log(`\nEstimated finality time for ${targetChain.name}: ${finalityTime} seconds`);
      console.log(`Please check the ticket on ${targetChain.name} after this time.`);

      // Esperar antes de probar la siguiente red
      if (targetChains.indexOf(targetChain) < targetChains.length - 1) {
        console.log("\nWaiting for 30 seconds before next test...");
        await sleep(30000);
      }
    }

    console.log("\nAll tests completed successfully!");
    console.log("\nNote: Remember to verify the ticket reception on each destination chain");
    console.log("Finality times may vary depending on network conditions");

  } catch (error) {
    console.error("Error during testing:", error);
    throw error;
  }
}

// Función auxiliar para esperar un tiempo específico
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 