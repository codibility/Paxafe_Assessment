import { prisma } from '../prisma';
import { PaxafeLocationPayload } from '@/types';

export async function saveLocationData(data: PaxafeLocationPayload): Promise<void> {
  await prisma.locationData.create({
    data: {
      device_id: data.device_id,
      device_imei: data.device_imei,
      timestamp: BigInt(data.timestamp),
      provider: data.provider,
      type: data.type,
      latitude: data.latitude,
      longitude: data.longitude,
      altitude: data.altitude,
      location_accuracy: data.location_accuracy,
      location_accuracy_category: data.location_accuracy_category,
      location_source: data.location_source,
      address: data.address || undefined,
      battery_level: data.battery_level,
      cellular_dbm: data.cellular_dbm,
      cellular_network_type: data.cellular_network_type,
      cellular_operator: data.cellular_operator,
      wifi_access_points: data.wifi_access_points,
    }
  });
}

export async function getRecentLocationData() {
  const locations = await prisma.locationData.findMany({
    orderBy: { created_at: 'desc' },
    take: 10
  });
  
  return locations.map(location => ({
    ...location,
    timestamp: Number(location.timestamp)
  }));
}