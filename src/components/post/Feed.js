import React, { useEffect, useState } from 'react';
import db from '../../Firebase';
import QueryBox from '../querybox/QueryBox';
import Post from './Post';
import './Feed.css';
import Widget from '../widgets/Widget';

function Feed() {

    const [posts, setPosts] = useState([])
    const [selection, setSelection] = useState("");

    useEffect(() => {
        selection?db.collection('questions')
            .orderBy('timestamp', 'desc')
            .where('section', '==',selection)
            .onSnapshot(snapshot => setPosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                question: doc.data(),
            }
            )))):
            db.collection('questions').orderBy('timestamp', 'desc').onSnapshot
                (snapshot => setPosts(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    question: doc.data(),
                }))))
    })
    return (
        <React.Fragment>
            <div className="sidebar">
                <div className="options">
                    <div className="option" onClick={()=>setSelection("Technology")}>
                        <img src="https://qphs.fs.quoracdn.net/main-thumb-t-2177-100-JiR07D1TQSfeQzRvWXomVaY4Poj2f8Yb.jpeg" alt="Tech" />
                        <p>Technology</p>
                    </div>
                    <div className="option" onClick={()=>setSelection("Events")}>
                        <img src="https://qphs.fs.quoracdn.net/main-thumb-t-18797-100-B7cd2Zkrhke1Bd3yn2Vq0HIwXIVg0JaW.jpeg" alt="Events" />
                        <p>Events</p>
                    </div>
                    <div className="option" onClick={() => setSelection("Innovation")}>
                        <img src="https://qphs.fs.quoracdn.net/main-thumb-t-3906-100-3WJwKe2alb83spIH7rfECXY49noETA9x.jpeg" alt="innovation" />
                        <p>Innovation</p>
                    </div>
                    <div className="option" onClick={() => setSelection("Placement")}>
                        <img src="	https://qphs.fs.quoracdn.net/main-thumb-t-996-100-bfZBQjeEenKKl8fcNY4tVv0FyArtB0Mb.jpeg" alt="Placement" />
                        <p>Placement</p>
                    </div>
                    <div className="option" onClick={() => setSelection("Sports")}>
                        <img src="https://qphs.fs.quoracdn.net/main-thumb-t-795-100-fujtazxcynewvtxarymxenpcldxwczqq.jpeg" alt="HL" />
                        <p>Sports</p>
                    </div>
                    <div className='option' onClick={() => setSelection("Transportations")}>
                        <img src="https://qphs.fs.quoracdn.net/main-thumb-t-2587-100-Cg7htHNXLNzX0Pf3PGbKJ9RFT5y54Geb.jpeg"
                            alt="Transportations" />
                        <p>Transportations</p>
                    </div>
                    <div className='option' onClick={() => setSelection("Hostel Life")}>
                        <img src="	https://qphs.fs.quoracdn.net/main-thumb-t-4600-100-Tu9r6tIH3ysCZM71TLxbSRhOeejLecHy.jpeg"
                            alt="Hostel Life" />
                        <p>Hostel Life</p>
                    </div>
                    <div className='option' onClick={() => setSelection("Canteen")}>
                        <img src="https://qphs.fs.quoracdn.net/main-thumb-t-1027-100-tgvinqyfjlnnyjglbiicbisovkptvjqn.jpeg"
                            alt="Canteen" />
                        <p>Canteen</p>
                    </div>
                    <div className='option' onClick={()=>setSelection("Others")}>
                        <img src="https://qphs.fs.quoracdn.net/main-thumb-t-3229-100-uazulrnpoeacbeuytiyqovquifuuurer.jpeg" 
                        alt="Others" />
                        <p>Others</p>
                    </div>
                </div>
            </div>
            <div className="feed">
                <QueryBox />
                {
                    posts.map(({ id, question }) => (
                        <Post key={id}
                            Id={id}
                            imageUrl={question.imageUrl}
                            section={question.section}
                            question={question.question}
                            timestamp={question.timestamp}
                            JuUser={question.user}
                        />
                    ))
                }
            </div>
            <Widget />
        </React.Fragment>
    )
}

export default Feed
