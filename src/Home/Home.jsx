import React from 'react';
import Banner from './Banner';
import Recipes from './Recipes';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div className='' >
            <div className='container mx-auto min-h-screen'>
            <Helmet>
        <title>Instant Chef || Home</title>
        </Helmet>
            <Banner></Banner>
            <div className="container mx-auto min-h-screen m-2 p-4 rounded-3xl bg-[#F8F4E3] bg-[url('https://www.transparenttextures.com/patterns/white-dust.png')]"><Recipes></Recipes></div>
            
            <Link to='/chatbot'>  <button class="fixed bottom-10 right-6 bg-[#C05621] text-white p-4 rounded-full shadow-lg hover:bg-[#52796F] transition duration-300">
            💬
         Ask AI Chef
</button></Link>

        </div>
        </div>
    );
};

export default Home;