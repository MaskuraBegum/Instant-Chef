import React from 'react';
import Banner from './Banner';
import Recipes from './Recipes';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div className='container mx-auto'>
            <Helmet>
        <title>Instant Chef || Home</title>
        </Helmet>
            <Banner></Banner>
            <Recipes></Recipes>
            <Link to='/chatbot'>  <button class="fixed bottom-10 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 text-lg transition">
            💬
         Ask AI Chef
</button></Link>

        </div>
    );
};

export default Home;