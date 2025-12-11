interface ResponseDisplayProps {
  response: {
    status: number;
    statusText: string;
    data: any;
    timestamp: string;
  } | null;
}

export default function ResponseDisplay({ response }: ResponseDisplayProps) {
  if (!response) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Response</h3>
      <div className={`p-4 rounded ${response.status === 200 ? 'bg-green-100' : 'bg-red-100'}`}>
        <div className="font-medium">
          Status: {response.status} {response.statusText}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          {response.timestamp}
        </div>
        <pre className="text-sm overflow-auto max-h-64">
          {JSON.stringify(response.data, null, 2)}
        </pre>
      </div>
    </div>
  );
}