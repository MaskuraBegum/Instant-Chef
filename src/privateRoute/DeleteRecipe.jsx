import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/Auth_provider'; // Import context

const DeleteRecipe = () => {
  const { user, isAdmin, loading } = useContext(AuthContext); // Get user and admin status from context
  const [name, setName] = useState('');
  const [message, setMessage] = useState(''); // State for success/error messages

  const handleDelete = async (e) => {
    e.preventDefault();

    if (loading) {
      setMessage('Loading, please wait...');
      return;
    }

    if (!isAdmin) {
      setMessage('Access denied. Only admins can delete recipes.');
      return;
    }

    const confirmAction = window.confirm(`Are you sure you want to delete the recipe "${name}"?`);
    if (!confirmAction) {
      setMessage('Deletion canceled.');
      return;
    }

    try {
      const token = await user.getIdToken(true); // Get the ID token for authorization

      // Make the DELETE request to the backend
      const response = await axios.delete(`http://localhost:5000/recipes/delete/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message || 'Recipe deleted successfully.');
      setName(''); // Clear the input field
    } catch (error) {
      console.error('Error deleting recipe:', error);
      setMessage(
        error.response?.data?.message || 'An error occurred while deleting the recipe.'
      );
    }
  };

  return (
    <div>
      <h2>Delete a Recipe</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Recipe Name:</label>
          <input
            type="text"
            placeholder="Enter Recipe Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={!name}>
          Delete Recipe
        </button>
      </form>
      {message && <p>{message}</p>} {/* Display success/error message */}
    </div>
  );
};

export default DeleteRecipe;
