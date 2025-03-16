import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/Auth_provider'; // Import AuthContext
import { Link,useNavigate } from 'react-router-dom';

const UpdateRecipe = () => {
  const { user, isAdmin, loading } = useContext(AuthContext); // Get user and admin status
  const [name, setName] = useState('');
  const [updatedData, setUpdatedData] = useState({
    description: '',
    ingredients: '',
    instructions: '',
    image: '',
    cookingTime: '',
    category: '',
    createdBy: '',
  });
  const [message, setMessage] = useState(''); // For success/error messages
  const navigate = useNavigate();

  // Fetch recipe data to autofill the form
  const fetchRecipe = async () => {
    if (!name) {
      setMessage('Please enter the recipe name to fetch data.');
      return;
    }
  
    try {
      const token = await user.getIdToken(true); // Get the ID token for authorization
  
      // Fetch recipe details from the backend
      const response = await axios.get(`https://instant-chef-api-1.onrender.com/recipes?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const recipeData = response.data.recipeData; // Access recipeData array
  
      if (!recipeData || recipeData.length === 0) {
        setMessage('Recipe not found.');
        return;
      }
  
      const recipe = recipeData[0]; // Access the first recipe in the array
  
      // Update the form with fetched recipe data
      setUpdatedData({
        description: recipe.description || '', // Default to empty string if undefined
        ingredients: recipe.Ingredients?.join(', ') || '', // Convert array to string
        instructions: recipe.instructions || '',
        image: recipe.image || '',
        cookingTime: recipe.cookingTime ? recipe.cookingTime.toString() : '',
        category: recipe.category || '',
        createdBy: recipe.createdBy || '',
      });
  
      setMessage('Recipe data fetched successfully.');
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setMessage(error.response?.data?.message || 'Error fetching recipe.');
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle recipe update
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (loading) {
      setMessage('Loading, please wait...');
      return;
    }

    if (!isAdmin) {
      setMessage('Access denied. Only admins can update recipes.');
      return;
    }

    try {
      const token = await user.getIdToken(true); // Get the ID token for authorization

      // Update recipe data in the backend
      const response = await axios.put(
        `https://instant-chef-api-1.onrender.com/recipes/update/${name}`,
        {
          ...updatedData,
          ingredients: updatedData.ingredients.split(',').map((i) => i.trim()), // Convert to array
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || 'Recipe updated successfully.');
      alert("updated sucessfully");
      navigate(-1);
    } catch (error) {
      console.error('Error updating recipe:', error);
      setMessage(
        error.response?.data?.message || 'An error occurred while updating the recipe.'
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Update a Recipe</h2>
      <div className="flex flex-col mb-6">
        <label className="mb-2">Recipe Name:</label>
        <input
          type="text"
          placeholder="Enter Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="button"
          onClick={fetchRecipe}
          className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Fetch Recipe
        </button>
      </div>

      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={updatedData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (comma-separated):</label>
          <input
            type="text"
            name="ingredients"
            placeholder="Ingredients"
            value={updatedData.ingredients}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Instructions:</label>
          <textarea
            name="instructions"
            placeholder="Instructions"
            value={updatedData.instructions}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL:</label>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={updatedData.image}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Time (in minutes):</label>
          <input
            type="number"
            name="cookingTime"
            placeholder="Cooking Time"
            value={updatedData.cookingTime}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={updatedData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Created By:</label>
          <input
            type="text"
            name="createdBy"
            placeholder="Created By"
            value={updatedData.createdBy}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Update Recipe
        </button>
      </form>
      <div className="fixed bottom-6 right-6">
  <Link to="/" className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg transform hover:scale-105 transition duration-300 flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75M4.5 10.5v9h15v-9" />
    </svg>
    Home
  </Link>
</div>

      {message && <p className="mt-4 text-center text-lg text-red-500">{message}</p>} {/* Display success/error message */}
    </div>
  );
};

export default UpdateRecipe;
