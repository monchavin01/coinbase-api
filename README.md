# Coinbase API CLI Tool

A command-line interface tool for interacting with the Coinbase Exchange API. This tool provides easy-to-use commands for common Coinbase operations like viewing accounts, checking orders, and placing trades.

## Prerequisites

- Node.js installed
- npm or yarn package manager
- Coinbase API credentials (key, secret, and passphrase)

## Installation

1. Install dependencies:

```bash
npm install
```

## Configuration

The tool uses the following Coinbase API credentials which are configured in `coinbase.js`:

- API Key
- API Secret
- API Passphrase

Make sure to update these with your own credentials before using the tool.

## Available Commands

### 1. Get Account Information

View all your Coinbase account balances and information:

```bash
make get-accounts
```

### 2. Get Order Details

Retrieve details of a specific order by its ID:

```bash
make get-order
```

You will be prompted to enter the order ID.

### 3. Place Sell Order

Create a new sell order with an interactive menu:

```bash
make place-sell
```

You will be prompted to:

1. Select a product ID from the available options:
   - BTC-USD
   - ETH-USD
   - USDT-USD
2. Enter the size (amount) to sell

### 4. Place Buy Order

Create a new buy order with an interactive menu:

```bash
make place-buy
```

You will be prompted to:

1. Select a product ID from the available options:
   - BTC-USD
   - ETH-USD
   - USDT-USD
2. Enter the size (amount) to buy

## Example Usage

### Placing a Buy Order

```bash
$ make place-buy
Select product ID:
1) BTC-USD
2) ETH-USD
3) USDT-USD
Choose product (1-3): 1
Enter size (e.g., 0.001): 0.001
```

### Placing a Sell Order

```bash
$ make place-sell
Select product ID:
1) BTC-USD
2) ETH-USD
3) USDT-USD
Choose product (1-3): 2
Enter size (e.g., 0.001): 0.005
```

### Checking Order Status

```bash
$ make get-order
Enter order ID: abc123def456
```

## Error Handling

The tool includes comprehensive error handling:

- Invalid API credentials
- Network connection issues
- Invalid order parameters
- Insufficient funds
- Invalid product IDs

All errors are clearly displayed with relevant error messages.

## Security Notes

- Never commit your API credentials to version control
- Use environment variables for sensitive information in production
- The tool uses the Coinbase sandbox environment by default

## Contributing

Feel free to submit issues and enhancement requests!
