# IoT Data Integration Pipeline - Project Overview

## Architecture

This project implements a real-time IoT data integration pipeline for pharmaceutical cold chain monitoring, consisting of two Next.js applications:

### 1. Integration API (`/integration-api`)
- **Purpose**: Receives Tive webhook payloads, transforms to PAXAFE format, stores in PostgreSQL
- **Port**: 3000
- **Key Features**:
  - Webhook endpoint: `POST /api/webhook/tive`
  - API key authentication
  - JSON schema validation + business logic validation
  - Data transformation (Tive → PAXAFE sensor + location formats)
  - PostgreSQL storage with optimized schema
  - Comprehensive error handling

### 2. Mock Tive Sender (`/mock-tive-sender`)
- **Purpose**: Generates and sends test Tive payloads to Integration API
- **Port**: 3001
- **Key Features**:
  - Web UI for payload generation and testing
  - Sample payloads based on provided examples
  - Random payload generation
  - Real-time API testing with response display

## Data Flow

```
Tive Device → Mock Sender → Integration API → PostgreSQL
                    ↓              ↓
               Web Interface   Validation &
                              Transformation
```

## Key Design Decisions

### 1. **Minimal Implementation**
- Only essential code for core functionality
- No unnecessary abstractions or over-engineering
- Direct, straightforward implementations

### 2. **Database Schema**
- Separate tables for sensor and location data
- Optimized indexes for common query patterns
- Proper data types matching PAXAFE schema precision requirements

### 3. **Validation Strategy**
- JSON Schema validation for structure
- Business logic validation for data quality (timestamp ranges, coordinate bounds)
- Detailed error responses for debugging

### 4. **Error Handling**
- Graceful degradation for missing optional fields
- Comprehensive error messages
- Proper HTTP status codes

### 5. **Transformation Logic**
- Precision rounding to match PAXAFE requirements
- Location accuracy categorization (High/Medium/Low)
- Location source normalization (GPS/WiFi/Cellular)

## Production Considerations

### Implemented
- ✅ Input validation and sanitization
- ✅ Database connection pooling
- ✅ Error logging and handling
- ✅ API authentication
- ✅ Comprehensive tests for transformation logic
- ✅ Vercel deployment configuration

### Future Enhancements (Beyond Minimum)
- **Scalability**: Message queues for high-volume processing
- **Monitoring**: Application metrics and health checks
- **Security**: Rate limiting, request signing validation
- **Data Quality**: Duplicate detection, data enrichment
- **Analytics**: Real-time dashboards, alerting

## Local Development Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (Neon recommended)
- Git

### 1. Clone and Install
```bash
git clone <repository-url>
cd px-sr-sw-eng_phase2_take-home

# Install dependencies for both apps
cd integration-api && npm install
cd ../mock-tive-sender && npm install
```

### 2. Database Setup
1. Create a PostgreSQL database (e.g., on Neon)
2. Copy connection string
3. Configure environment variables:

**integration-api/.env.local:**
```bash
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
API_KEY=paxafe-test-key-2024
```

### 3. Database Migration
```bash
cd integration-api

# Generate Prisma client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# Optional: Reset database (clears all data)
npx prisma db push --force-reset
```

### 4. Run Applications
```bash
# Terminal 1: Integration API (port 3005)
cd integration-api
npm run dev

# Terminal 2: Mock Tive Sender (port 3003)
cd mock-tive-sender
npm run dev
```

### 5. Test the Pipeline

**Local Development:**
1. Open http://localhost:3003 (Mock Sender)
2. Configure API endpoint: http://localhost:3005/api/webhook/tive
3. Set API key: paxafe-test-key-2024
4. Send test payloads
5. View data at http://localhost:3005

**Deployed Version:**
1. Open https://mock-tive-sender.vercel.app/ (Mock Sender)
2. Configure API endpoint: https://paxafe-assessment.vercel.app/api/webhook/tive
3. Set API key: paxafe-test-key-2024
4. Send test payloads
5. View data at https://paxafe-assessment.vercel.app/

## Database Migration Guide

### From Raw SQL to Prisma ORM
The project uses Prisma ORM with PostgreSQL. Schema matches PAXAFE format exactly:

**Sensor Data Schema:**
- `device_id`, `device_imei`, `timestamp`, `provider`, `type`
- `temperature`, `humidity`, `light_level`
- `accelerometer` (JSON), `tilt` (JSON), `box_open`

**Location Data Schema:**
- `device_id`, `device_imei`, `timestamp`, `provider`, `type`
- `latitude`, `longitude`, `altitude`
- `location_accuracy`, `location_accuracy_category`, `location_source`
- `address` (JSON), `battery_level`, `cellular_dbm`
- `cellular_network_type`, `cellular_operator`, `wifi_access_points`

### Migration Commands
```bash
# View current schema
npx prisma db pull

# Apply schema changes
npx prisma db push

# Generate client after schema changes
npx prisma generate

# Create migration files (for production)
npx prisma migrate dev --name migration_name
```

## Testing

### Run Tests
```bash
cd integration-api

# Run all tests
npm test

# Run specific test files
npm test transformer.test.ts
npm test validator.test.ts
npm test DataViewer.test.tsx
```

### Test Coverage
- **Transformation Logic**: Tive → PAXAFE format conversion
- **Validation**: JSON schema + business logic validation
- **Components**: React component rendering and interactions
- **Database**: Repository pattern with Prisma ORM

### Manual Testing
1. **Valid Payloads**: Use Mock Sender with sample data
2. **Invalid Payloads**: Test validation with malformed data
3. **Edge Cases**: Null values, boundary conditions
4. **Error Handling**: Network failures, database errors

## Deployment

### Vercel Deployment
Both applications are configured for Vercel:

```bash
# Deploy Integration API
cd integration-api
vercel --prod

# Deploy Mock Sender
cd mock-tive-sender
vercel --prod
```

### Environment Variables (Vercel Dashboard)
- `DATABASE_URL`: PostgreSQL connection string
- `API_KEY`: Authentication key for webhook endpoint

### Production Database Setup
1. Create production database
2. Run schema migration: `npx prisma db push`
3. Update environment variables in Vercel

## API Usage Examples

### Webhook Endpoint

**Local:**
```bash
curl -X POST http://localhost:3005/api/webhook/tive \
  -H "Content-Type: application/json" \
  -H "x-api-key: paxafe-test-key-2024" \
  -d '{
    "DeviceId": "863257063350583",
    "DeviceName": "A571992",
    "EntryTimeEpoch": 1739215646000,
    "Temperature": {"Celsius": 10.08},
    "Location": {"Latitude": 40.81, "Longitude": -73.88}
  }'
```

**Deployed:**
```bash
curl -X POST https://paxafe-assessment.vercel.app/api/webhook/tive \
  -H "Content-Type: application/json" \
  -H "x-api-key: paxafe-test-key-2024" \
  -d '{
    "DeviceId": "863257063350583",
    "DeviceName": "A571992",
    "EntryTimeEpoch": 1739215646000,
    "Temperature": {"Celsius": 10.08},
    "Location": {"Latitude": 40.81, "Longitude": -73.88}
  }'
```

### Data Retrieval

**Local:**
```bash
curl http://localhost:3005/api/data
```

**Deployed:**
```bash
curl https://paxafe-assessment.vercel.app/api/data
```

### Health Check

**Local:**
```bash
curl http://localhost:3005/api/webhook/tive
```

**Deployed:**
```bash
curl https://paxafe-assessment.vercel.app/api/health
```

This implementation focuses on correctness, reliability, and maintainability while keeping the codebase minimal and production-ready.