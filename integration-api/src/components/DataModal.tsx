interface DataModalProps {
  item: any;
  onClose: () => void;
}

export default function DataModal({ item, onClose }: DataModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Data Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
        <div className="p-4 overflow-auto">
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(item, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}