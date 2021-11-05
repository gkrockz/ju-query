import React from 'react';
import './Home.css';
import Feed from './Feed';
import Navbar from '../navbar/Navbar';

function Home() {
    return (
        <div className="home">
           <Navbar /> 
           <div className="JuQuery__content">
            <Feed />
           </div>
        </div>
    )
};

export default Home;
