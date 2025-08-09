import Skeleton from "react-loading-skeleton";

function KendaraanCardSkeleton({ count = 3 }) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-netral-100 border-netral-400 rounded-2xl border p-4 shadow-2xs"
        >
          <Skeleton height={200} className="mb-4" />
          <Skeleton width="75%" height={20} className="mb-2" />
          <Skeleton width="50%" height={20} />
        </div>
      ))}
    </div>
  );
}

export default KendaraanCardSkeleton;
