# StalkingCryptoBot

## Solana Transaction Tracker and Token Trading Bot
- This project is a Node.js application that tracks transactions at a specific location in the Solana wallet and simulates token trading on Binance as a change in the wallet. The application uses the Solana Web3.js library to connect to the Solana blockchain and track transactions. When a transaction is detected, the app checks the balance of the wallet and makes a simulated purchase or sale of the token. Balance before and after transactions
- In that simulated environment the price of the specifed token will increase by specific persent, whenever someone buys the token and decrease if someone sells the same token

### Bought solana
```
Tracking transactions for public key: ATX9RMqiKrzbzM1fkyXfQfgWAter5ZiNxyCuqK632ZJt
Initial balance: 25.89976
Subscription ID: 0
Detected transaction with signature 55fboph9kGHyzUYZrqfkCZ1Tfw2NcKiH2W6oeknbv4bseLz2r4BKx77nM75LPp1uZpQgQR75UFYwBPLcHfhoXLFd
Current balance: 30.89976
The User bought solana..
Buying RNDRBUSD token...
New price of RNDRBUSD: 3.05520000
```
### Buying  token

```
Detected transaction with signature 5v8wb9PVDUZgfJCT1Ni6wwrMAmgqwpTuC3yBEWU1v3rpWPdM2nK5PoTvw8ZLnbjZBAN9tbSXWRfnz1SQcwDTAzB
Current balance: 30.899745
The User buying the token..
Selling RNDRBUSD token...
New price of RNDRBUSD: 3.03992400
```
