import React from 'react';

const Banner = () => {
    return (
        <div>
            <div
                className="hero"
                style={{
                    backgroundImage: "url(https://i.ibb.co.com/YyRFBr9/food1.jpg)",
                    marginRight:"30px", height:"600px", borderRadius:"30px", marginTop:"30px"
                }}>
                <div className="hero-overlay bg-opacity-60" style={{borderRadius:"30px"}}></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-2xl">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to Instant Chef!</h1>
                    <p className="mb-5">
                    Discover quick, easy, and delicious recipes to satisfy your cravings. Whether you're a busy professional or a home chef, Instant Chef has you covered!
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;