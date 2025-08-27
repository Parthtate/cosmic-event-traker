import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import EventList from "./components/NEO/EventList";
import CompareView from "./components/NEO/CompareView";
import { useNASAApi } from "./hooks/useNASAApi";
import { useAuth } from "./hooks/useAuth";
import AuthComponent from "./components/Auth/AuthComponent";

export default function App() {
  const { session, loading: authLoading } = useAuth();
  const [selectedNEOs, setSelectedNEOs] = useState([]);
  const [currentDateRange, setCurrentDateRange] = useState(() => {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 6);
    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    };
  });

  const { neoData, loading, error, fetchNEOFeed } = useNASAApi();

  useEffect(() => {
    fetchNEOFeed(currentDateRange.start, currentDateRange.end);
  }, [currentDateRange, fetchNEOFeed]);

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

  if (authLoading) return null;
  if (!session) return <AuthComponent />;

  return (
    <Router>
      <div
        className="min-h-screen bg-gray-50"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <Header selectedCount={selectedNEOs.length} />

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <EventList
                  neoData={neoData}
                  loading={loading}
                  error={error}
                  selectedNEOs={selectedNEOs}
                  onSelectionChange={setSelectedNEOs}
                  onLoadMore={handleLoadMore}
                />
              }
            />
            <Route
              path="/compare"
              element={
                selectedNEOs.length > 1 ? (
                  <CompareView selectedNEOs={selectedNEOs} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
