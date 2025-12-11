import { saveSensorData, getRecentSensorData } from './db/sensorRepository';
import { saveLocationData, getRecentLocationData } from './db/locationRepository';

export { saveSensorData, saveLocationData };

export async function getRecentData() {
  const [sensors, locations] = await Promise.all([
    getRecentSensorData(),
    getRecentLocationData()
  ]);
  
  return { 
    sensors, 
    locations,
    fetchedAt: new Date().toISOString(),
    counts: {
      sensors: sensors.length,
      locations: locations.length
    }
  };
}