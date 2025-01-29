import React from 'react';
import Banner from './Banner';
import Recipes from './Recipes';

const Home = () => {
    return (
        <div className='container mx-auto'>
            
            <Banner></Banner>
            <Recipes></Recipes>
        
        </div>
    );
};

export default Home;