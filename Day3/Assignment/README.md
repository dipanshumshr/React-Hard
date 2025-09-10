GitHub Repository Finder

A lightweight, production-ready micro-app built with React and TypeScript that allows users to search for GitHub repositories, bookmark their favorites, and filter the results. This project emphasizes modern development practices, performance optimization, and clean architecture.

[A placeholder for a screenshot of the application's interface]

Table of Contents
Features

Tech Stack & Libraries

Getting Started

Architectural Decisions

License

✨ Features
⚡ Debounced Live Search: Fetches repository data from the GitHub API as you type, with a debounce mechanism to prevent excessive API calls and avoid rate-limiting.

🔖 Persistent Bookmarking: Users can bookmark their favorite repositories. All bookmarks are saved to localStorage and persist across page reloads.

💾 Persistent Search State: The last search term and its results are also persisted, so the application state is fully restored on a browser refresh.

🔄 Smart Filtering: A simple toggle allows users to filter the view to show either all search results or only their bookmarked items.

💯 User Experience Feedback: The UI provides clear "Typing..." and "Searching..." indicators, along with robust error handling, to keep the user informed of the application's state.

🚀 Optimized Performance: Utilizes React.memo on list items to prevent unnecessary re-renders, ensuring a smooth experience even with rapid user input.

📱 Responsive Design: The UI is built with a responsive grid that adapts cleanly to different screen sizes, from mobile to desktop.

🛠️ Tech Stack & Libraries
Framework: React (with TypeScript)

Build Tool: Vite

Data Fetching & Caching: TanStack Query v5

Global State Management: Zustand

Styling: Plain CSS with a modern, responsive layout.

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v18 or later)

npm or yarn

Installation
Clone the repository:

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)

Navigate to the project directory:

cd your-repo-name

Install NPM packages:

npm install

Run the development server:

npm run dev

The application will be available at http://localhost:5173.

📜 Available Scripts
npm run dev: Starts the development server.

npm run build: Builds the app for production.

npm run lint: Lints the code for errors and style issues.

npm run preview: Serves the production build locally for preview.

🏛️ Architectural Decisions & Best Practices
This project was built with a focus on modern React architecture and performance.

1. State Management with Zustand
Instead of relying solely on local component state (useState), this project uses Zustand for global state management. This provides several advantages:

Separation of Concerns: All logic related to bookmarks and search history is decoupled from the UI, making the App component cleaner and more focused.

persist Middleware: Zustand's persist middleware handles all localStorage interactions automatically. This eliminates the need for manual useEffect hooks to read from or write to storage, reducing boilerplate and potential bugs.

Performance: Zustand is optimized to prevent unnecessary re-renders by default. Components only re-subscribe to the specific parts of the store they use.

2. Data Fetching with TanStack Query
All interactions with the GitHub API are managed by TanStack Query, which is designed to handle server state.

Declarative & Automatic: It simplifies data fetching, caching, and background updates.

Robust State Handling: It provides dedicated states like isFetching and isError out of the box, making it easy to build a responsive and informative UI.

Caching: It automatically caches API responses, which means if you search for the same term again, the data is served instantly from the cache while a fresh copy is fetched in the background.

3. Performance Optimization
React.memo: The RepoCard component is wrapped in React.memo. This prevents all 30 cards from re-rendering every time the user types a character in the search box, which would otherwise be a significant performance bottleneck.

Debouncing: The search input is debounced to ensure that API calls are only made when the user has paused typing. This is crucial for conserving API rate limits and providing a smoother user experience.

📄 License
Distributed under the MIT License. See LICENSE for more information.
