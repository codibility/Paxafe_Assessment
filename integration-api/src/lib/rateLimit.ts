const requests = new Map<string, number[]>();

export function checkRateLimit(ip: string, limit = 100, window = 60000): boolean {
  const now = Date.now();
  const userRequests = requests.get(ip) || [];
  
  // Remove old requests outside the window
  const validRequests = userRequests.filter(time => now - time < window);
  
  if (validRequests.length >= limit) {
    return false;
  }
  
  validRequests.push(now);
  requests.set(ip, validRequests);
  return true;
}