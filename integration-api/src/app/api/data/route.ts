import { NextResponse } from 'next/server';
import { getRecentData } from '@/lib/database';
import { logError } from '@/lib/logger';
import { writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

function logDataRetrieval(sensors: number, locations: number) {
  const LOG_DIR = join(process.cwd(), 'logs');
  const LOG_FILE = join(LOG_DIR, 'app.log');
  
  if (!existsSync(LOG_DIR)) {
    mkdirSync(LOG_DIR, { recursive: true });
  }
  
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} [DATA] Retrieved ${sensors} sensors, ${locations} locations\n`;
  
  try {
    appendFileSync(LOG_FILE, logEntry);
  } catch (error) {
    console.log(logEntry.trim());
  }
}

export async function GET() {
  try {
    const data = await getRecentData();
    logDataRetrieval(data.sensors?.length || 0, data.locations?.length || 0);
    return NextResponse.json(data, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error) {
    logError('Failed to fetch data', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}