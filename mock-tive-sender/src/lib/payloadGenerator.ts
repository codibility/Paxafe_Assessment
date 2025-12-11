export interface TivePayload {
  DeviceId?: string;
  DeviceName: string;
  EntryTimeEpoch: number;
  Temperature: { Celsius: number; Fahrenheit?: number };
  Location: {
    Latitude: number;
    Longitude: number;
    FormattedAddress?: string;
    LocationMethod?: string | null;
    Accuracy?: { Meters: number } | null;
  };
  EntityName?: string;
  Humidity?: { Percentage: number };
  Light?: { Lux: number };
  Accelerometer?: { G: number; X: number; Y: number; Z: number };
  Battery?: { Percentage: number; Estimation: string; IsCharging: boolean };
  Cellular?: { SignalStrength: string; Dbm: number };
}

const samplePayloads = [
  {
    name: "Standard Temperature Shipment",
    payload: {
      EntityName: "A571992",
      EntryTimeEpoch: Date.now(),
      Temperature: { Celsius: 10.078125, Fahrenheit: 50.140625 },
      DeviceId: "863257063350583",
      DeviceName: "A571992",
      Location: {
        Latitude: 40.810562,
        Longitude: -73.879285,
        FormattedAddress: "114 Hunts Point Market, Bronx, NY 10474, USA",
        LocationMethod: "wifi",
        Accuracy: { Meters: 23 }
      },
      Humidity: { Percentage: 38.7 },
      Light: { Lux: 0 },
      Accelerometer: { G: 0.990, X: -0.563, Y: -0.438, Z: 0.688 },
      Battery: { Percentage: 65, Estimation: "N/A", IsCharging: false },
      Cellular: { SignalStrength: "Poor", Dbm: -100 }
    }
  },
  {
    name: "GPS Location Shipment",
    payload: {
      EntityName: "B234567",
      EntryTimeEpoch: Date.now(),
      Temperature: { Celsius: 4.5, Fahrenheit: 40.1 },
      DeviceId: "866088073468440",
      DeviceName: "B234567",
      Location: {
        Latitude: 37.7749,
        Longitude: -122.4194,
        FormattedAddress: "San Francisco, CA 94102, USA",
        LocationMethod: "gps",
        Accuracy: { Meters: 5 }
      },
      Humidity: { Percentage: 55.3 },
      Light: { Lux: 125.5 },
      Accelerometer: { G: 1.012, X: 0.125, Y: -0.250, Z: 0.980 },
      Battery: { Percentage: 82, Estimation: "Weeks", IsCharging: false },
      Cellular: { SignalStrength: "Good", Dbm: -75 }
    }
  },
  {
    name: "Cellular Location Only",
    payload: {
      EntityName: "C345678",
      EntryTimeEpoch: Date.now(),
      Temperature: { Celsius: -18.5, Fahrenheit: -1.3 },
      DeviceId: "866088073468441",
      DeviceName: "C345678",
      Location: {
        Latitude: 51.5074,
        Longitude: -0.1278,
        FormattedAddress: "London, UK",
        LocationMethod: "cell",
        Accuracy: { Meters: 500 }
      },
      Humidity: { Percentage: 25.0 },
      Light: { Lux: 0 },
      Accelerometer: { G: 0.995, X: 0.0, Y: 0.0, Z: 0.995 },
      Battery: { Percentage: 45, Estimation: "Days", IsCharging: false },
      Cellular: { SignalStrength: "Fair", Dbm: -90 }
    }
  },
  {
    name: "Minimal Data Payload",
    payload: {
      EntryTimeEpoch: Date.now(),
      EntityName: "D456789",
      DeviceId: "866088073468442",
      DeviceName: "D456789",
      Temperature: { Celsius: 22.0, Fahrenheit: 71.6 },
      Location: {
        Latitude: 35.6762,
        Longitude: 139.6503,
        LocationMethod: null as null,
        Accuracy: null as null
      }
    }
  }
];

