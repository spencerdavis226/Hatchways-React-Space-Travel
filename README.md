Space Travel

A React-based application that lets users explore a simulated space travel experience. Build and manage spacecraft, dispatch them to planets, and explore a solar system using a mock API.

Overview

This project is built using React, Vite, and CSS Modules. It employs a modern folder structure and follows best practices for styling (BEM naming conventions), state management (React Context), and error handling (Error Boundary). Basic tests are included using Vitest and React Testing Library.

Features
• Home Page: Provides an overview and simple navigation links.
• Spacecrafts Page: Displays a list of spacecraft with options to view details and delete them.
• Spacecraft Detail Page: Shows comprehensive information about a selected spacecraft.
• Construction Page: Allows building new spacecraft (with basic form validation).
• Planets Page: Lists planets, shows stationed spacecraft, and enables dispatching spacecraft to other planets.
• Error Handling: An Error Boundary catches unexpected runtime errors.
• Testing: Basic tests demonstrate functionality (BackButton, Notification, ErrorBoundary, etc.).
• Routing: Uses React Router with a dedicated routes folder and a fallback for unmatched routes.

Folder Structure
src
├─ components
│ ├─ BackButton.jsx
│ ├─ ErrorBoundary.jsx
│ ├─ Notification.jsx
│ └─ ... (other reusable components)
├─ context
│ └─ SpaceTravelContext.jsx
├─ pages
│ ├─ HomePage.jsx
│ ├─ SpacecraftsPage.jsx
│ ├─ SpacecraftDetailPage.jsx
│ ├─ ConstructionPage.jsx
│ ├─ PlanetsPage.jsx
│ └─ NotFoundPage.jsx
├─ routes
│ └─ AppRoutes.jsx
├─ services
│ ├─ SpaceTravelApi.js
│ └─ SpaceTravelMockApi.js
├─ styles
│ ├─ index.css
│ ├─ App.module.css
│ └─ ... (other .module.css files)
├─ App.jsx
├─ main.jsx
└─ ...
• components: Reusable UI components (BackButton, Notification, ErrorBoundary, etc.).
• context: React Context provider (SpaceTravelContext) for global state management.
• pages: Full-page components (HomePage, SpacecraftsPage, ConstructionPage, PlanetsPage, etc.).
• routes: Contains routing logic (AppRoutes.jsx) defining how pages are rendered.
• services: Contains API service files (SpaceTravelApi.js and SpaceTravelMockApi.js).

API

The back-end is simulated using a mock API. Do not modify the /services/SpaceTravelMockApi.js file. Instead, use the /services/SpaceTravelApi.js to interact with the API.

Data Structures

Response
{
isError: <boolean>,
data: <any>
}

Planet
{
id: <int>,
name: <string>,
currentPopulation: <int>,
pictureUrl: <string> (optional)
}

Spacecraft
{
id: <string>,
name: <string>,
capacity: <int>,
description: <string>,
pictureUrl: <string> (optional),
currentLocation: <int>
}

API Methods
• getPlanets()
Returns an array of planets.
• getSpacecrafts()
Returns an array of spacecraft.
• getSpacecraftById({ id })
Returns a specific spacecraft by ID.
• buildSpacecraft({ name, capacity, description, pictureUrl })
Creates a new spacecraft. The ID is generated automatically.
• destroySpacecraftById({ id })
Deletes a spacecraft by its ID.
• sendSpacecraftToPlanet({ spacecraftId, targetPlanetId })
Dispatches a spacecraft from its current planet to another planet.
• If the capacity exceeds the current population, it transfers as many people as possible.
• Throws an error if dispatching to the same planet.

Installation

1. Clone the repository
   git clone <repository-url>
   cd Hatchways-React-Space-Travel
2. Install dependencies
   npm install
3. Start the development server
   npm run dev
4. Clear local storage (Optional)
   If you want a fresh dataset, open your browser’s dev tools and clear local storage.

Testing

This project uses Vitest and React Testing Library.
npm run test
• HomePage.test.jsx demonstrates a basic test ensuring the page renders.
• BackButton.test.jsx checks navigation logic.
• Notification.test.jsx verifies close functionality.
• ErrorBoundary.test.jsx ensures errors are caught and fallback UI is displayed.

Deployment

For a production build, run:
npm run build

Then preview locally with:
npm run preview

Styling
• CSS Modules and BEM Methodology
Each page or component has a corresponding .module.css file (e.g., HomePage.module.css, SpacecraftsPage.module.css).
• Global Styles
Shared resets and global settings are defined in index.css.
• Dark Space Theme
The background and text colors are set to a space-friendly dark style.

Error Handling

An Error Boundary component wraps your main routes, catching unexpected runtime errors and displaying a fallback UI.

Contributing

Contributions are welcome! If you’d like to add features or fix bugs, please open a pull request. 1. Fork the repo. 2. Create a new feature branch. 3. Commit and push changes. 4. Open a PR describing your changes.
