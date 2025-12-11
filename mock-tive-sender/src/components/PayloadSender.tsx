'use client';

import { useState } from 'react';
import { TivePayload } from '@/lib/payloadGenerator';
import ConfigForm from './ConfigForm';
import PayloadSelector from './PayloadSelector';
import SendButton from './SendButton';
import PayloadPreview from './PayloadPreview';
import ResponseDisplay from './ResponseDisplay';

export default function PayloadSender() {
  const [apiUrl, setApiUrl] = useState('http://localhost:3005/api/webhook/tive');
  const [apiKey, setApiKey] = useState('');
  const [selectedPayload, setSelectedPayload] = useState<TivePayload | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const sendPayload = async (payload: TivePayload) => {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResponse({
        status: res.status,
        statusText: res.statusText,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      setResponse({
        status: 0,
        statusText: 'Network Error',
        data: { error: error instanceof Error ? error.message : 'Unknown error' },
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mock Tive Sender</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <ConfigForm 
            apiUrl={apiUrl}
            apiKey={apiKey}
            onApiUrlChange={setApiUrl}
            onApiKeyChange={setApiKey}
          />
          
          <PayloadSelector onPayloadSelect={setSelectedPayload} />
          
          <SendButton 
            payload={selectedPayload}
            apiKey={apiKey}
            loading={loading}
            onSend={sendPayload}
          />
        </div>

        <div className="space-y-4">
          <PayloadPreview payload={selectedPayload} />
          <ResponseDisplay response={response} />
        </div>
      </div>
    </div>
  );
}