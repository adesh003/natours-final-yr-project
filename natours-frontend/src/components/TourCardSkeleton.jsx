const TourCardSkeleton = () => {
  return (
    <div className="bg-[#111] rounded-3xl overflow-hidden border border-white/5 animate-pulse">
      {/* Image Placeholder */}
      <div className="h-64 bg-gray-800/50" />
      
      {/* Content Placeholder */}
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-800 rounded w-3/4" />
        <div className="h-4 bg-gray-800 rounded w-1/2" />
        
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="h-4 bg-gray-800 rounded" />
          <div className="h-4 bg-gray-800 rounded" />
        </div>

        <div className="pt-6 flex justify-between items-center">
           <div className="h-8 w-24 bg-gray-800 rounded-full" />
           <div className="h-10 w-32 bg-gray-800 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default TourCardSkeleton;