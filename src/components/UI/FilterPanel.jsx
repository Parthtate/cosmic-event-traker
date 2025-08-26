const FilterPanel = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div
      className="bg-white  border-gray-900 rounded-lg shadow-lg p-6 mb-6"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <h3 className="text-xl font-bold text-black mb-6 border-b-2 border-gray-900 pb-2">
        Filter & Sort
      </h3>

      <div className="flex flex-wrap gap-6 items-center">
        <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={filters.showHazardous}
            onChange={(e) =>
              handleFilterChange("showHazardous", e.target.checked)
            }
            className="mr-3 h-5 w-5 text-black rounded border-2 border-gray-900 focus:ring-2 focus:ring-gray-500"
          />
          <span className="text-sm font-medium text-gray-900">
            Show only potentially hazardous
          </span>
        </label>

        <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-300">
          <span className="text-sm font-medium text-black">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="border-2 border-gray-900 rounded-md px-3 py-2 text-sm font-medium bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-50 transition-colors"
          >
            <option value="approach_date">Approach Date</option>
            <option value="diameter">Diameter</option>
            <option value="distance">Distance</option>
          </select>
        </div>

        <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-300">
          <span className="text-sm font-medium text-black">Order:</span>
          <select
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
            className="border-2 border-gray-900 rounded-md px-3 py-2 text-sm font-medium bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-50 transition-colors"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
