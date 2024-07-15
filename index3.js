const solanaWeb3 = require('@solana/web3.js')
const publicKey = new solanaWeb3.PublicKey('ATX9RMqiKrzbzM1fkyXfQfgWAter5ZiNxyCuqK632ZJt')
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet','confirmed'));
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
              // Add your logic to determine if it's a buy operation
          }
      }).catch((err) => {
          console.error('Error fetching transaction:', err);
      });
  });

  console.log('Subscription ID:', subscriptionId);
}
trackTransactions()
// trackTransaction(new PublicKey("ATX9RMqiKrzbzM1fkyXfQfgWAter5ZiNxyCuqK632ZJt"))