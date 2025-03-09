import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/Auth_provider'; // Import context
import { Link,useNavigate } from 'react-router-dom';

const DeleteRecipe = () => {
  const { user, isAdmin, loading } = useContext(AuthContext); // Get user and admin status from context
  const [name, setName] = useState('');
  const [message, setMessage] = useState(''); // State for success/error messages
  const navigate = useNavigate();

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
      alert("Deleted sucessfully");
      navigate(-1);
    } catch (error) {
      console.error('Error deleting recipe:', error);
      setMessage(
        error.response?.data?.message || 'An error occurred while deleting the recipe.'
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Delete a Recipe</h2>
      <form onSubmit={handleDelete} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name:</label>
          <input
            type="text"
            placeholder="Enter Recipe Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={!name}
            className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-400"
          >
            Delete Recipe
          </button>
        </div>
      </form>
      <div className="fixed bottom-6 right-6">
  <Link to="/" className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg transform hover:scale-105 transition duration-300 flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75M4.5 10.5v9h15v-9" />
    </svg>
    Home
  </Link>
</div>

      {message && <p className="mt-4 text-center text-lg">{message}</p>} {/* Display success/error message */}
    </div>
  );
};

export default DeleteRecipe;
