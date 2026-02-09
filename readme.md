# World Countries Data Dashboard

A state-driven, vanilla JavaScript dashboard that visualizes global country data with search, sorting, and interactive graphs.

## Features

-   Search countries by name, capital, or language (debounced)
-   Sort by name, capital, or population (asc / desc)
-   10 most populated countries (with world population)
-   10 most spoken languages
-   Single source of truth state
-   UI-only country name normalization
-   Smooth graph animations
-   Scroll-to-top utility button

## Architecture Overview

This project follows a layered architecture inspired by modern frameworks (React/Vue), implemented in pure JavaScript.

UI Events → State → Derived Data → Render UI

The app is predictable, testable, and easy to extend.

### Folder Structure

-   src/
    -   data/
        -   Raw data (countries)
    -   state/
        -   Global application state
    -   dom/
        -   Cached DOM selectors
    -   utils/
        -   Reusable helper functions
    -   services/
        -   Pure business logic
    -   ui/
        -   DOM creation & rendering
    -   events/
        -   Event listeners (user interaction)
    *   main.js
        -   App entry & orchestration

Each folder has one clear responsibility.

### Core Concepts

1. State (Single Source of Truth)
   State = {
   searchQuery,
   sortBy,
   sortOrder,
   graphView
   }

All UI is derived from state
No hidden mutations
Predictable rendering

2. Pure Functions (Services & Utils)
   Located in: services/ utils/
   These functions:
   Do not touch the DOM
   Do not mutate state
   Return new data

Examples: filterCountries, sortCountries, getPopulationGraphData, debounce, normalizeCountryName

This makes the logic:
testable
reusable
framework-agnostic

3. UI Layer (DOM Rendering)
   Located in ui/
   Responsibilities:
   Create DOM nodes
   Render lists and graphs
   Update visual state (active buttons, labels)

Examples: renderCountries, renderGraph, createCountryCard, updateSortButtons

UI functions never change state

4. Events Layer (User Interaction)
   Located in events/
   Responsibilities:
   Listen to user actions
   Update state
   Trigger a re-render

Example flow:
User clicks sort button → state updates → renderApp() runs → UI updates

Examples: search.js, sort.js, graphMode.js, scrollTop.js

### Application Flow

User Action → Event Handler → State Update → renderApp() → Derived Data → UI Render

There is only one render entry point: renderApp().
