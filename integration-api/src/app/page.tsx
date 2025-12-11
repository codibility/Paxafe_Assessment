export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">PAXAFE Integration API</h1>
      <p className="mb-4">IoT Data Integration Pipeline for Pharmaceutical Cold Chain Monitoring</p>
      
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">API Endpoints</h2>
        <div className="space-y-2">
          <div>
            <code className="bg-white p-2 rounded block">POST /api/webhook/tive</code>
            <p className="text-sm text-gray-600">Webhook endpoint for Tive payloads</p>
          </div>
          <div>
            <code className="bg-white p-2 rounded block">GET /api/data</code>
            <p className="text-sm text-gray-600">Retrieve recent sensor and location data</p>
          </div>
          <div>
            <code className="bg-white p-2 rounded block">GET /api/health</code>
            <p className="text-sm text-gray-600">Health check endpoint</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded mb-6">
        <h3 className="font-semibold mb-2">Authentication</h3>
        <p className="text-sm">Include <code className="bg-white px-1 rounded">x-api-key</code> header with your requests</p>
      </div>
      
      <div className="bg-green-50 p-4 rounded">
        <h3 className="font-semibold mb-2">Data Dashboard</h3>
        <p className="text-sm mb-2">View recent sensor and location data</p>
        <a href="/data" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          View Data Dashboard
        </a>
      </div>
    </main>
  );
}