// src/components/Charts/ComparisonChart.jsx
import { ResponsiveBar } from "@nivo/bar";

/**
 * ComparisonChart
 * ----------------
 * Re-usable bar chart used by CompareView.
 *
 * Expected data shape:
 * [
 *   {
 *     name:        "Apophis",
 *     distanceKm:  384400,
 *     velocityKph: 37500,
 *     diameterKm:  0.37
 *   },
 *   …
 * ]
 */
const ComparisonChart = ({ data }) => (
  <div style={{ height: 500 }}>
    <ResponsiveBar
      data={data}
      keys={["distanceKm", "velocityKph", "diameterKm"]}
      indexBy="name"
      groupMode="grouped"
      margin={{ top: 50, right: 140, bottom: 80, left: 60 }}
      padding={0.35}
      colors={{ scheme: "nivo" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.4]] }}
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
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          translateX: 120,
          itemWidth: 110,
          itemHeight: 20,
          symbolSize: 18,
        },
      ]}
      animate
    />
  </div>
);

export default ComparisonChart;
