const FilterPanel = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 mb-6"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <h3 className="text-lg font-semibold mb-4">Filter & Sort</h3>

      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.showHazardous}
            onChange={(e) =>
              handleFilterChange("showHazardous", e.target.checked)
            }
            className="mr-2 h-4 w-4 text-red-600 rounded border-gray-300"
          />
          <span className="text-sm">Show only potentially hazardous</span>
        </label>

        <div className="flex items-center space-x-2">
          <span className="text-sm">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="approach_date">Approach Date</option>
            <option value="diameter">Diameter</option>
            <option value="distance">Distance</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm">Order:</span>
          <select
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
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
