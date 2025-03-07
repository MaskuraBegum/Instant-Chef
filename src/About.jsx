import React from 'react';

const About = () => {
    return (
        <div className='m-5'>
            <section class="p-8 bg-gray-50 rounded-lg shadow-lg">
                <h1 class="text-3xl font-extrabold text-center text-green-800 mb-6 underline italic">About Instant Chef</h1>
                <p class="text-lg leading-7 mb-6">
    Welcome to <strong>Instant Chef</strong>, a platform designed to revolutionize the way you cook. Our goal is to make cooking accessible, intuitive, and enjoyable for everyone. By simply entering the ingredients you have, Instant Chef provides personalized recipes tailored to your pantry, helping you save time and reduce food waste. With the assistance of our AI chef, <strong>Juniper</strong>, you'll receive real-time cooking advice, ingredient suggestions, and the ability to add your favorite recipes to a personalized collection for easy access later.
</p>

                
                <h2 class="text-2xl font-semibold mb-4">Our Vision</h2>
                <p class="text-lg leading-7 mb-6">
                    At Instant Chef, we believe in the power of simplicity and creativity in the kitchen. Our vision is to inspire individuals to explore new culinary possibilities while making the most of the resources they already have. Whether you're a seasoned chef or a beginner, Instant Chef is here to support your cooking journey.
                </p>
                
                <h2 class="text-2xl font-semibold mb-4">Key Features</h2>
                <ul class="list-disc ml-6 text-lg leading-7 mb-6">
                    <li>Personalized recipe recommendations based on available ingredients.</li>
                    <li>Suggestions for complementary ingredients to elevate your dishes.</li>
                    <li>Comprehensive recipe details, including preparation and cooking steps.</li>
                    <li>AI chatbot assistance for real-time cooking advice and recipe ideas.</li>
                    <li>Option to add recipes to your favourites for easy access later.</li>
                    <li>Focus on reducing food waste by utilizing what you already have.</li>
                </ul>
                
                <h2 class="text-2xl font-semibold mb-4">Our Commitment</h2>
                <p class="text-lg leading-7 mb-6">
                    We are committed to making meal preparation an effortless and enjoyable experience. Instant Chef empowers users to embrace their inner chef, explore diverse cuisines, and create meals they can be proud of. Our platform is designed to provide an intuitive and seamless user experience.
                </p>
                
                <h2 class="text-2xl font-semibold mb-4">Get Started Today</h2>
                <p class="text-lg leading-7">
                    Discover the joy of cooking with Instant Chef. <a href="/" class="text-blue-600 underline">Explore recipes now</a> and let us help you create something extraordinary with the ingredients you already have.
                </p>
            </section>

        </div>
    );
};

export default About;