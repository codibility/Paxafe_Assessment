import { prisma } from '../prisma';
import { PaxafeSensorPayload } from '@/types';

export async function saveSensorData(data: PaxafeSensorPayload): Promise<void> {
  await prisma.sensorData.create({
    data: {
      device_id: data.device_id,
      device_imei: data.device_imei,
      timestamp: BigInt(data.timestamp),
      provider: data.provider,
      type: data.type,
      temperature: data.temperature,
      humidity: data.humidity,
      light_level: data.light_level,
      accelerometer: data.accelerometer || undefined,
      tilt: data.tilt || undefined,
      box_open: data.box_open,
    }
  });
}

export async function getRecentSensorData() {
  const sensors = await prisma.sensorData.findMany({
    orderBy: { created_at: 'desc' },
    take: 10
  });
  
  return sensors.map(sensor => ({
    ...sensor,
    timestamp: Number(sensor.timestamp)
  }));
}