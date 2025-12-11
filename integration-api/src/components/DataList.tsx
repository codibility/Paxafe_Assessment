interface DataListProps {
  title: string;
  items: any[];
  onItemClick: (item: any) => void;
  renderPreview: (item: any) => string;
}

export default function DataList({ title, items, onItemClick, renderPreview }: DataListProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {items?.map((item: any) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            className="p-3 border rounded cursor-pointer hover:bg-gray-50"
          >
            <div className="font-medium">{item.device_id}</div>
            <div className="text-sm text-gray-600">
              {renderPreview(item)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}