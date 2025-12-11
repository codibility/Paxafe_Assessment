import { TivePayload } from '@/lib/payloadGenerator';

interface SendButtonProps {
  payload: TivePayload | null;
  apiKey: string;
  loading: boolean;
  onSend: (payload: TivePayload) => void;
}

export default function SendButton({ payload, apiKey, loading, onSend }: SendButtonProps) {
  if (!payload) return null;

  return (
    <button
      onClick={() => onSend(payload)}
      disabled={loading || !apiKey}
      className="w-full bg-blue-600 text-white p-3 rounded disabled:bg-gray-400"
    >
      {loading ? 'Sending...' : 'Send Payload'}
    </button>
  );
}