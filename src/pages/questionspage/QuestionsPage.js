import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import MyFeed from '../../components/questions/MyFeed';
import './QuestionsPage.css';

function QuestionsPage() {
    return (
        <div className="home">
           <Navbar /> 
           <div className="Questions__content">
              <MyFeed />
           </div>
        </div>
    )
}

export default QuestionsPage;
