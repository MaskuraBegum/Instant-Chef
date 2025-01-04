import React, { useEffect, useState } from 'react';
import { data } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('recipes.json')
        .then(res => res.json())
        .then(data => setRecipes(data))
    }, [])
    return (
        <div className='mt-10'>
            <h2 className='text-center text-3xl font-black mb-5'>Recipes You'll Love</h2>
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
                    <input type="text" className="grow" placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
            </div>

            {/* Displaying json data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 px-6">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="bg-white rounded shadow-md">
                        <img src={recipe.image} alt={recipe.name} className="w-full h-80" />
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-blue-600">{recipe.name}</h3>
                            <p className="text-gray-600 text-sm">{recipe.description}</p>

                            {/* Getting the details after clicking the button */}
                            <Link
                                to={`/recipe/${recipe.id}`}
                                className="btn btn-primary hover:bg-primary-focus text-white my-5">
                                View Details
                            </Link>


                            {/* <p className="text-base text-black">Ingredients:-</p>
                            <ul className="list-disc list-inside text-gray-700 text-sm">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                            <p className="text-base text-black">Instructions: <span className='text-gray-600'>{recipe.instructions}</span></p>
                            <p className="text-base text-black">Cooking Time: <span className='text-gray-600'>{recipe.cookingTime} minutes</span></p>
                            <p className="text-base text-black">Category: <span className='text-gray-600'>{recipe.category}</span></p>
                            <p className="text-base text-black">Created By: <span className='text-gray-600'>{recipe.createdBy}</span></p> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipes;