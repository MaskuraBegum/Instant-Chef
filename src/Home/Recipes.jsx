import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchIngredient, setSearchIngredient] = useState('');

    // Fetch all recipes initially or search results based on ingredient
    useEffect(() => {
        const fetchRecipes = async () => {
            const url = searchIngredient 
                ? `http://localhost:5000/recipes/include?ingredients=${searchIngredient}` 
                : 'http://localhost:5000/recipes'; // Default to all recipes if no ingredient is entered

            try {
                const response = await fetch(url);
                const data = await response.json();
                setRecipes(data.recipeData || []); // Update state with the fetched data
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, [searchIngredient]); // Runs every time `searchIngredient` changes

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchIngredient(event.target.value);
    };

    const handleExploreMoreClick = async (searchIngredient) => {
        const url = `http://localhost:5000/recipes/filter?ingredients=${searchIngredient}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setRecipes(data.recipeData || []); // Update state with the fetched data
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    return (
        <div className="mt-10">
            <h2 className="text-center text-3xl font-black mb-5">Recipes You'll Love</h2>
            <p className="text-center text-gray-600 mb-6 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-4xl mx-auto">
                Discover a selection of delicious and easy-to-make recipes, tailored to inspire your next culinary adventure. 
                Whether you're a beginner or a seasoned chef, these recipes are sure to delight your taste buds!
            </p>

            {/* Search bar for recipes */}
            <div className="flex flex-col items-center mt-10">
                <p className="text-lg text-center font-medium mb-4">
                    Find recipes by entering ingredients you have at home!
                </p>
                <label className="input input-bordered flex items-center gap-2 w-72 text-center">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Search"
                        value={searchIngredient}
                        onChange={handleSearchChange} // Update state with search input
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>
            </div>

            {/* Displaying recipes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 mt-6 px-6">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe.id} className="bg-white rounded-lg shadow-md border-y-2 ">
                            <img src={recipe.image} alt={recipe.name} className="w-full h-80" />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-blue-600">{recipe.name}</h3>
                                <p className="text-gray-600 text-sm">{recipe.description}</p>

                                <Link
                                    to={`/recipe/${recipe.name}`}
                                    className="btn btn-primary hover:bg-primary-focus text-white my-5"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex justify-center items-center h-60 w-full">
                        <div className="text-center">
                            <p >
                                No recipes found with ingredient "{searchIngredient}"
                            </p>

                            <p className="text-gray-600">Note:check your spelling is correct!</p>
                            <p>But you can have a look for recipes that include at least one of your ingredients.</p>
                           <button
                                onClick={() => handleExploreMoreClick(searchIngredient)}
                                className="mt-4 btn btn-primary text-white" >
                                Explore More Recipes
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recipes;
