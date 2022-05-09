import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Feed from '../../components/post/Feed';
import Widget from '../../components/widgets/Widget';
import './HomePage.css';

function HomePage(props) {
    // console.log(props);
    return (
        <div className="home">
           <Navbar /> 
           <div className="JuQuery__content">
              <Feed />
              <Widget />
           </div>
        </div>
    )
}

export default HomePage;
