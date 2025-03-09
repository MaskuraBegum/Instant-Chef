import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from '../provider/Auth_provider';
import axios from 'axios';

const AdminDetails = () => {
    const { user, isAdmin, loading } = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [formData, setFormData] = useState({ name: '', category: '', ingredients: '', instructions: '' });

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const token = 'your-firebase-token'; // Ensure this token is valid
                const response = await fetch("http://localhost:5000/recipes", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setRecipes(data.recipeData); // Assuming data.recipeData contains the array of recipes
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setError("Failed to fetch recipes. Please try again later.");
            }
        };

        fetchRecipes();
    }, []);

    const handleDelete = async (name) => {
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
            const token = await user.getIdToken(true);

            const response = await axios.delete(`http://localhost:5000/recipes/delete/${name}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage(response.data.message || 'Recipe deleted successfully.');
            setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.name !== name));
        } catch (error) {
            console.error('Error deleting recipe:', error);
            setMessage(
                error.response?.data?.message || 'An error occurred while deleting the recipe.'
            );
        }
    };

    // Calculate total number of recipes
    const totalRecipes = recipes.length;

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 py-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Recipe List</h1>

            <div className="flex justify-center mb-6">
                <Link
                    to="/admin/add"
                    className="px-4 py-2 rounded bg-orange-600 hover:bg-orange-700 text-white font-semibold transition duration-300"
                >
                    + Add Recipe
                </Link>
            </div>

            {error && <div className="text-red-600 text-center mb-4">{error}</div>}
            {message && <div className="text-green-600 text-center mb-4">{message}</div>}

            {/* Display total recipes */}
            <div className="text-center mb-6">
                <p className="text-lg font-semibold">Total Recipes: {totalRecipes}</p>
            </div>

            {editingRecipe && (
                <div className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg mb-6">
                    <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>
                    <input name="name" value={formData.name} onChange={handleInputChange} className="w-full mb-2 p-2 border rounded" />
                    <input name="category" value={formData.category} onChange={handleInputChange} className="w-full mb-2 p-2 border rounded" />
                    <textarea name="ingredients" value={formData.ingredients} onChange={handleInputChange} className="w-full mb-2 p-2 border rounded"></textarea>
                    <textarea name="instructions" value={formData.instructions} onChange={handleInputChange} className="w-full mb-2 p-2 border rounded"></textarea>
                    <button onClick={handleUpdate} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold">Save</button>
                </div>
            )}

            <div className="overflow-x-auto w-full flex justify-center">
                <table className="table-auto w-full max-w-6xl text-center bg-white shadow-lg rounded-lg border-collapse">
                    <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg">
                        <tr>
                            <th className="px-6 py-3 border-r border-gray-300 text-left">Recipe Name</th>
                            <th className="px-6 py-3 border-r border-gray-300 text-left">Category</th>
                            <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.length > 0 ? (
                            recipes.map((recipe) => (
                                <tr key={recipe._id} className="hover:bg-gray-200 transition duration-300">
                                    <td className="px-6 py-3 border-b border-r border-gray-300 text-xl text-left">{recipe.name}</td>
                                    <td className="px-6 text-xl py-3 border-b border-r border-gray-300 text-left">{recipe.category}</td>
                                    <td className="px-6 py-3 border-b text-center flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2  justify-center">
                                        <Link to={`/admin/update2/${recipe.name}`}>
                                            <button className="px-3 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white transition duration-300">Update</button>
                                        </Link>
                                        <button onClick={() => handleDelete(recipe.name)} className="px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition duration-300">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-3 text-center text-gray-600">No recipes found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="fixed bottom-6 right-6">
        <Link to="/" className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg transform hover:scale-105 transition duration-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75M4.5 10.5v9h15v-9" />
          </svg>
          Home
        </Link>
      </div>
        </div>
    );
};

export default AdminDetails;
