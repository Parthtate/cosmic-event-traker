import { useState, useEffect, useCallback } from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import EventList from "./components/NEO/EventList";
import CompareView from "./components/NEO/CompareView";
import { useNASAApi } from "./hooks/useNASAApi";

export default function App() {
  /* ─── UI state ─── */
  const [selectedNEOs, setSelectedNEOs] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  /* ─── date range for the feed ─── */
  const [currentDateRange, setCurrentDateRange] = useState(() => {
    const todayISO = new Date().toISOString().split("T")[0];
    const in7ISO = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    return { start: todayISO, end: in7ISO };
  });

  /* ─── NASA data ─── */
  const { neoData, loading, error, fetchNEOFeed } = useNASAApi();

  /* ─── initial + subsequent fetches ─── */
  useEffect(() => {
    fetchNEOFeed(currentDateRange.start, currentDateRange.end);
  }, [currentDateRange, fetchNEOFeed]);

  /* ─── handlers ─── */
  const handleLoadMore = useCallback(() => {
    const lastEnd = new Date(currentDateRange.end);
    lastEnd.setDate(lastEnd.getDate() + 1);
    const newEnd = new Date(lastEnd);
    newEnd.setDate(newEnd.getDate() + 7);
    const newEndISO = newEnd.toISOString().split("T")[0];

    setCurrentDateRange((prev) => ({ ...prev, end: newEndISO }));
    fetchNEOFeed(currentDateRange.start, newEndISO);
  }, [currentDateRange, fetchNEOFeed]);

  const handleCompare = useCallback(() => {
    if (selectedNEOs.length > 1) setShowComparison(true);
  }, [selectedNEOs]);

  /* ─── render ─── */
  if (showComparison) {
    return (
      <CompareView
        selectedNEOs={selectedNEOs}
        onBack={() => setShowComparison(false)}
      />
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <Header selectedCount={selectedNEOs.length} onCompare={handleCompare} />

      <main className="container mx-auto px-4 py-8">
        <EventList
          neoData={neoData}
          loading={loading}
          error={error}
          selectedNEOs={selectedNEOs}
          onSelectionChange={setSelectedNEOs}
          onLoadMore={handleLoadMore}
        />
      </main>

      <Footer />
    </div>
  );
}
