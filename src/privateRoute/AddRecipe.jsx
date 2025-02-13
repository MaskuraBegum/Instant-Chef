import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/Auth_provider'; // Import context

const AddRecipe = () => {
  const { user, isAdmin, loading } = useContext(AuthContext); // Get user from AuthContext
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');
  const [cookingTime, setCookingTime] = useState(''); // Added state for cookingTime
  const [category, setCategory] = useState(''); // Added state for category
  const [createdBy, setCreatedBy] = useState(''); // Set state for createdBy

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Fetch Firebase ID token
    try {
      
      if(loading){
        return <div>content is loading</div>
      }
      if (!isAdmin) {
        console.error('No admin is logged in.');
        return;
      }
      const token = await user.getIdToken(true); // Get token for the user
      console.log(token);

      // Prepare the data to be sent
      const recipeData = {
        name,
        description,
        ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
        instructions,
        image, 
        cookingTime: parseInt(cookingTime, 10), // Ensure cookingTime is a number
        category,
        createdBy, // Use the value from the input field
      };

      // Make the API request
      const response = await axios.post('http://localhost:5000/recipes/add', recipeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log('Recipe added:', response.data);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };
 
  return (
    <div className="container mx-auto px-4 py-8">
  <h2 className="text-2xl font-semibold text-center mb-6">Add a New Recipe</h2>
  <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-4 bg-white p-6 rounded-lg shadow-md">
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name:</label>
        <input
          type="text"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (comma-separated):</label>
        <input
          type="text"
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Instructions:</label>
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL:</label>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Time (in minutes):</label>
        <input
          type="number"
          placeholder="Cooking Time"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Created By (Admin):</label>
        <input
          type="text"
          placeholder="Created By"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <div className="mt-6">
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </div>
  </form>
</div>

  );
};

export default AddRecipe;
