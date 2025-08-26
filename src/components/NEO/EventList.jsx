// src/components/NEO/EventList.jsx
import { useState, useCallback, useMemo } from "react";
import EventCard from "./EventCard";
import EventDetail from "./EventDetail";
import LoadingSpinner from "../UI/LoadingSpinner";
import FilterPanel from "../UI/FilterPanel";

/**
 * EventList
 * ---------
 * Renders NEO cards + filter/sort controls.
 *
 * Props
 *  • neoData            full array from NASA feed
 *  • loading            boolean
 *  • error              string | null
 *  • selectedNEOs       array of currently-selected NEOs
 *  • onSelectionChange  fn(updatedArray)
 *  • onLoadMore         fn() – extends the date range in parent
 */
const EventList = ({
  neoData,
  loading,
  error,
  selectedNEOs,
  onSelectionChange,
  onLoadMore,
}) => {
  /* local UI state */
  const [selectedNEO, setSelectedNEO] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    showHazardous: false,
    sortBy: "approach_date", // approach_date | diameter | distance
    sortOrder: "asc", // asc | desc
  });

  /* ---------- selection handlers ---------- */
  const handleCardSelect = useCallback(
    (neo, isSelected) => {
      if (isSelected) {
        onSelectionChange([...selectedNEOs, neo]);
      } else {
        onSelectionChange(selectedNEOs.filter((n) => n.id !== neo.id));
      }
    },
    [selectedNEOs, onSelectionChange]
  );

  const handleViewDetails = useCallback((neo) => {
    setSelectedNEO(neo);
    setShowModal(true);
  }, []);

  /* ---------- derived, memoised list ---------- */
  const filteredAndSortedData = useMemo(() => {
    const toNumber = (neo) => {
      if (filters.sortBy === "approach_date") {
        return new Date(neo.approach_date).getTime();
      }
      if (filters.sortBy === "diameter") {
        const { estimated_diameter: ed } = neo;
        return (
          (ed.kilometers.estimated_diameter_min +
            ed.kilometers.estimated_diameter_max) /
          2
        );
      }
      /* distance */
      return parseFloat(
        neo.close_approach_data?.[0]?.miss_distance?.kilometers || 0
      );
    };

    return neoData
      .filter(
        (neo) => !filters.showHazardous || neo.is_potentially_hazardous_asteroid
      )
      .sort((a, b) =>
        filters.sortOrder === "asc"
          ? toNumber(a) - toNumber(b)
          : toNumber(b) - toNumber(a)
      );
  }, [neoData, filters]);

  /* ---------- error state ---------- */
  if (error) {
    return (
      <div
        className="text-center py-12 bg-gray-50"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <div className="bg-white border-l-4 border-red-500 p-6 mx-auto max-w-md shadow-lg">
          <div className="text-red-600 text-lg font-semibold mb-2">
            ⚠️ Error Loading Data
          </div>
          <p className="text-gray-800">{error}</p>
        </div>
      </div>
    );
  }

  /* ---------- main render ---------- */
  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div className="container mx-auto px-4 py-6">
        <FilterPanel filters={filters} onFilterChange={setFilters} />

        {loading && <LoadingSpinner />}

        {!loading && filteredAndSortedData.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto border border-gray-200">
              <p className="text-gray-600 text-lg">No events to display.</p>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {filteredAndSortedData.map((neo) => (
            <EventCard
              key={neo.id}
              neo={neo}
              isSelected={selectedNEOs.some((n) => n.id === neo.id)}
              onSelect={(sel) => handleCardSelect(neo, sel)}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {!loading && filteredAndSortedData.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={onLoadMore}
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg border-2 border-black hover:border-gray-800"
            >
              Load More Events
            </button>
          </div>
        )}

        {showModal && selectedNEO && (
          <EventDetail neo={selectedNEO} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default EventList;
