const LoadingSpinner = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-12"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
        <div className="w-12 h-12 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading cosmic events...</p>
    </div>
  );
};

export default LoadingSpinner;
