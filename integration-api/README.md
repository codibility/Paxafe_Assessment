# PAXAFE Integration API

IoT Data Integration Pipeline for Pharmaceutical Cold Chain Monitoring

## Overview

This application receives Tive webhook payloads, validates and transforms them to PAXAFE format, and stores the data in PostgreSQL.

## Features

- **Webhook Endpoint**: `POST /api/webhook/tive`
- **Authentication**: API key-based authentication
- **Validation**: JSON schema validation with business logic
- **Transformation**: Converts Tive format to PAXAFE sensor and location formats
- **Storage**: PostgreSQL with optimized schema
- **Error Handling**: Comprehensive error responses

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your database URL and API key
```

3. Run development server:
```bash
npm run dev
```

4. Run tests:
```bash
npm test
```

## API Usage

### Webhook Endpoint

```bash
curl -X POST http://localhost:3000/api/webhook/tive \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d @sample-payload.json
```

### Response Format

Success (200):
```json
{
  "success": true,
  "message": "Data processed successfully",
  "processed": {
    "sensor": { ... },
    "location": { ... }
  }
}
```

Error (400/401/500):
```json
{
  "error": "Error message",
  "details": ["validation errors"]
}
```

## Database Schema

### sensor_data
- Device sensor readings (temperature, humidity, accelerometer, etc.)
- Indexed by device_id and timestamp

### location_data  
- Device location information with accuracy and source
- Indexed by device_id, timestamp, and coordinates

## Deployment

Configured for Vercel deployment with PostgreSQL database.

## Design Decisions

1. **Separate Tables**: Sensor and location data in separate tables for better query performance
2. **Precision Handling**: Rounds values to match PAXAFE schema requirements
3. **Async Processing**: Could be extended to use queues for high-volume scenarios
4. **Validation**: Multi-layer validation (schema + business logic)
5. **Error Handling**: Detailed error responses for debugging