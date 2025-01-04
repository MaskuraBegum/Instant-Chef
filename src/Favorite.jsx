import React from 'react';

const Favorite = () => {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Favorite Recipes</h2>
            <p className="text-gray-700 mb-6">
                Here you'll find a collection of your favorite recipes, saved for easy access. Add some recipes to get started!
            </p>
            <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg py-5">
                <p className="text-gray-500 text-center">
                    No favorite recipes yet. Start adding your favorite dishes!
                </p>
            </div>
        </div>
    );
};

export default Favorite;