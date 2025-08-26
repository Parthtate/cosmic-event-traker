// src/components/NEO/CompareView.jsx
import { ResponsiveBar } from "@nivo/bar";

/**
 * CompareView
 * -----------
 * Displays a grouped-bar chart so users can visually compare
 *  • miss-distance (km)
 *  • velocity (km / h)
 *  • mean diameter (km)
 * for every NEO they previously selected.
 *
 * Props
 *  • selectedNEOs : Array<NEO>
 *  • onBack       : () => void
 */
const CompareView = ({ selectedNEOs = [], onBack }) => {
  /* ---------- shape chart-ready data ---------- */
  const chartData = selectedNEOs.map((neo) => {
    const approach = neo.close_approach_data?.[0] ?? {};

    return {
      name: neo.name.replace(/[()]/g, ""), // x-axis label
      distanceKm: parseFloat(approach.miss_distance?.kilometers) || 0, // bar-1
      velocityKph:
        parseFloat(approach.relative_velocity?.kilometers_per_hour) || 0, // bar-2
      diameterKm:
        (neo.estimated_diameter.kilometers.estimated_diameter_min +
          neo.estimated_diameter.kilometers.estimated_diameter_max) /
        2, // bar-3
    };
  });

  return (
    <div
      className="min-h-screen bg-gray-50 px-4 py-6"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      {/* ───────────── header row ───────────── */}
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2
                   text-white hover:bg-blue-700 transition-colors"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4">
        Compare Selected Near-Earth Objects
      </h2>

      {/* ───────────── chart ───────────── */}
      <div style={{ height: 500 }}>
        <ResponsiveBar
          data={chartData}
          keys={["distanceKm", "velocityKph", "diameterKm"]}
          indexBy="name"
          colors={{ scheme: "nivo" }}
          margin={{ top: 50, right: 140, bottom: 80, left: 60 }}
          padding={0.35}
          groupMode="grouped"
          axisBottom={{
            tickRotation: 40,
            legend: "Near-Earth Object",
            legendOffset: 60,
            legendPosition: "middle",
          }}
          axisLeft={{
            legend: "Value",
            legendOffset: -50,
            legendPosition: "middle",
          }}
          labelSkipWidth={18}
          labelSkipHeight={15}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              translateX: 120,
              itemWidth: 100,
              itemHeight: 20,
              symbolSize: 20,
            },
          ]}
          animate
        />
      </div>
    </div>
  );
};

export default CompareView;
