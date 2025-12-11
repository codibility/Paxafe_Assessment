import DataViewer from '@/components/DataViewer';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">PAXAFE Integration API</h1>
      <p className="mb-4">IoT Data Integration Pipeline for Pharmaceutical Cold Chain Monitoring</p>
      
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Webhook Endpoint</h2>
        <code className="bg-white p-2 rounded block">
          POST /api/webhook/tive
        </code>
        <p className="mt-2 text-sm text-gray-600">
          Send Tive payloads with x-api-key header for authentication
        </p>
      </div>
      
      <DataViewer />
    </main>
  );
}