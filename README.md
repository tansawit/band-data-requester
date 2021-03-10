# Band Data Requester

This repository contains a proof-of-concept implementation of the flow of requesting price data on BandChain and feeding it to Band's `StdReference` contract on the Ethereum Kovan Testnet.

## Flow

- User send a request to Band's oracle network (e.g. for the price of a cryptocurrency token)
- BandChain's validators goes out to fetch data from the specified data sources and then aggregates the results into a single final result and store it on-chain
- The user then fetches the proof of that request and relay it to our `StdReference` contract by calling `relayWithProof`.
- The `StdReference` then passes the proof bytes to our `Bridge` contract to verify the validity of the proof. If successful, the decoded price data is saved. (See this [explainer article](https://medium.com/bandprotocol/understanding-band-oracle-3-lite-client-verification-d03ed3f4ccb8) for more details)
- The price data on the contract is now updated for anyone to use through calling the `getReferenceData` and `getReferenceDataBulk` methods.

## References

### Documentatation

#### Band Standard Dataset

- [Documentation](https://docs.bandchain.org/band-standard-dataset/)

#### Band Oracle Data Request Explainer Series

- [Concepts: Data Sources and Oracle Scripts](https://medium.com/bandprotocol/understanding-band-oracle-1-oracle-scripts-and-data-sources-5d49847b4316)
- [Requesting Data on BandChain](https://medium.com/bandprotocol/understanding-band-oracle-2-requesting-data-on-bandchain-b3fde67072a)
- [Lite Client Verification](https://medium.com/bandprotocol/understanding-band-oracle-3-lite-client-verification-d03ed3f4ccb8)

### Contracts

#### Bridge

Kovan Contract Address: [`0x9268E5957D6Ecd55CC62BCBB1965938Cd643252D`](https://kovan.etherscan.io/address/0x9268E5957D6Ecd55CC62BCBB1965938Cd643252D#code)

#### StdReference

Kovan Contract Address: [`0x37a3aF1326d60d6Ddc663061Aa0ED572Fb003777`](https://kovan.etherscan.io/address/0x37a3aF1326d60d6Ddc663061Aa0ED572Fb003777#code)
