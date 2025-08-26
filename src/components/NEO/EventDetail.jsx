const EventDetail = ({ neo, onClose }) => {
  const diameterMin = neo.estimated_diameter.kilometers.estimated_diameter_min;
  const diameterMax = neo.estimated_diameter.kilometers.estimated_diameter_max;
  const approachData = neo.close_approach_data[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {neo.name.replace(/[()]/g, "")}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>NEO Reference ID:</span>
                  <span className="font-medium">{neo.neo_reference_id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Potentially Hazardous:</span>
                  <span
                    className={`font-medium ${
                      neo.is_potentially_hazardous_asteroid
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {neo.is_potentially_hazardous_asteroid ? "Yes ⚠️" : "No ✅"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Diameter Range:</span>
                  <span className="font-medium">
                    {diameterMin.toFixed(3)} - {diameterMax.toFixed(3)} km
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Approach Data</h3>
              {approachData && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Approach Date:</span>
                    <span className="font-medium">
                      {approachData.close_approach_date}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Approach Time:</span>
                    <span className="font-medium">
                      {approachData.close_approach_date_full}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Miss Distance:</span>
                    <span className="font-medium">
                      {parseFloat(
                        approachData.miss_distance.kilometers
                      ).toLocaleString()}{" "}
                      km
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Velocity:</span>
                    <span className="font-medium">
                      {parseFloat(
                        approachData.relative_velocity.kilometers_per_hour
                      ).toLocaleString()}{" "}
                      km/h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Orbiting Body:</span>
                    <span className="font-medium">
                      {approachData.orbiting_body}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <a
              href={neo.nasa_jpl_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              View on NASA JPL →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
