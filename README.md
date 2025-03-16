# Instant Chef

Instant Chef is a web-based platform designed to revolutionize the way you cook. It helps users discover personalized recipes based on the ingredients they have in their pantry, with features such as an AI assistant (Juniper) to guide them, suggestions for complementary ingredients, and the ability to save their favorite recipes. Instant Chef also focuses on reducing food waste by promoting the use of existing ingredients.

### Live website Link:
You can access the live website here: [Instant Chef](https://ourinstantchef.netlify.app/)

### Live Backend API Link:
You can access the live API here: [Instant Chef Backend](https://instant-chef-api-1.onrender.com/)

### Backend repository:
You can find the backend code here: [Instant Chef Backend Repository](https://github.com/MaskuraBegum/Instant_Chef_Api).

---

## Features

- **Personalized Recipe Recommendations**: Get recipe suggestions based on the ingredients you have in your pantry.
- **AI Chef Juniper**: Interact with our AI-powered chef, Juniper, for real-time cooking advice and ingredient suggestions.
- **Favorite Recipes**: Save your favorite recipes for easy access later.
- **Reduce Food Waste**: Make the most of what you already have by utilizing available ingredients.
- **Complementary Ingredient Suggestions**: Get suggestions for complementary ingredients to elevate your dishes.
- **Recipe Details**: Comprehensive recipe information, including preparation and cooking steps.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Firebase User Authentication, Firebase Admin SDK
- **AI Assistant**: Juniper (AI-powered recipe assistant)
- **Database**: MongoDB (via Mongoose)

## Backend API

The backend is built using **Node.js**, **Express.js**, and **MongoDB**. It exposes the following routes:

- **GET `/recipes`**: Fetch all recipes from the database.
- **GET `/recipes/filter`**: Filter recipes based on the ingredients provided. It returns recipes that contain any of the specified ingredients (OR logic).
- **GET `/recipes/include`**: Filter recipes based on the ingredients provided. It returns recipes that contain all the specified ingredients (AND logic).
- **POST `/recipes/add`**: Add a new recipe to the database. This is an admin-only route that requires Firebase authentication and admin privileges.
- **DELETE `/recipes/delete/:name`**: Delete a recipe by name from the database. This is an admin-only route that requires Firebase authentication and admin privileges.
- **PUT `/recipes/update/:name`**: Update an existing recipe by name. This is an admin-only route that requires Firebase authentication and admin privileges.
- **POST `/recipes/favorite`**: Add a recipe to a user's favorites. The user must be authenticated via Firebase, and the recipe is added to the user's `favorites` array.
- **GET `/recipes/userfav`**: Retrieve all favorite recipes for the authenticated user.
- **POST `/api/chat`**: Interact with the AI-powered Juniper chatbot to get personalized recipe recommendations, ingredient suggestions, and real-time cooking advice.


## Installation

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud)

### Clone the repository

```bash
git clone https://github.com/MaskuraBegum/Instant-Chef.git
cd Instant-chef
