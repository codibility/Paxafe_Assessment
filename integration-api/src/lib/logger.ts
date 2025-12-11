import { writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const LOG_DIR = join(process.cwd(), 'logs');
const LOG_FILE = join(LOG_DIR, 'app.log');
const ERROR_FILE = join(LOG_DIR, 'error.log');

// Ensure logs directory exists
if (!existsSync(LOG_DIR)) {
  mkdirSync(LOG_DIR, { recursive: true });
}

function writeLog(level: string, message: string, file: string = LOG_FILE) {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} [${level}] ${message}\n`;
  
  try {
    appendFileSync(file, logEntry);
  } catch (error) {
    // Fallback to console if file write fails
    console.log(logEntry.trim());
  }
}

export function logWebhookReceived(deviceId: string, timestamp: number) {
  writeLog('WEBHOOK', `Received payload from device ${deviceId} at ${new Date(timestamp).toISOString()}`);
}

export function logTransformationSuccess(deviceId: string) {
  writeLog('TRANSFORM', `Successfully transformed payload for device ${deviceId}`);
}

export function logDatabaseSave(deviceId: string, tables: string[]) {
  writeLog('DATABASE', `Saved data for device ${deviceId} to tables: ${tables.join(', ')}`);
}

export function logError(context: string, error: any, deviceId?: string) {
  const deviceInfo = deviceId ? ` [Device: ${deviceId}]` : '';
  const errorMessage = error instanceof Error ? error.message : String(error);
  writeLog('ERROR', `${context}${deviceInfo}: ${errorMessage}`, ERROR_FILE);
}