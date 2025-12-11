// Tive incoming payload types
export interface TivePayload {
  DeviceId: string;
  DeviceName: string;
  EntryTimeEpoch: number;
  Temperature: {
    Celsius: number | null;
    Fahrenheit?: number | null;
  };
  Location: {
    Latitude: number;
    Longitude: number;
    FormattedAddress?: string | null;
    LocationMethod?: string | null;
    Accuracy?: {
      Meters?: number | null;
    } | null;
  };
  EntityName?: string;
  Humidity?: {
    Percentage?: number | null;
  } | null;
  Light?: {
    Lux?: number | null;
  } | null;
  Accelerometer?: {
    G?: number | null;
    X?: number | null;
    Y?: number | null;
    Z?: number | null;
  } | null;
  Battery?: {
    Percentage?: number | null;
  } | null;
  Cellular?: {
    Dbm?: number | null;
  } | null;
}

// PAXAFE sensor payload
export interface PaxafeSensorPayload {
  device_id: string;
  device_imei: string;
  timestamp: number;
  provider: string;
  type: string;
  temperature: number | null;
  humidity?: number | null;
  light_level?: number | null;
  accelerometer?: {
    x: number | null;
    y: number | null;
    z: number | null;
    magnitude: number | null;
  } | null;
  tilt?: null;
  box_open?: null;
}

// PAXAFE location payload
export interface PaxafeLocationPayload {
  device_id: string;
  device_imei: string;
  timestamp: number;
  provider: string;
  type: string;
  latitude: number;
  longitude: number;
  altitude?: number | null;
  location_accuracy?: number | null;
  location_accuracy_category?: string | null;
  location_source?: string | null;
  address?: {
    full_address?: string | null;
  } | null;
  battery_level?: number | null;
  cellular_dbm?: number | null;
  cellular_network_type?: string | null;
  cellular_operator?: string | null;
  wifi_access_points?: number | null;
}