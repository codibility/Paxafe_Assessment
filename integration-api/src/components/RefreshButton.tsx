interface RefreshButtonProps {
  loading: boolean;
  onRefresh: () => void;
}

export default function RefreshButton({ loading, onRefresh }: RefreshButtonProps) {
  return (
    <button
      onClick={onRefresh}
      disabled={loading}
      className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
    >
      {loading ? 'Loading...' : 'Refresh Data'}
    </button>
  );
}