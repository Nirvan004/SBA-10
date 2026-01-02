Recipe Discovery App
Overview
The Recipe Discovery App is a client-side, single-page application (SPA) built with React that allows users to browse, search, and explore recipes using data from TheMealDB API. The project demonstrates advanced React concepts including custom hooks, global state management with Context API, routing, and persistent state using localStorage.
Users can explore recipes by category, view detailed recipe information, search for meals by name, and manage a personal list of favorite recipes that persists across browser sessions.

Features
Browse recipe categories
View recipes by category
Search recipes by name
View detailed recipe information (image, ingredients, instructions)
Add and remove recipes from favorites
Persist favorites using localStorage
Responsive, user-friendly UI
Graceful loading and error handling

Tech Stack
React
React Router
TheMealDB API
Context API
Custom Hooks
CSS / CSS Modules / Styled Components (implementation dependent)

State Management & Data Fetching
Uses useState and useEffect for managing component state and API interactions
Displays loading indicators while data is being fetched
Displays error messages when API requests fail

Custom Hooks
useFetch
A reusable hook for fetching data from TheMealDB API.

Responsibilities:
Handles API requests
Manages loading state
Manages error state
Returns fetched data
Used throughout the app for categories, recipe lists, searches, and recipe details.

useLocalStorage
A custom hook that syncs React state with the browser’s localStorage.
Responsibilities:
Stores and retrieves persisted state
Keeps favorites saved across browser sessions
Used internally by the Favorites Context.

Global State – Favorites Context
FavoritesContext
Manages the user’s list of favorite recipes globally.
Provides:
favorites: Array of favorite recipe IDs
addFavorite(recipeId)
removeFavorite(recipeId)
isFavorite(recipeId)
Internally uses the useLocalStorage hook to persist favorites.

Routing
Implemented using React Router with dynamic routes.

Routes

Home (/)
Displays all recipe categories
Each category links to its category page

-Category (/category/:categoryName)
Displays all recipes within the selected category
Each recipe links to its detail page

-Recipe Detail (/recipe/:recipeId)
Displays full recipe details
Includes Add/Remove Favorites button

-Favorites (/favorites)
Displays all favorited recipes
Shows a message if no favorites exist

-Search (/search?query=...)
Displays search results based on user input

Components
Navbar
Displays navigation links
Contains search bar for recipe search

RecipeCard
Displays recipe image and name
Used in category, search, and favorites pages

Spinner
Shown during loading states

ErrorMessage
Displays user-friendly error messages when API calls fail

Styling
Responsive layout for desktop and mobile
Clean and visually appealing UI
Reusable component-based styling
Hover and active states for interactive elements

API Used
TheMealDB API
Free public API
No API key required

Reflection
The most challenging part of this project for me was working through the components in a smart way that didnt involve me doubling back or finishing half of a part before doing another part. It was hard work but as I worked through i got better at figuring out what i needed. Also the navigation was confusing as I didnt think about how the nav changes when newer parts are loaded which led to things like not having a way to leave the recipe once it was clicked on. The most important part of my design specifically was creating a recipe type that i used throughout my project. It helped me not define the recipe mutiple times which was nice.
