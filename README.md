# SPACE TRAVEL

A React-based application that lets users explore a simulated space travel experience. Build and manage spacecraft, dispatch them to planets, and explore a solar system using a mock API.

## OVERVIEW

This project is built using React, Vite, and CSS Modules. It follows best practices for styling (BEM methodology), state management (React Context), and error handling (Error Boundary). Basic tests are provided using Vitest and React Testing Library.

## FEATURES

• Home Page: Overview and simple navigation links.  
• Spacecrafts Page: Lists spacecraft with options to view details and delete.  
• Spacecraft Detail Page: Shows comprehensive information about a selected spacecraft.  
• Construction Page: Allows building new spacecraft with form validation.  
• Planets Page: Lists planets, shows stationed spacecraft, and supports dispatching spacecraft to other planets.  
• Error Handling: An Error Boundary catches unexpected runtime errors.  
• Testing: Basic tests for components like BackButton, Notification, and ErrorBoundary.  
• Routing: Uses React Router with a dedicated routes folder and a fallback for unmatched routes.

## FOLDER STRUCTURE

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

- **components**: Reusable UI elements (BackButton, Notification, ErrorBoundary, etc.).
- **context**: React Context provider (SpaceTravelContext) for global state.
- **pages**: Page-level components (HomePage, SpacecraftsPage, ConstructionPage, PlanetsPage, etc.).
- **routes**: Contains the routing logic (AppRoutes.jsx).
- **services**: API service files (SpaceTravelApi.js and SpaceTravelMockApi.js).

## API

The back end is simulated using a mock API. Do not modify /services/SpaceTravelMockApi.js. Instead, use /services/SpaceTravelApi.js for all API interactions.

## DATA STRUCTURES

### Response

{
isError: <boolean>,
data: <any>
}

### Planet

{
id: <int>,
name: <string>,
currentPopulation: <int>,
pictureUrl: <string> (optional)
}

### Spacecraft

{
id: <string>,
name: <string>,
capacity: <int>,
description: <string>,
pictureUrl: <string> (optional),
currentLocation: <int>
}

## API METHODS

- **getPlanets()**  
  Returns an array of planets.

- **getSpacecrafts()**  
  Returns an array of spacecraft.

- **getSpacecraftById({ id })**  
  Returns a specific spacecraft by ID.

- **buildSpacecraft({ name, capacity, description, pictureUrl })**  
  Creates a new spacecraft. The ID is generated automatically.

- **destroySpacecraftById({ id })**  
  Deletes a spacecraft by its ID.

- **sendSpacecraftToPlanet({ spacecraftId, targetPlanetId })**  
  Dispatches a spacecraft from its current planet to another. If capacity exceeds the planet’s population, it transfers as many as possible. Throws an error if dispatching to the same planet.

## INSTALLATION

1. Clone the repository:
   git clone <repository-url>
   cd Hatchways-React-Space-Travel

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

4. (Optional) Clear local storage for a fresh dataset.

## TESTING

This project uses Vitest and React Testing Library.
npm run test

- HomePage.test.jsx checks basic rendering.
- BackButton.test.jsx verifies navigation logic.
- Notification.test.jsx checks close functionality.
- ErrorBoundary.test.jsx confirms error fallback behavior.

## DEPLOYMENT

To build for production:
npm run build

Then preview locally:
npm run preview

## STYLING

- **CSS Modules + BEM**: Each page/component has a matching .module.css file (e.g., HomePage.module.css).
- **Global Styles**: index.css for resets and global settings.
- **Dark Space Theme**: A black background and white text for a space-friendly style.

## ERROR HANDLING

An Error Boundary wraps the main routes, catching runtime errors and displaying a fallback UI.

## CONTRIBUTING

Contributions are welcome! If you’d like to add features or fix bugs:

1. Fork the repository.
2. Create a new feature branch.
3. Commit and push your changes.
4. Open a Pull Request describing your updates.
