const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();

// Configuration
const API_CONFIG = {
  apiKey: process.env.COINBASE_API_KEY,
  apiSecret: process.env.COINBASE_API_SECRET,
  apiPassphrase: process.env.COINBASE_API_PASSPHRASE,
  baseURL: process.env.COINBASE_API_URL,
};

// Validate environment variables
function validateConfig() {
  const required = [
    "COINBASE_API_KEY",
    "COINBASE_API_SECRET",
    "COINBASE_API_PASSPHRASE",
    "COINBASE_API_URL",
  ];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("Error: Missing required environment variables:");
    console.error(missing.join(", "));
    console.error("Please check your .env file");
    process.exit(1);
  }
}

validateConfig();

// Create signature for authentication
function createSignature(timestamp, method, requestPath, body = "") {
  const message = timestamp + method + requestPath + body;
  const key = Buffer.from(API_CONFIG.apiSecret, "base64");
  const hmac = crypto.createHmac("sha256", key);
  return hmac.update(message).digest("base64");
}

// Create request configuration
function createRequestConfig(method, endpoint, body = "") {
  const timestamp = Date.now() / 1000;
  const signature = createSignature(timestamp, method, endpoint, body);

  return {
    method: method,
    url: `${API_CONFIG.baseURL}${endpoint}`,
    headers: {
      "Content-Type": "application/json",
      "cb-access-key": API_CONFIG.apiKey,
      "cb-access-passphrase": API_CONFIG.apiPassphrase,
      "cb-access-timestamp": timestamp,
      "cb-access-sign": signature,
    },
    ...(body && { data: body }),
  };
}

// Function to get accounts
async function getAccounts() {
  try {
    const config = createRequestConfig("GET", "/accounts");
    const response = await axios.request(config);
    console.log("Accounts data:");
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.log("Error getting accounts:");
    console.log(error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to get a single order by ID
async function getOrder(orderId) {
  try {
    const config = createRequestConfig("GET", `/orders/${orderId}`);
    const response = await axios.request(config);
    console.log("Order data:");
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.log("Error getting order:");
    console.log(error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to place a sell order
async function placeSellOrder(productId, size) {
  try {
    const orderData = {
      type: "market",
      side: "sell",
      product_id: productId,
      size: size,
    };

    const body = JSON.stringify(orderData);
    const config = createRequestConfig("POST", "/orders", body);

    const response = await axios.request(config);
    console.log("Sell order placed:");
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.log("Error placing sell order:");
    console.log(error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to place a buy order
async function placeBuyOrder(productId, size) {
  try {
    const orderData = {
      type: "market",
      side: "buy",
      product_id: productId,
      size: size,
    };

    const body = JSON.stringify(orderData);
    const config = createRequestConfig("POST", "/orders", body);

    const response = await axios.request(config);
    console.log("Buy order placed:");
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.log("Error placing buy order:");
    console.log(error.response ? error.response.data : error.message);
    throw error;
  }
}

// Command line interface
async function main() {
  const command = process.argv[2];

  switch (command) {
    case "accounts":
      await getAccounts();
      break;

    case "order":
      const orderId = process.argv[3];
      if (!orderId) {
        console.error("Usage: node coinbase.js order <order-id>");
        console.error("Example: node coinbase.js order 123abc-456def");
        process.exit(1);
      }
      await getOrder(orderId);
      break;

    case "sell":
      const sellProductId = process.argv[3];
      const sellSize = process.argv[4];

      if (!sellProductId || !sellSize) {
        console.error("Usage: node coinbase.js sell <product-id> <size>");
        console.error("Example: node coinbase.js sell BTC-USD 0.001");
        process.exit(1);
      }

      await placeSellOrder(sellProductId, sellSize);
      break;

    case "buy":
      const buyProductId = process.argv[3];
      const buySize = process.argv[4];

      if (!buyProductId || !buySize) {
        console.error("Usage: node coinbase.js buy <product-id> <size>");
        console.error("Example: node coinbase.js buy BTC-USD 0.001");
        process.exit(1);
      }

      await placeBuyOrder(buyProductId, buySize);
      break;

    default:
      console.error("Available commands:");
      console.error("  node coinbase.js accounts");
      console.error("  node coinbase.js order <order-id>");
      console.error("  node coinbase.js sell <product-id> <size>");
      console.error("  node coinbase.js buy <product-id> <size>");
      process.exit(1);
  }
}

main().catch((error) => {
  console.error("Operation failed:", error.message);
  process.exit(1);
});
