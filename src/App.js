import React, { useEffect } from 'react';
import './App.css';
import Login from './components/auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// import Home from './components/post/Home';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './Firebase';
import HomePage from './pages/homepage/HomePage';
import Following from './pages/followingpage/FollowingPage';
import Questions from './pages/questionspage/QuestionsPage';
import Users from './pages/userspage/UsersPage';
import Notification from './pages/notificationpage/NotificationPage';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch(); // returns a reference to the dispatch function from the Redux store
 
 // Specifying something to react, like component needs to do something after rendering.
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
        if(authUser) {
          dispatch(login({
            uid:authUser.uid,
            photo:authUser.photoURL,
            displayName:authUser.displayName,
            email:authUser.email
          }));
        }
        else {
          dispatch(logout());
          }
        });
    },[dispatch]);

  // Conditional Rendering based on User's Authentication
  
  return (
    <div className="App">
      {
        user ? (
          <div>
            <Switch>
              <Route exact={true} path='/' component={HomePage} />
              <Route exact path='/following' component={Following} />
              <Route exact path='/question' component={Questions} />
              <Route exact path='/users' component={Users} />
              <Route exact path='/notification' component={Notification} />
            </Switch>
          </div>
        ) 
        : 
        (
          <Login />
        )
    }
    
   </div>
  );
}

export default App;
