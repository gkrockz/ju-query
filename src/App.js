import React, { useEffect } from 'react';
import './App.css';
import Login from './components/auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/post/Home';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './Firebase';

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
        user ? (<Home />) : (<Login />)
      } 
    </div>
  );
}

export default App;
