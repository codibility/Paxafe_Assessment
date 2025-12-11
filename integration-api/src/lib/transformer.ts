import { TivePayload, PaxafeSensorPayload, PaxafeLocationPayload } from '@/types';

export function transformToSensorPayload(tiveData: TivePayload): PaxafeSensorPayload {
  return {
    device_id: tiveData.DeviceName,
    device_imei: tiveData.DeviceId,
    timestamp: tiveData.EntryTimeEpoch,
    provider: 'Tive',
    type: 'Active',
    temperature: tiveData.Temperature.Celsius ? Math.round(tiveData.Temperature.Celsius * 100) / 100 : null,
    humidity: tiveData.Humidity?.Percentage ? Math.round(tiveData.Humidity.Percentage * 10) / 10 : null,
    light_level: tiveData.Light?.Lux !== undefined && tiveData.Light.Lux !== null ? Math.round(tiveData.Light.Lux * 10) / 10 : null,
    accelerometer: tiveData.Accelerometer ? {
      x: tiveData.Accelerometer.X ? Math.round(tiveData.Accelerometer.X * 1000) / 1000 : null,
      y: tiveData.Accelerometer.Y ? Math.round(tiveData.Accelerometer.Y * 1000) / 1000 : null,
      z: tiveData.Accelerometer.Z ? Math.round(tiveData.Accelerometer.Z * 1000) / 1000 : null,
      magnitude: tiveData.Accelerometer.G ? Math.round(tiveData.Accelerometer.G * 1000) / 1000 : null,
    } : null,
    tilt: null,
    box_open: null,
  };
}

export function transformToLocationPayload(tiveData: TivePayload): PaxafeLocationPayload {
  const getLocationAccuracyCategory = (meters?: number | null): string | null => {
    if (!meters) return null;
    if (meters <= 10) return 'High';
    if (meters <= 100) return 'Medium';
    return 'Low';
  };

  const getLocationSource = (method?: string | null): string | null => {
    if (!method) return null;
    switch (method.toLowerCase()) {
      case 'gps': return 'GPS';
      case 'wifi': return 'WiFi';
      case 'cell': return 'Cellular';
      default: return method;
    }
  };

  return {
    device_id: tiveData.DeviceName,
    device_imei: tiveData.DeviceId,
    timestamp: tiveData.EntryTimeEpoch,
    provider: 'Tive',
    type: 'Active',
    latitude: tiveData.Location.Latitude,
    longitude: tiveData.Location.Longitude,
    altitude: null,
    location_accuracy: tiveData.Location.Accuracy?.Meters || null,
    location_accuracy_category: getLocationAccuracyCategory(tiveData.Location.Accuracy?.Meters),
    location_source: getLocationSource(tiveData.Location.LocationMethod),
    address: tiveData.Location.FormattedAddress ? {
      full_address: tiveData.Location.FormattedAddress
    } : null,
    battery_level: tiveData.Battery?.Percentage || null,
    cellular_dbm: tiveData.Cellular?.Dbm ? Math.round(tiveData.Cellular.Dbm * 100) / 100 : null,
    cellular_network_type: null,
    cellular_operator: null,
    wifi_access_points: null,
  };
}