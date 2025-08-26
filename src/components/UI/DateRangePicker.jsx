// src/components/UI/DateRangePicker.jsx
/**
 * Lightweight date-range selector used by EventList.
 *
 * Props
 *  • startDate   ISO-8601 string (YYYY-MM-DD)
 *  • endDate     ISO-8601 string
 *  • onDateChange(key, value) – callback fired on each change
 *                               key ∈ 'start' | 'end'
 */
const DateRangePicker = ({ startDate, endDate, onDateChange }) => (
  <div
    className="flex flex-wrap gap-6 items-end mb-6"
    style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
  >
    {/* Start */}
    <label className="flex flex-col text-sm">
      <span className="mb-1 font-medium">Start date</span>
      <input
        type="date"
        value={startDate}
        max={endDate}
        onChange={(e) => onDateChange("start", e.target.value)}
        className="rounded border border-gray-300 px-3 py-1 focus:outline-none
                   focus:ring-2 focus:ring-blue-500"
      />
    </label>

    {/* End */}
    <label className="flex flex-col text-sm">
      <span className="mb-1 font-medium">End date</span>
      <input
        type="date"
        value={endDate}
        min={startDate}
        onChange={(e) => onDateChange("end", e.target.value)}
        className="rounded border border-gray-300 px-3 py-1 focus:outline-none
                   focus:ring-2 focus:ring-blue-500"
      />
    </label>
  </div>
);

export default DateRangePicker;
