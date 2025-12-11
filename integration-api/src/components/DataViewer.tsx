'use client';

import { useState } from 'react';
import RefreshButton from './RefreshButton';
import DataList from './DataList';
import DataModal from './DataModal';

export default function DataViewer() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/data');
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSensorPreview = (item: any) => 
    `Temp: ${item.temperature}°C | ${new Date(item.created_at).toLocaleString()}`;

  const renderLocationPreview = (item: any) => 
    `${item.latitude}, ${item.longitude} | ${new Date(item.created_at).toLocaleString()}`;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Data</h2>
        <RefreshButton loading={loading} onRefresh={fetchData} />
      </div>

      {data && (
        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          <DataList 
            title="Sensor Data"
            items={data.sensors}
            onItemClick={setSelectedItem}
            renderPreview={renderSensorPreview}
          />
          
          <DataList 
            title="Location Data"
            items={data.locations}
            onItemClick={setSelectedItem}
            renderPreview={renderLocationPreview}
          />
        </div>
      )}

      <DataModal 
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}