export function generateRandomPayload(): TivePayload {
  const deviceId = Math.floor(Math.random() * 900000000000000 + 100000000000000).toString();
  const deviceName = `DEV${Math.floor(Math.random() * 10000)}`;
  
  return {
    EntityName: deviceName,
    EntryTimeEpoch: Date.now(),
    DeviceId: deviceId,
    DeviceName: deviceName,
    Temperature: {
      Celsius: Math.round((Math.random() * 40 - 20) * 100) / 100,
      Fahrenheit: 0 // Will be calculated
    },
    Location: {
      Latitude: Math.round((Math.random() * 180 - 90) * 1000000) / 1000000,
      Longitude: Math.round((Math.random() * 360 - 180) * 1000000) / 1000000,
      LocationMethod: ['gps', 'wifi', 'cell'][Math.floor(Math.random() * 3)],
      Accuracy: { Meters: Math.floor(Math.random() * 100 + 1) }
    },
    Humidity: { Percentage: Math.round(Math.random() * 100 * 10) / 10 },
    Light: { Lux: Math.round(Math.random() * 1000 * 10) / 10 },
    Accelerometer: {
      G: Math.round(Math.random() * 2 * 1000) / 1000,
      X: Math.round((Math.random() * 2 - 1) * 1000) / 1000,
      Y: Math.round((Math.random() * 2 - 1) * 1000) / 1000,
      Z: Math.round((Math.random() * 2 - 1) * 1000) / 1000
    },
    Battery: {
      Percentage: Math.floor(Math.random() * 100),
      Estimation: ['Days', 'Weeks', 'Months', 'N/A'][Math.floor(Math.random() * 4)],
      IsCharging: Math.random() > 0.8
    },
    Cellular: {
      SignalStrength: ['Poor', 'Fair', 'Good'][Math.floor(Math.random() * 3)],
      Dbm: Math.floor(Math.random() * 50 + 50) * -1
    }
  };
}

const invalidPayloads = [
  {
    name: "Missing DeviceId",
    payload: {
      EntryTimeEpoch: Date.now(),
      DeviceName: "A571992",
      Temperature: { Celsius: 10.0 },
      Location: { Latitude: 40.0, Longitude: -73.0 }
    } as TivePayload
  },
  {
    name: "Missing DeviceId - Scenario B",
    payload: {
      EntryTimeEpoch: Date.now(),
      EntityName: "A571992",
      DeviceName: "Ship33CABOL",
      Temperature: { Celsius: 10.0 },
      Location: { Latitude: 40.0, Longitude: -73.0 }
    } as TivePayload
  },
  {
    name: "Invalid Latitude (95°)",
    payload: {
      EntryTimeEpoch: Date.now(),
      DeviceId: "863257063350583",
      DeviceName: "A571992",
      Temperature: { Celsius: 10.0 },
      Location: { Latitude: 95.0, Longitude: -73.0 }
    } as TivePayload
  },
  {
    name: "Invalid Longitude (-200°)",
    payload: {
      EntryTimeEpoch: Date.now(),
      DeviceId: "863257063350583",
      DeviceName: "A571992",
      Temperature: { Celsius: 10.0 },
      Location: { Latitude: 40.0, Longitude: -200.0 }
    } as TivePayload
  },
  {
    name: "Future Timestamp",
    payload: {
      EntryTimeEpoch: 1893456000000,
      DeviceId: "863257063350583",
      DeviceName: "A571992",
      Temperature: { Celsius: 10.0 },
      Location: { Latitude: 40.0, Longitude: -73.0 }
    } as TivePayload
  },
  {
    name: "Old Timestamp",
    payload: {
      EntryTimeEpoch: 1609459200000,
      DeviceId: "863257063350583",
      DeviceName: "A571992",
      Temperature: { Celsius: 10.0 },
      Location: { Latitude: 40.0, Longitude: -73.0 }
    } as TivePayload
  }
];

export function getSamplePayloads() {
  return samplePayloads.map(sample => ({
    ...sample,
    payload: { ...sample.payload, EntryTimeEpoch: Date.now() }
  }));
}

export function getInvalidPayloads() {
  return invalidPayloads;
}