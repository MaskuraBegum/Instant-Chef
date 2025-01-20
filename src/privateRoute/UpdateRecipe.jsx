import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/Auth_provider'; // Import AuthContext

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

  // Fetch recipe data to autofill the form
  const fetchRecipe = async () => {
    if (!name) {
      setMessage('Please enter the recipe name to fetch data.');
      return;
    }
  
    try {
      const token = await user.getIdToken(true); // Get the ID token for authorization
  
      // Fetch recipe details from the backend
      const response = await axios.get(`http://localhost:5000/recipes?name=${name}`, {
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
        `http://localhost:5000/recipes/update/${name}`,
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
    } catch (error) {
      console.error('Error updating recipe:', error);
      setMessage(
        error.response?.data?.message || 'An error occurred while updating the recipe.'
      );
    }
  };

  return (
    <div>
      <h2>Update a Recipe</h2>
      <div className='flex flex-col w-48'>
        <label>Recipe Name:</label>
        <input
          type="text"
          placeholder="Enter Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className='btn btn-primary m-4' type="button" onClick={fetchRecipe}>Fetch Recipe</button> {/* Fetch button */}
      </div>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={updatedData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Ingredients (comma-separated):</label>
          <input
            type="text"
            name="ingredients"
            placeholder="Ingredients"
            value={updatedData.ingredients}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            name="instructions"
            placeholder="Instructions"
            value={updatedData.instructions}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={updatedData.image}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Cooking Time (in minutes):</label>
          <input
            type="number"
            name="cookingTime"
            placeholder="Cooking Time"
            value={updatedData.cookingTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={updatedData.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Created By:</label>
          <input
            type="text"
            name="createdBy"
            placeholder="Created By"
            value={updatedData.createdBy}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Recipe</button>
      </form>
      {message && <p>{message}</p>} {/* Display success/error message */}
    </div>
  );
};

export default UpdateRecipe;
