import React from 'react';
import '../css/JuQuery.css';
import Feed from './Feed';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Widget from './Widget';

function JuQuery() {
    return (
        <div className="home">
           <Navbar /> 
           <div className="JuQuery__content">
              <Sidebar />
              <Feed />
              <Widget />
           </div>
        </div>
    )
}

export default JuQuery
