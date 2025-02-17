// import React from 'react';

// const Favorite = () => {
//     return (
//         <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold text-red-600 mb-4">Favorite Recipes</h2>
//             <p className="text-gray-700 mb-6">
//                 Here you'll find a collection of your favorite recipes, saved for easy access. Add some recipes to get started!
//             </p>
//             <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg py-5">
//                 <p className="text-gray-500 text-center">
//                     No favorite recipes yet. Start adding your favorite dishes!
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Favorite;

import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Favorite = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get the current authenticated user
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            setError('You need to be logged in to view your favorite recipes.');
            setIsLoading(false);
            return;
        }

        // Fetch the favorite recipes from the backend using the Firebase ID token
        const fetchFavorites = async () => {
            try {
                const idToken = await user.getIdToken();
                
                const response = await axios.get('http://localhost:5000/recipes/favorite', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFavorites(data.favorites || []); // Assuming the response contains the user's favorite recipes
                } else {
                    setError('Failed to load favorite recipes.');
                }
            } catch (err) {
                console.error("Error fetching favorites:", err);
                setError('Error fetching favorite recipes.');
            }
            setIsLoading(false);
        };

        fetchFavorites();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Favorite Recipes</h2>

            {error && <p className="text-red-500 mb-6">{error}</p>}

            {favorites.length > 0 ? (
                <div>
                    <p className="text-gray-700 mb-6">
                        Here you'll find a collection of your favorite recipes, saved for easy access.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {favorites.map((recipe) => (
                            <div key={recipe.id} className="bg-white p-4 rounded-lg shadow-md">
                                <img
                                    src={recipe.image}
                                    alt={recipe.name}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                                <p className="text-gray-600 text-sm">{recipe.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 text-center">No favorite recipes yet. Start adding your favorite dishes!</p>
            )}

            <Link to="/recipes">
                <button className="mt-6 text-white bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-700">
                    Explore More Recipes
                </button>
            </Link>
        </div>
    );
};

export default Favorite;
