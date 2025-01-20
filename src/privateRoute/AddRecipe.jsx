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
    <div>
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe Name:</label>
          <input
            type="text"
            placeholder="Recipe Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Ingredients (comma-separated):</label>
          <input
            type="text"
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label>Cooking Time (in minutes):</label>
          <input
            type="number"
            placeholder="Cooking Time"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Created By (Admin):</label> {/* Added input for createdBy */}
          <input
            type="text"
            placeholder="Created By"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
          />
        </div>
        <button type="submit" > Submit
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
