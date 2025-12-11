import { TivePayload, generateRandomPayload, getSamplePayloads, getInvalidPayloads } from '@/lib/payloadGenerator';

interface PayloadSelectorProps {
  onPayloadSelect: (payload: TivePayload) => void;
}

export default function PayloadSelector({ onPayloadSelect }: PayloadSelectorProps) {
  const samplePayloads = getSamplePayloads();
  const invalidPayloads = getInvalidPayloads();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Sample Payloads</h3>
        <div className="space-y-2">
          {samplePayloads.map((sample, index) => (
            <button
              key={index}
              onClick={() => onPayloadSelect(sample.payload)}
              className="w-full p-2 text-left border rounded hover:bg-gray-50"
            >
              {sample.name}
            </button>
          ))}
          <button
            onClick={() => onPayloadSelect(generateRandomPayload())}
            className="w-full p-2 text-left border rounded hover:bg-gray-50 bg-blue-50"
          >
            Generate Random Payload
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Invalid Payloads (Test Validation)</h3>
        <div className="space-y-2">
          {invalidPayloads.map((sample, index) => (
            <button
              key={index}
              onClick={() => onPayloadSelect(sample.payload)}
              className="w-full p-2 text-left border rounded hover:bg-gray-50 bg-red-50 text-red-700"
            >
              {sample.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}