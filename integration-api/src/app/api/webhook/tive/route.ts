import { NextRequest, NextResponse } from 'next/server';
import { validateTivePayload, authenticateRequest } from '@/lib/validator';
import { transformToSensorPayload, transformToLocationPayload } from '@/lib/transformer';
import { saveSensorData, saveLocationData} from '@/lib/database';
import { logWebhookReceived, logTransformationSuccess, logDatabaseSave, logError } from '@/lib/logger';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let deviceId = 'unknown';
  
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Authentication
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey || !authenticateRequest(apiKey)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Parse payload
    const payload = await request.json();
    deviceId = payload.DeviceId;
    
    logWebhookReceived(deviceId, payload.EntryTimeEpoch);

    // Validate payload
    const validation = validateTivePayload(payload);
    if (!validation.valid) {
      logError('Validation failed', validation.errors, deviceId);
      return NextResponse.json(
        { error: 'Invalid payload', details: validation.errors },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }


    // Transform and save data
    const sensorData = transformToSensorPayload(payload);
    const locationData = transformToLocationPayload(payload);
    logTransformationSuccess(deviceId);

    await Promise.all([
      saveSensorData(sensorData),
      saveLocationData(locationData)
    ]);
    logDatabaseSave(deviceId, ['sensor_data', 'location_data']);

    const processingTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      message: 'Data processed successfully',
      deviceId,
      processingTimeMs: processingTime,
      processed: {
        sensor: sensorData,
        location: locationData
      }
    }, { headers: { 'Access-Control-Allow-Origin': '*' } });

  } catch (error) {
    logError('Webhook processing failed', error, deviceId);
    return NextResponse.json(
      { error: 'Internal server error', deviceId },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Tive webhook endpoint is active',
    timestamp: new Date().toISOString()
  }, { headers: { 'Access-Control-Allow-Origin': '*' } });
}

