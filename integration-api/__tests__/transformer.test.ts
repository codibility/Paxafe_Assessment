import { transformToSensorPayload, transformToLocationPayload } from '../src/lib/transformer';
import { TivePayload } from '../src/types';

const mockTivePayload: TivePayload = {
  DeviceId: '863257063350583',
  DeviceName: 'A571992',
  EntryTimeEpoch: 1739215646000,
  Temperature: {
    Celsius: 10.078125,
    Fahrenheit: 50.140625
  },
  Location: {
    Latitude: 40.810562,
    Longitude: -73.879285,
    FormattedAddress: '114 Hunts Point Market, Bronx, NY 10474, USA',
    LocationMethod: 'wifi',
    Accuracy: {
      Meters: 23
    }
  },
  Humidity: {
    Percentage: 38.70000076293945
  },
  Light: {
    Lux: 0
  },
  Accelerometer: {
    G: 0.9901862198596787,
    X: -0.5625,
    Y: -0.4375,
    Z: 0.6875
  },
  Battery: {
    Percentage: 65
  },
  Cellular: {
    Dbm: -100
  }
};

describe('Transformer', () => {
  describe('transformToSensorPayload', () => {
    it('should transform Tive payload to PAXAFE sensor format', () => {
      const result = transformToSensorPayload(mockTivePayload);
      
      expect(result.device_id).toBe('A571992');
      expect(result.device_imei).toBe('863257063350583');
      expect(result.timestamp).toBe(1739215646000);
      expect(result.provider).toBe('Tive');
      expect(result.type).toBe('Active');
      expect(result.temperature).toBe(10.08);
      expect(result.humidity).toBe(38.7);
      expect(result.light_level).toBe(0.0);
      expect(result.accelerometer?.x).toBe(-0.562);
      expect(result.accelerometer?.magnitude).toBe(0.990);
    });

    it('should handle null values correctly', () => {
      const minimalPayload: TivePayload = {
        DeviceId: '863257063350583',
        DeviceName: 'A571992',
        EntryTimeEpoch: 1739215646000,
        Temperature: { Celsius: null },
        Location: { Latitude: 40.0, Longitude: -73.0 }
      };

      const result = transformToSensorPayload(minimalPayload);
      expect(result.temperature).toBeNull();
      expect(result.humidity).toBeNull();
      expect(result.accelerometer).toBeNull();
    });
  });

  describe('transformToLocationPayload', () => {
    it('should transform Tive payload to PAXAFE location format', () => {
      const result = transformToLocationPayload(mockTivePayload);
      
      expect(result.device_id).toBe('A571992');
      expect(result.latitude).toBe(40.810562);
      expect(result.longitude).toBe(-73.879285);
      expect(result.location_accuracy).toBe(23);
      expect(result.location_accuracy_category).toBe('Medium');
      expect(result.location_source).toBe('WiFi');
      expect(result.address?.full_address).toBe('114 Hunts Point Market, Bronx, NY 10474, USA');
      expect(result.battery_level).toBe(65);
      expect(result.cellular_dbm).toBe(-100.00);
    });

    it('should categorize location accuracy correctly', () => {
      const highAccuracy = { ...mockTivePayload };
      highAccuracy.Location.Accuracy = { Meters: 5 };
      expect(transformToLocationPayload(highAccuracy).location_accuracy_category).toBe('High');

      const lowAccuracy = { ...mockTivePayload };
      lowAccuracy.Location.Accuracy = { Meters: 200 };
      expect(transformToLocationPayload(lowAccuracy).location_accuracy_category).toBe('Low');
    });
  });
});