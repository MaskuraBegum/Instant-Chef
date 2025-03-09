import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const UserFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/recipes/userfav?uid=${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.userFav && data.userFav.length > 0) {
            const favoriteIds = data.userFav[0].favorites;
            return Promise.all(
              favoriteIds.map((id) =>
                fetch(`http://localhost:5000/recipes?_id=${id}`).then((res) =>
                  res.json()
                )
              )
            );
          } else {
            setFavorites([]);
            setLoading(false);
          }
        })
        .then((recipes) => {
          if (recipes) {
            // Check the structure of each recipe before mapping
            const validRecipes = recipes
              .filter((recipe) => recipe && recipe.recipeData && recipe.recipeData[0])
              .map((recipe) => recipe.recipeData[0]);
            setFavorites(validRecipes);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching favorite recipes:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading)
    return <p className="text-center text-lg font-semibold text-gray-700">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Your Favorite Recipes
        </h2>
        {favorites.length === 0 ? (
          <p className="text-gray-700 text-center">No favorite recipes found.</p>
        ) : (
          <div className="space-y-4">
            {favorites.map((recipe) => {
              // Ensure that each recipe has the necessary properties
              if (!recipe || !recipe.name || !recipe.image) {
                console.warn("Invalid recipe data:", recipe);
                return null;
              }
              return (
                <Link to={`/recipe/${recipe.name}`} key={recipe._id}>
                  <div className="flex items-center bg-white shadow-sm border rounded-lg overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer my-6">
                    {recipe.image && (
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-36 h-36 object-cover border-r"
                      />
                    )}
                    <div className="p-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
                      <p className="text-gray-600 text-sm">{recipe.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFavorites;
