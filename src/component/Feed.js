import React, { useEffect, useState } from 'react'; 
import db from '../Firebase';
import JuBox from './JuBox';
import Post from './Post';
import '../css/Feed.css';

function Feed() {

    const [posts,setPosts] = useState([])
    useEffect(()=> {
        db.collection('questions').orderBy('timestamp','desc').onSnapshot
        (snapshot => setPosts(snapshot.docs.
            map((doc) => (({ 
                id:doc.id,
                question:doc.data(),
            })))));
    },[])
    return (
        <div className="feed">
            <JuBox />
            {
                posts.map(({id,question})=> (
                    <Post key={id} 
                    id={id} 
                    imageUrl={question.imageUrl} 
                    question={question.question}
                    timestamp = {question.timestamp}
                    JuUser = {question.user}
                    />
                ))
            }
        </div>
    )
}

export default Feed
