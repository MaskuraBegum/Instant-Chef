import React from 'react';
import Banner from './Banner';
import Recipes from './Recipes';

const Home = () => {
    return (
        <div className='ml-10'>
            <Banner></Banner>
            <Recipes></Recipes>
        </div>
    );
};

export default Home;