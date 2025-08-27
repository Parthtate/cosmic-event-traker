// src/App.jsx
import { useState, useEffect, useCallback } from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import EventList from "./components/NEO/EventList";
import CompareView from "./components/NEO/CompareView";
import { useNASAApi } from "./hooks/useNASAApi";

import { useAuth } from "./hooks/useAuth"; // Supabase auth
import AuthComponent from "./components/Auth/AuthComponent";

export default function App() {
  /* ────── Supabase session ────── */
  const { session, loading: authLoading } = useAuth();

  /* ────── UI state ────── */
  const [selectedNEOs, setSelectedNEOs] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  /* ────── 7-day date window for the feed ────── */
  const [currentDateRange, setCurrentDateRange] = useState(() => {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 6); // 7-day inclusive
    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    };
  });

  /* ────── NASA data hook ────── */
  const { neoData, loading, error, fetchNEOFeed } = useNASAApi();

  /* ────── fetch whenever the window changes ────── */
  useEffect(() => {
    fetchNEOFeed(currentDateRange.start, currentDateRange.end);
  }, [currentDateRange, fetchNEOFeed]);

  /* ────── advance window by 7 days ────── */
  const handleLoadMore = useCallback(() => {
    const newStart = new Date(currentDateRange.end);
    newStart.setDate(newStart.getDate() + 1);

    const newEnd = new Date(newStart);
    newEnd.setDate(newEnd.getDate() + 6);

    const newStartISO = newStart.toISOString().split("T")[0];
    const newEndISO = newEnd.toISOString().split("T")[0];

    setCurrentDateRange({ start: newStartISO, end: newEndISO });
    fetchNEOFeed(newStartISO, newEndISO);
  }, [currentDateRange.end, fetchNEOFeed]);

  const handleCompare = useCallback(() => {
    if (selectedNEOs.length > 1) setShowComparison(true);
  }, [selectedNEOs]);

  /* ────── Auth gates ────── */
  if (authLoading) return null; // or <Spinner/>
  if (!session) return <AuthComponent />; // show login

  /* ────── Comparison page ────── */
  if (showComparison) {
    return (
      <CompareView
        selectedNEOs={selectedNEOs}
        onBack={() => setShowComparison(false)}
      />
    );
  }

  /* ────── Main page ────── */
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
