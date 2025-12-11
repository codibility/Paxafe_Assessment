import { TivePayload } from '@/lib/payloadGenerator';

interface PayloadPreviewProps {
  payload: TivePayload | null;
}

export default function PayloadPreview({ payload }: PayloadPreviewProps) {
  if (!payload) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Selected Payload</h3>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
        {JSON.stringify(payload, null, 2)}
      </pre>
    </div>
  );
}