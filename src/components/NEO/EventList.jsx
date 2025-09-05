import React, { useMemo } from "react";
import FilterPanel from "../UI/FilterPanel";
import EventCard from "../NEO/EventCard";

// REMOVE: const [filters, setFilters] = React.useState({...});
// ADD: Accept filters and onFilterChange as props
const EventList = ({
  neoData,
  loading,
  error,
  selectedNEOs,
  onSelectionChange,
  onLoadMore,
  filters, // ADD: Accept filters as prop
  onFilterChange, // ADD: Accept onFilterChange as prop
}) => {
  // Memoize filtered and sorted NEOs list to improve performance
  const filteredAndSortedNEOs = useMemo(() => {
    let filtered = neoData.filter((neo) => {
      // Filter for potentially hazardous asteroids
      if (filters.showHazardous && !neo.is_potentially_hazardous_asteroid) {
        return false;
      }

      // Filter by minimum diameter
      if (filters.minDiameter && filters.minDiameter.trim() !== "") {
        const minDiameterNum = parseFloat(filters.minDiameter);
        if (!isNaN(minDiameterNum) && minDiameterNum >= 0) {
          const avgDiameter =
            (neo.estimated_diameter.kilometers.estimated_diameter_min +
              neo.estimated_diameter.kilometers.estimated_diameter_max) /
            2;

          // Show only NEOs with diameter >= minDiameter
          if (avgDiameter < minDiameterNum) {
            return false;
          }
        }
      }

      return true;
    });

    // Apply sorting
    return filtered.sort((a, b) => {
      const getValue = (item, field) => {
        switch (field) {
          case "approach_date":
            return new Date(
              item.close_approach_data[0]?.close_approach_date_full || 0
            );
          case "diameter":
            return (
              (item.estimated_diameter.kilometers.estimated_diameter_min +
                item.estimated_diameter.kilometers.estimated_diameter_max) /
              2
            );
          case "distance":
            return parseFloat(
              item.close_approach_data[0]?.miss_distance?.kilometers || 0
            );
          default:
            return 0;
        }
      };

      const valA = getValue(a, filters.sortBy);
      const valB = getValue(b, filters.sortBy);

      if (filters.sortOrder === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
  }, [neoData, filters]);

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading cosmic events...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* CHANGE: Use props instead of internal state */}
      <FilterPanel filters={filters} onFilterChange={onFilterChange} />

      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm">
          Showing {filteredAndSortedNEOs.length} of {neoData.length} Near-Earth
          Objects
          {filters.minDiameter && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              ≥ {filters.minDiameter} km diameter
            </span>
          )}
        </p>
      </div>

      {/* NEO Cards grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedNEOs.length > 0 ? (
          filteredAndSortedNEOs.map((neo) => (
            <EventCard
              key={neo.id}
              neo={neo}
              isSelected={selectedNEOs.some(
                (selected) => selected.id === neo.id
              )}
              onSelectionChange={onSelectionChange}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m-7 8h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">
              No Near-Earth Objects found matching your filter criteria
            </p>
            {filters.minDiameter && (
              <p className="text-gray-400 text-sm">
                Try a smaller diameter value (current: ≥ {filters.minDiameter}{" "}
                km)
              </p>
            )}
            <button
              // CHANGE: Use props instead of internal setFilters
              onClick={() =>
                onFilterChange((prev) => ({
                  ...prev,
                  minDiameter: "",
                  showHazardous: false,
                }))
              }
              className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Load More button */}
      {!loading && neoData.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={onLoadMore}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Load More Events
          </button>
        </div>
      )}
    </div>
  );
};

export default EventList;
