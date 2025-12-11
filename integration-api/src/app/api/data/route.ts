import { NextRequest, NextResponse } from 'next/server';
import { getRecentData } from '@/lib/database';
import { logError } from '@/lib/logger';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const data = await getRecentData();
    console.log(`[DATA] Retrieved ${data.sensors?.length || 0} sensors, ${data.locations?.length || 0} locations`);
    
    const timestamp = Date.now().toString();
    
    return NextResponse.json(data, {
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate, private, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'ETag': `"${timestamp}"`,
        'Last-Modified': new Date().toUTCString(),
        'Vary': 'Accept-Encoding'
      }
    });
  } catch (error) {
    logError('Failed to fetch data', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500, headers: { 
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      } }
    );
  }
}