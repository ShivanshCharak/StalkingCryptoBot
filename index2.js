// const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
// const fs = require('fs');

// async function loadKeypairFromFile(filePath) {
//   const keypairData = JSON.parse(fs.readFileSync(filePath));
//   return Keypair.fromSecretKey(Uint8Array.from(keypairData));
// }

// async function executeBinanceTrade(symbol, quantity, buy) {
//   // Implement your Binance trading logic here
//   console.log(`${buy ? 'Buying' : 'Selling'} ${quantity} of ${symbol} on Binance...`);
//   // Simulate delay for trade execution
//   return new Promise(resolve => setTimeout(resolve, 1000));
// }

// async function monitorAndTrade() {
//   try {
//     const connection = new Connection('https://api.testnet.solana.com', 'confirmed');
//     const keypairFilePath = '/home/shivansh/my-solana-wallet.json';
//     const keypair = await loadKeypairFromFile(keypairFilePath);
//     const holderPublicKey = new PublicKey('ATX9RMqiKrzbzM1fkyXfQfgWAter5ZiNxyCuqK632ZJt');
//     const specificTokenMint = new PublicKey('CiKu4eHsVrc1eueVQeHn7qhXTcVu95gSQmBpX4utjL9z');

//     console.log(`Monitoring transactions for wallet ${holderPublicKey.toBase58()} on testnet...`);

//     // Listen for all signature notifications
//     connection.onLogs(holderPublicKey, async (logs, context) => {
//       try {
//         console.log('Transaction detected:', JSON.stringify(logs, null, 2));

//         const solanaTransfer = logs.logs.some(log => log.includes('SOL') || log.includes('system_instruction'));
//         const specificTokenTransfer = logs.logs.some(log => log.includes(specificTokenMint.toBase58()));

//         if (solanaTransfer) {
//           console.log('Holder received or transferred SOL. Simulating buy trade...');
//           await executeBinanceTrade('SOLUSDT', 1, true);
//         } else if (specificTokenTransfer) {
//           console.log('Holder interacted with the specific token. Simulating sell trade...');
//           await executeBinanceTrade('SOLUSDT', 1, false);
//         } else {
//           console.log('Transaction detected, but not involving SOL or the specific token');
//         }
//       } catch (err) {
//         console.error('Error processing logs:', err);
//       }
//     }, 'confirmed');

//     // Additionally, listen for balance changes
//     let prevBalance = await connection.getBalance(holderPublicKey);
//     setInterval(async () => {
//       try {
//         const currentBalance = await connection.getBalance(holderPublicKey);
//         if (currentBalance !== prevBalance) {
//           console.log(`Balance changed from ${prevBalance} to ${currentBalance}`);
//           if (currentBalance > prevBalance) {
//             console.log('Balance increased. Simulating buy trade...');
//             await executeBinanceTrade('SOLUSDT', 1, true);
//           }
//           prevBalance = currentBalance;
//         }
//       } catch (err) {
//         console.error('Error checking balance:', err);
//       }
//     }, 10000); // Check every 10 seconds

//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// monitorAndTrade();
const { Connection, PublicKey } = require('@solana/web3.js');

async function monitorWallet() {
  try {
    const connection = new Connection('https://api.testnet.solana.com', 'confirmed');
    const holderPublicKey = new PublicKey('ATX9RMqiKrzbzM1fkyXfQfgWAter5ZiNxyCuqK632ZJt'); // Replace with your wallet's public key

    console.log(`Monitoring transactions for wallet ${holderPublicKey.toBase58()} on testnet...`);

    // Listen for logs related to the public key
    connection.onLogs(holderPublicKey, async (logs, context) => {
      try {
        console.log('Transaction detected:', JSON.stringify(logs, null, 2));

        const solanaTransfer = logs.logs.some(log => log.includes('system_instruction::transfer') || log.includes('native::transfer'));

        if (solanaTransfer) {
          console.log('SOL transfer detected in the transaction.');
        } else {
          console.log('Transaction detected, but not involving SOL transfers.');
        }
      } catch (err) {
        console.error('Error processing logs:', err);
      }
    }, 'confirmed');

    // Additionally, listen for balance changes
    let prevBalance = await connection.getBalance(holderPublicKey);
    setInterval(async () => {
      try {
        const currentBalance = await connection.getBalance(holderPublicKey);
        if (currentBalance !== prevBalance) {
          console.log(`Balance changed from ${prevBalance} to ${currentBalance}`);
          prevBalance = currentBalance;
        }
      } catch (err) {
        console.error('Error checking balance:', err);
      }
    }, 10000); // Check every 10 seconds

  } catch (error) {
    console.error('Error:', error);
  }
}

monitorWallet();
