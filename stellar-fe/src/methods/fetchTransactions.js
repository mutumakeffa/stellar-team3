// 🌎 Importing Stellar SDK JS library
import StellarSdk from "stellar-sdk";
// 🌎 Importing constants
import { NETWORK_URL } from "../constants";

export const fetchTransactions = async () => {
  // 🚀 Creating server instance with Stellar test network
  const server = new StellarSdk.Server(NETWORK_URL);

    try {
        let response = await server.transactions().call();
        let transactions = response.records;
        transactions.map(transaction => {
            <p>transaction</p>
        })

    } catch (error) {
        console.log(error)
    }
}

