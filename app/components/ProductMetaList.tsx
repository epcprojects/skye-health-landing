"use client";

type MetaItem = {
  label: string;
  value: string;
};

type ProductMetaListProps = {
  items: MetaItem[];
  className?: string;
};

export default function ProductMetaList({
  items,
  className = "",
}: ProductMetaListProps) {
  return (
    <div className={`overflow-hidden${className}`}>
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`flex items-center justify-between p-2 lg:p-3 text-sm
            ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}
          `}
        >
          <span className="font-semibold text-base w-full text-gray-900">
            {item.label}
          </span>

          <span className="text-gray-600 text-base w-full">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
