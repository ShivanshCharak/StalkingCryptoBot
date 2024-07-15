const solanaWeb3 = require('@solana/web3.js');
const Binance = require('node-binance-api');

// Replace with your public key
const publicKey = new solanaWeb3.PublicKey('ATX9RMqiKrzbzM1fkyXfQfgWAter5ZiNxyCuqK632ZJt');

// Connect to the Solana devnet cluster
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

// Binance API credentials
const binance = new Binance().options({
  APIKEY: 'T8wJRqePJsaliFX9RrN8yAzdBrBSR3fSYMXgvxqtMTCHdBmN2WUnlVxE9qh2ijaK',
  APISECRET: 'WZf5Hawru9qNp5ueYPaN4YTdNOnRLXRX6r5oq4PRmdyrrGzpWpyZjKrspSJl1dJw'
});

async function trackTransactions() {
  console.log('Tracking transactions for public key:', publicKey.toBase58());

  // Use onLogs to monitor logs for the specified public key
  const subscriptionId = connection.onLogs(publicKey, (logInfo) => {
    const { logs, signature } = logInfo;

    console.log(`Detected transaction with signature ${signature}`);

    // Fetch transaction details using the signature
    connection.getTransaction(signature).then((transaction) => {
      if (transaction) {
        console.log('Transaction details:', transaction);

        // Check if it's a buy operation
        // (Add your logic to determine if it's a buy operation)

        // If it's a buy operation, make a purchase on Binance
        buyTokensOnBinance();
      }
    }).catch((err) => {
      console.error('Error fetching transaction:', err);
    });
  });

  console.log('Subscription ID:', subscriptionId);
}

async function buyTokensOnBinance() {
  // Replace with your desired token and amount
  const symbol = 'BETABNB';
  const quantity = 0.001;
  const price = await binance.prices()
  console.log(price)
  binance.marketBuy(symbol, quantity, (error, response) => {
    if (error) {
      console.error('Error buying tokens on Binance:', error.body);
      return;
    }
    console.log('Bought tokens on Binance:', response);
  });
}

trackTransactions();
