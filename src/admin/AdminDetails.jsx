import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const AdminDetails = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

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

    const handleDelete = async (id) => {
        try {
            const token = 'your-firebase-token'; // Ensure it's valid
            const response = await fetch(`http://localhost:5000/recipes/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete recipe.");
            }

            // Update UI after successful deletion
            setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== id));
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 py-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Recipe List</h1>

            {/* Add Button */}
            <div className="flex justify-center mb-6">
                <Link
                    to="/admin/add"
                    className="px-4 py-2 rounded bg-orange-600 hover:bg-orange-600 text-white font-semibold transition duration-300"
                >
                    + Add Recipe
                </Link>
            </div>

            {error && <div className="text-red-600 text-center mb-4">{error}</div>}

            <div className="overflow-x-auto w-full flex justify-center">
                <table className="table-auto w-full max-w-6xl text-center bg-white shadow-lg rounded-lg">
                    <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 border-b text-left">Recipe Name</th>
                            <th className="px-6 py-3 border-b text-left">Category</th>
                            <th className="px-6 py-3 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.length > 0 ? (
                            recipes.map((recipe) => (
                                <tr key={recipe._id} className="hover:bg-gray-100 transition duration-300">
                                    <td className="px-6 py-3 border-b text-left">{recipe.name}</td>
                                    <td className="px-6 py-3 border-b text-left">{recipe.category}</td>
                                    <td className="px-6 py-3 border-b text-left flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                        <Link
                                            to="/admin/update"
                                            className="px-2 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white transition duration-300"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(recipe._id)}
                                            className="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-3 border-b text-center text-gray-600">
                                    No recipes found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDetails;