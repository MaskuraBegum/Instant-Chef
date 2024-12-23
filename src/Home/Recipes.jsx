import React, { useEffect, useState } from 'react';
import { data } from 'react-router-dom';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('recipes.json')
        .then(res => res.json())
        .then(data => setRecipes(data))
    }, [])
    return (
        <div className='mt-10'>
            <h2 className='text-center text-3xl font-black'>Recipes You'll Love</h2>
            <p>{recipes.length}</p>
        </div>
    );
};

export default Recipes;