import { supabase } from "../../services/supabaseClient";

const Header = ({ selectedCount, onCompare }) => (
  <header
    className="bg-black text-white shadow-lg"
    style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
  >
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      {/* Left spacer for balance when compare button is present */}
      <div className="flex-1">{/* Empty div for spacing */}</div>

      {/* Centered title section */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">🌌 Cosmic Event Tracker</h1>
        <p className="text-gray-300 text-sm">
          Track Near-Earth Objects & Cosmic Events
        </p>
      </div>

      {/* Right section with compare button or spacer */}
      <div className="flex-1 flex justify-end">
        {selectedCount > 0 && (
          <button
            onClick={onCompare}
            className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Compare ({selectedCount})
          </button>
        )}
      </div>
    </div>

    <button
      onClick={() => supabase.auth.signOut()}
      className="ml-4 text-sm text-blue-200 hover:text-white"
    >
      Log out
    </button>
  </header>
);

export default Header;
