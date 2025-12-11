import DataViewer from '@/components/DataViewer';

export default function DataPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">PAXAFE Dashboard For Data</h1>
      <p className="mb-4">View recent sensor and location data</p>
      
      <DataViewer />
    </main>
  );
}