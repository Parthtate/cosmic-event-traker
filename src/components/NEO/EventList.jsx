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
 *  • onLoadMore         fn()  – extends the date range in parent
 */
const EventList = ({
  neoData,
  loading,
  error,
  selectedNEOs,
  onSelectionChange,
  onLoadMore,
}) => {
  /* local state */
  const [selectedNEO, setSelectedNEO] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    showHazardous: false,
    sortBy: "approach_date", // approach_date | diameter | distance
    sortOrder: "asc", // asc | desc
  });

  /* ------------ handlers ------------ */
  const handleCardSelect = useCallback(
    (neo, isSelected) => {
      if (isSelected) {
        onSelectionChange([...selectedNEOs, neo]);
      } else {
        onSelectionChange(selectedNEOs.filter((item) => item.id !== neo.id));
      }
    },
    [selectedNEOs, onSelectionChange]
  );

  const handleViewDetails = useCallback((neo) => {
    setSelectedNEO(neo);
    setShowModal(true);
  }, []);

  /* ------------ derived list (memoised) ------------ */
  const filteredAndSortedData = useMemo(() => {
    const list = neoData
      .filter(
        (neo) => !filters.showHazardous || neo.is_potentially_hazardous_asteroid
      )
      .sort((a, b) => {
        /* pick comparison value for each sort mode */
        const getValue = (neo) => {
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

        const diff = getValue(a) - getValue(b);
        return filters.sortOrder === "asc" ? diff : -diff;
      });

    return list;
  }, [neoData, filters]);

  /* ------------ render ------------ */
  if (error) {
    return (
      <div
        className="text-center py-12"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <div className="text-red-600 text-lg font-semibold mb-2">
          ⚠️ Error Loading Data
        </div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <FilterPanel filters={filters} onFilterChange={setFilters} />

      {loading && <LoadingSpinner />}

      {!loading && filteredAndSortedData.length === 0 && (
        <p className="text-center text-gray-600 mt-10">No events to display.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {filteredAndSortedData.map((neo) => (
          <EventCard
            key={neo.id}
            neo={neo}
            isSelected={selectedNEOs.some((item) => item.id === neo.id)}
            onSelect={(isSel) => handleCardSelect(neo, isSel)}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {!loading && filteredAndSortedData.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={onLoadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Load More Events
          </button>
        </div>
      )}

      {showModal && selectedNEO && (
        <EventDetail neo={selectedNEO} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default EventList;
