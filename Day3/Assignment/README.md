# GitHub Repository Finder

A lightweight, production-ready micro-app built with React and TypeScript that allows users to search for GitHub repositories, bookmark their favorites, and filter the results. This project emphasizes modern development practices, performance optimization, and clean architecture.

---

## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack & Libraries](#-tech-stack--libraries)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Architectural Decisions & Best Practices](#-architectural-decisions--best-practices)
- [License](#-license)

---

## ✨ Features
- ⚡ **Debounced Live Search:** Fetches repository data from the GitHub API as you type, with a debounce mechanism to prevent excessive API calls and avoid rate-limiting.  
- 🔖 **Persistent Bookmarking:** Users can bookmark their favorite repositories. All bookmarks are saved to localStorage and persist across page reloads.  
- 💾 **Persistent Search State:** The last search term and its results are also persisted, so the application state is fully restored on a browser refresh.  
- 🔄 **Smart Filtering:** A simple toggle allows users to filter the view to show either all search results or only their bookmarked items.  
- 💯 **User Experience Feedback:** The UI provides clear "Typing..." and "Searching..." indicators, along with robust error handling, to keep the user informed of the application's state.  
- 🚀 **Optimized Performance:** Utilizes React.memo on list items to prevent unnecessary re-renders, ensuring a smooth experience even with rapid user input.  
- 📱 **Responsive Design:** The UI is built with a responsive grid that adapts cleanly to different screen sizes, from mobile to desktop.  

---

## 🛠️ Tech Stack & Libraries
- **Framework:** React (with TypeScript)  
- **Build Tool:** Vite  
- **Data Fetching & Caching:** TanStack Query v5  
- **Global State Management:** Zustand  
- **Styling:** Plain CSS with a modern, responsive layout  

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)  
- npm or yarn  

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Navigate to the project directory
cd your-repo-name

# Install dependencies
npm install

# Run the development server
npm run dev

```
## 🏛️ Architectural Decisions & Best Practices

This project was built with a focus on modern React architecture and performance.

---

### 1. State Management with Zustand
Instead of relying solely on local component state (`useState`), this project uses **Zustand** for global state management. This provides several advantages:

- **Separation of Concerns:** All logic related to bookmarks and search history is decoupled from the UI, making the `App` component cleaner and more focused.  
- **Persist Middleware:** Zustand's `persist` middleware handles all `localStorage` interactions automatically. This eliminates the need for manual `useEffect` hooks to read from or write to storage, reducing boilerplate and potential bugs.  
- **Performance:** Zustand is optimized to prevent unnecessary re-renders by default. Components only re-subscribe to the specific parts of the store they use.  

---

### 2. Data Fetching with TanStack Query
All interactions with the GitHub API are managed by **TanStack Query**, which is designed to handle server state.

- **Declarative & Automatic:** Simplifies data fetching, caching, and background updates.  
- **Robust State Handling:** Provides dedicated states like `isFetching` and `isError` out of the box, making it easy to build a responsive and informative UI.  
- **Caching:** Automatically caches API responses. If you search for the same term again, results are served instantly from the cache while a fresh copy is fetched in the background.  

---

### 3. Performance Optimization
- **React.memo:** The `RepoCard` component is wrapped in `React.memo`. This prevents all 30 cards from re-rendering every time the user types a character in the search box, which would otherwise be a significant performance bottleneck.  
- **Debouncing:** The search input is debounced to ensure API calls are only made when the user has paused typing. This conserves GitHub API rate limits and provides a smoother user experience.  
