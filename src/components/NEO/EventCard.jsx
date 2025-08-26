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
      className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-300 ${
        isSelected ? "ring-4 ring-gray-300 bg-gray-50" : ""
      }`}
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(e.target.checked)}
            className="mr-4 h-5 w-5 text-black rounded border-2 border-gray-900 focus:ring-2 focus:ring-gray-500 mt-1"
          />
          <div>
            <h3 className="font-bold text-xl text-black leading-tight mb-2">
              {neo.name.replace(/[()]/g, "")}
            </h3>
            {neo.is_potentially_hazardous_asteroid && (
              <span className="inline-block bg-yellow-300 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                ⚠️ Potentially Hazardous
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Diameter:</span>
            <span className="font-bold text-black">
              ~{diameterAvg.toFixed(2)} km
            </span>
          </div>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Approach Date:
            </span>
            <span className="font-bold text-black">{neo.approach_date}</span>
          </div>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Distance:</span>
            <span className="font-bold text-black">
              {distance.toLocaleString()} km
            </span>
          </div>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Velocity:</span>
            <span className="font-bold text-black">
              {velocity.toLocaleString()} km/h
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(neo)}
        className="w-full bg-blue-700 hover:bg-blue-900 text-white py-3 px-2 font-bold uppercase tracking-wide transition-all duration-200 shadow-md hover:shadow-lg"
      >
        View Details
      </button>
    </div>
  );
};

export default EventCard;
