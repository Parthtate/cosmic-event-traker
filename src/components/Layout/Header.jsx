const Header = ({ selectedCount, onCompare }) => (
  <header
    className="bg-blue-900 text-white shadow-lg"
    style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
  >
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">🌌 Cosmic Event Tracker</h1>
        <p className="text-blue-200 text-sm">
          Track Near-Earth Objects & Cosmic Events
        </p>
      </div>

      {selectedCount > 0 && (
        <button
          onClick={onCompare}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Compare ({selectedCount})
        </button>
      )}
    </div>
  </header>
);

export default Header;
