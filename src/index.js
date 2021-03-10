const fs = require('fs');
const delay = require('delay');
const { ethers } = require('ethers');
const { makeRequest, getRequestProof } = require('./band');

const network = 'kovan';
const privateKey = process.env.PRIVATE_KEY;
const infuraProjectID = process.env.INFURA_PROJECT_ID;

const stdReferenceContractAddress = '0x37a3aF1326d60d6Ddc663061Aa0ED572Fb003777';

const symbol = 'KP3R';

(async () => {
  const symbols = [symbol];

  const provider = new ethers.providers.InfuraProvider(network, infuraProjectID);
  const wallet = new ethers.Wallet(privateKey).connect(provider);

  const StdReferenceABI = JSON.parse(fs.readFileSync('src/abi/StdReference.json').toString());
  const StdReferenceContract = new ethers.Contract(
    stdReferenceContractAddress,
    StdReferenceABI,
    wallet
  );

  console.log('---Requesting Data from BandChain---');
  console.log('Requesting prices of: ' + symbols.toString());
  const requestID = await makeRequest(symbols);
  console.log(
    `Price data requested with ID: ${requestID} (https://cosmoscan.io/request/${requestID})`
  );

  // Wait for request to resolve
  await delay(20000);

  // Fetch proof
  const proof = await getRequestProof(requestID);
  console.log('\n---Feeding Prices to StdReference Contract---');

  // Relaying request proof to contract
  const tx = await StdReferenceContract.relayWithProof('0x' + proof);
  console.log('Transaction sent with hash: ' + tx.hash);

  // Wait for request to resolve
  await delay(30000);

  // Fetching prices from contract
  console.log('\n---Fetching Price Data from Contract---');
  const price = await StdReferenceContract.getReferenceData(symbol, 'USD');
  console.log(`${symbol} price: ${ethers.utils.formatUnits(price.rate, 18)} USD`);
})();
