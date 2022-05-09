import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Feed from '../../components/post/Feed';
import './FollowingPage.css';

function FollowingPage() {
    return (
        <div className="home">
           <Navbar /> 
           <div className="Following__content">
              <Feed />
           </div>
        </div>
    )
}

export default FollowingPage;
