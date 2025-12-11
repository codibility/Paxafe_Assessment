# Mock Tive Sender

Generate and send mock Tive payloads to test the Integration API.

## Features

- **Sample Payloads**: Pre-built payloads based on provided examples
- **Random Generation**: Generate random valid payloads
- **Real-time Testing**: Send payloads and view responses
- **Response Display**: Shows API responses with status codes

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open http://localhost:3001

## Usage

1. Enter your Integration API URL (default: http://localhost:3000/api/webhook/tive)
2. Enter your API key
3. Select a sample payload or generate a random one
4. Click "Send Payload" to test the integration
5. View the response from the Integration API

## Sample Payloads

- **Standard Temperature Shipment**: Complete payload with all sensors
- **GPS Location Shipment**: GPS-based location tracking
- **Generate Random**: Creates random valid payload for testing

## Deployment

Configured for Vercel deployment on port 3001.