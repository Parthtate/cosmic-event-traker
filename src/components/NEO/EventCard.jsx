import { useMemo } from "react";

const EventCard = ({ neo, onSelect, isSelected, onViewDetails }) => {
  const diameterAvg = useMemo(() => {
    const min = neo.estimated_diameter.kilometers.estimated_diameter_min;
    const max = neo.estimated_diameter.kilometers.estimated_diameter_max;
    return (min + max) / 2;
  }, [neo.estimated_diameter]);

  const approachData = neo.close_approach_data[0];
  const distance = approachData
    ? parseFloat(approachData.miss_distance.kilometers)
    : 0;
  const velocity = approachData
    ? parseFloat(approachData.relative_velocity.kilometers_per_hour)
    : 0;

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all duration-200 hover:shadow-lg ${
        isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
      }`}
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(e.target.checked)}
            className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <div>
            <h3 className="font-bold text-lg text-gray-900 leading-tight">
              {neo.name.replace(/[()]/g, "")}
            </h3>
            {neo.is_potentially_hazardous_asteroid && (
              <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold mt-1">
                ⚠️ Potentially Hazardous
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex justify-between">
          <span>Diameter:</span>
          <span className="font-medium">~{diameterAvg.toFixed(2)} km</span>
        </div>
        <div className="flex justify-between">
          <span>Approach Date:</span>
          <span className="font-medium">{neo.approach_date}</span>
        </div>
        <div className="flex justify-between">
          <span>Distance:</span>
          <span className="font-medium">{distance.toLocaleString()} km</span>
        </div>
        <div className="flex justify-between">
          <span>Velocity:</span>
          <span className="font-medium">{velocity.toLocaleString()} km/h</span>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(neo)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
      >
        View Details
      </button>
    </div>
  );
};

export default EventCard;
