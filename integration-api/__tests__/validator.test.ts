import { validateTivePayload, authenticateRequest } from '../src/lib/validator';

describe('Validator', () => {
  const validPayload = {
    DeviceId: '863257063350583',
    DeviceName: 'A571992',
    EntryTimeEpoch: Date.now(),
    Temperature: { Celsius: 25.5, Fahrenheit: 77.9 },
    Location: { Latitude: 40.7128, Longitude: -74.0060 }
  };

  describe('validateTivePayload - Schema Validation', () => {
    it('validates correct payload', () => {
      const result = validateTivePayload(validPayload);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('rejects missing required fields', () => {
      const { DeviceId, ...incomplete } = validPayload;
      const result = validateTivePayload(incomplete);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(" must have required property 'DeviceId'");
    });

    it('validates DeviceId format', () => {
      const invalidDeviceId = { ...validPayload, DeviceId: '123' };
      const result = validateTivePayload(invalidDeviceId);
      expect(result.valid).toBe(false);
      expect(result.errors?.[0]).toContain('pattern');
    });

    it('validates latitude range', () => {
      const invalidLat = { ...validPayload, Location: { Latitude: 91, Longitude: 0 } };
      const result = validateTivePayload(invalidLat);
      expect(result.valid).toBe(false);
      expect(result.errors?.[0]).toContain('maximum');
    });

    it('validates longitude range', () => {
      const invalidLng = { ...validPayload, Location: { Latitude: 0, Longitude: -181 } };
      const result = validateTivePayload(invalidLng);
      expect(result.valid).toBe(false);
      expect(result.errors?.[0]).toContain('minimum');
    });

    it('accepts null temperature values', () => {
      const nullTemp = { ...validPayload, Temperature: { Celsius: null } };
      const result = validateTivePayload(nullTemp);
      expect(result.valid).toBe(true);
    });

    it('rejects invalid temperature type', () => {
      const invalidTemp = { ...validPayload, Temperature: { Celsius: 'hot' } };
      const result = validateTivePayload(invalidTemp);
      expect(result.valid).toBe(false);
      expect(result.errors?.[0]).toContain('type');
    });

    it('validates EntryTimeEpoch as integer', () => {
      const invalidTime = { ...validPayload, EntryTimeEpoch: 'not-a-number' };
      const result = validateTivePayload(invalidTime);
      expect(result.valid).toBe(false);
      expect(result.errors?.[0]).toContain('type');
    });

    it('rejects negative EntryTimeEpoch', () => {
      const negativeTime = { ...validPayload, EntryTimeEpoch: -1 };
      const result = validateTivePayload(negativeTime);
      expect(result.valid).toBe(false);
      expect(result.errors?.[0]).toContain('minimum');
    });
  });

  describe('validateTivePayload - Business Logic Validation', () => {
    it('rejects timestamps older than one year', () => {
      const oneYearAgo = Date.now() - (366 * 24 * 60 * 60 * 1000);
      const oldPayload = { ...validPayload, EntryTimeEpoch: oneYearAgo };
      const result = validateTivePayload(oldPayload);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Timestamp is outside acceptable range (1 year ago to 1 hour from now)');
    });

    it('rejects future timestamps beyond one hour', () => {
      const twoHoursFromNow = Date.now() + (2 * 60 * 60 * 1000);
      const futurePayload = { ...validPayload, EntryTimeEpoch: twoHoursFromNow };
      const result = validateTivePayload(futurePayload);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Timestamp is outside acceptable range (1 year ago to 1 hour from now)');
    });

    it('accepts timestamp within valid range', () => {
      const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000);
      const recentPayload = { ...validPayload, EntryTimeEpoch: thirtyMinutesAgo };
      const result = validateTivePayload(recentPayload);
      expect(result.valid).toBe(true);
    });

    it('accepts timestamp one hour from now', () => {
      const oneHourFromNow = Date.now() + (60 * 60 * 1000);
      const futurePayload = { ...validPayload, EntryTimeEpoch: oneHourFromNow };
      const result = validateTivePayload(futurePayload);
      expect(result.valid).toBe(true);
    });
  });

  describe('authenticateRequest', () => {
    const originalEnv = process.env.API_KEY;

    afterEach(() => {
      process.env.API_KEY = originalEnv;
    });

    it('returns true for valid API key', () => {
      process.env.API_KEY = 'test-key';
      expect(authenticateRequest('test-key')).toBe(true);
    });

    it('returns false for invalid API key', () => {
      process.env.API_KEY = 'test-key';
      expect(authenticateRequest('wrong-key')).toBe(false);
    });

    it('returns false when no API key is set', () => {
      delete process.env.API_KEY;
      expect(authenticateRequest('any-key')).toBe(false);
    });

    it('returns false for empty API key', () => {
      process.env.API_KEY = 'test-key';
      expect(authenticateRequest('')).toBe(false);
    });
  });
});