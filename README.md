#  Cosmic Event Tracker

A **React + Vite** SPA that visualizes upcoming **NASA Near-Earth Objects (NEOs)**.  
Browse asteroid approaches, filter hazardous objects, and compare multiple NEOs side-by-side on an interactive chart.


---

##  Features

* **Live NASA feed** – pulls the latest 7-day NEO data with your personal API key.  
* **Incremental loading** – “Load More” button extends the date range in 7-day blocks.  
* **Filter & Sort**  
  * Show only *potentially hazardous* asteroids.  
  * Sort by approach date, mean diameter, or miss-distance (asc/desc).  
* **Date-range picker** – choose any custom start / end dates (YYYY-MM-DD).  
* **Detailed modal** – click a card for full close-approach info, velocity, links to JPL.  
* **Multi-select + comparison** – checkbox each card, then open a grouped-bar chart comparing:  
  * Miss distance (km)  
  * Relative velocity (km/h)  
  * Mean diameter (km)  
* **Responsive UI** – Tailwind CSS grid adapts from mobile to desktop.  


---

##  Tech Stack

| Area               | Library / Tool |
|--------------------|----------------|
| Build setup        | Vite @React |
| UI components      | React 18 + Functional Hooks |
| Styling            | Tailwind CSS |
| Charts             | `@nivo/bar` |
| HTTP client        | Axios |
| State management   | Local component/state hooks (no global store) |

---

##  Quick Start

1. **git clone**  

2. **Install deps**  

3. **Environment**  
Create `.env.local` in the project root:

4. **Start dev server**  

---

##  Project Structure (trimmed)

## © License

MIT — free to use, modify, and distribute.
