import Ajv from 'ajv';
import { TivePayload } from '@/types';

const ajv = new Ajv();

const tiveSchema = {
  type: 'object',
  required: ['DeviceId', 'DeviceName', 'EntryTimeEpoch', 'Temperature', 'Location'],
  properties: {
    DeviceId: { type: 'string', pattern: '^[0-9]{15}$' },
    DeviceName: { type: 'string' },
    EntryTimeEpoch: { type: 'integer', minimum: 0 },
    Temperature: {
      type: 'object',
      required: ['Celsius'],
      properties: {
        Celsius: { type: ['number', 'null'] },
        Fahrenheit: { type: ['number', 'null'] }
      }
    },
    Location: {
      type: 'object',
      required: ['Latitude', 'Longitude'],
      properties: {
        Latitude: { type: 'number', minimum: -90, maximum: 90 },
        Longitude: { type: 'number', minimum: -180, maximum: 180 }
      }
    }
  }
};

const validate = ajv.compile(tiveSchema);

export function validateTivePayload(payload: any): { valid: boolean; errors?: string[] } {
  const valid = validate(payload);
  
  if (!valid) {
    return {
      valid: false,
      errors: validate.errors?.map(err => `${err.instancePath} ${err.message}`) || ['Validation failed']
    };
  }

  // Additional business logic validation
  const now = Date.now();
  const oneYearAgo = now - (365 * 24 * 60 * 60 * 1000);
  const oneHourFromNow = now + (60 * 60 * 1000);

  if (typeof payload.EntryTimeEpoch === 'number' && (payload.EntryTimeEpoch < oneYearAgo || payload.EntryTimeEpoch > oneHourFromNow)) {
    return {
      valid: false,
      errors: ['Timestamp is outside acceptable range (1 year ago to 1 hour from now)']
    };
  }

  return { valid: true };
}

export function authenticateRequest(apiKey: string): boolean {
  const validApiKey = process.env.API_KEY;
  return Boolean(validApiKey && apiKey === validApiKey);
}