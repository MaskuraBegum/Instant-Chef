import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch('/recipes.json')
            .then(res => res.json())
            .then(data => {
                const foundRecipe = data.find(item => item.id === parseInt(id));
                setRecipe(foundRecipe);
            });
    }, [id]); 

    if (!recipe) return <div>Loading...</div>; 
    
    return (
        <div className="max-w-4xl mx-auto mt-10">
            <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-5/6 object-cover rounded-lg mb-6"
            />
            <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
            <p className="text-lg mb-4">{recipe.description}</p>
            <p className="text-base text-black">Ingredients:-</p>
            <ul className="list-disc list-inside text-gray-700 text-sm">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <p className="text-base text-black my-4">Instructions: <span className='text-gray-600'>{recipe.instructions}</span></p>
            <p className="text-base text-black mb-4">Cooking Time: <span className='text-gray-600'>{recipe.cookingTime} minutes</span></p>
            <p className="text-base text-black mb-4">Category: <span className='text-gray-600'>{recipe.category}</span></p>
            <p className="text-base text-black mb-4">Created By: <span className='text-gray-600'>{recipe.createdBy}</span></p> 
            <div className="flex justify-end">
                <button
                    className="text-xl text-red-500 mb-8"
                    //onClick={() => handleFavorite(recipeId)}
                >
                    ♥ Favorite
                </button>
            </div>

        </div>
    );
};

export default RecipeDetails;
