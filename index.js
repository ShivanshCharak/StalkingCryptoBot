const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs');

const publicKey = new solanaWeb3.PublicKey('ATX9RMqiKrzbzM1fkyXfQfgWAter5ZiNxyCuqK632ZJt');
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');


const data = fs.readFileSync('./CryptoPrices.json', 'utf-8');
const cryptoPrices = JSON.parse(data);

console.log('Current Prices:', cryptoPrices);

// this function will increase the price by 0.5%
function increasePrice(price) {
  return (price * 1.005).toFixed(8);
}

// this function will decrease the price by 0.5%
function decreasePrice(price) {
  return (price * 0.995).toFixed(8);
}

// it will buy the hardcoded token
function buyToken(token) {
  console.log(`Buying ${token} token...`);
  cryptoPrices[token] = increasePrice(cryptoPrices[token]);
  console.log(`New price of ${token}: ${cryptoPrices[token]}`);
}

// it will sell the hardcoded token
function sellToken(token) {
  console.log(`Selling ${token} token...`);
  cryptoPrices[token] = decreasePrice(cryptoPrices[token]);
  console.log(`New price of ${token}: ${cryptoPrices[token]}`);
}

// function for getting the balance of new wallet
async function getWalletBalance() {
  const balance = await connection.getBalance(publicKey);
  return balance / solanaWeb3.LAMPORTS_PER_SOL;
}

// Function for tracking transactions and balance changes
async function trackTransactions() {
  console.log('Tracking transactions for public key:', publicKey.toBase58());

  // Get the initial balance
  let previousBalance = await getWalletBalance();
  console.log('Initial balance:', previousBalance);

  // Using onLogs to monitor logs for the specified public key
  const subscriptionId = connection.onLogs(publicKey, async (logInfo) => {
    const { logs, signature } = logInfo;

    console.log(`Detected transaction with signature ${signature}`);

    // it fetches transaction details using the signature
    try {
      const transaction = await connection.getTransaction(signature);
      if (transaction) {
        // it gets the new balance after the transaction
        const currentBalance = await getWalletBalance();
        console.log('Current balance:', currentBalance);

        // it compare the balances to determine buy or sell
        if (currentBalance > previousBalance) {
          buyToken('RNDRBUSD');
        } else if (currentBalance < previousBalance) {
          sellToken('RNDRBUSD');
        }

        // it updates the previous balance
        previousBalance = currentBalance;
      }
    } catch (err) {
      console.error('Error fetching transaction:', err);
    }
  });

  console.log('Subscription ID:', subscriptionId);
}

trackTransactions();
