interface ConfigFormProps {
  apiUrl: string;
  apiKey: string;
  onApiUrlChange: (url: string) => void;
  onApiKeyChange: (key: string) => void;
}

export default function ConfigForm({ apiUrl, apiKey, onApiUrlChange, onApiKeyChange }: ConfigFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Integration API URL</label>
        <input
          type="text"
          value={apiUrl}
          onChange={(e) => onApiUrlChange(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="https://your-integration-api.vercel.app/api/webhook/tive"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">API Key</label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="paxafe-test-key-2024"
        />
      </div>
    </div>
  );
}