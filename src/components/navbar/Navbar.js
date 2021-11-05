import React, { useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import './Navbar.css';
import jgi_logo from '../../assets/jgi_logo.jpg';
import {AssignmentTurnedInOutlined,FeaturedPlayListOutlined,LanguageOutlined, LinkOutlined, NotificationsOutlined, PeopleAltOutlined, SearchOutlined } from '@material-ui/icons';
import { Avatar, Button,Input} from '@material-ui/core';
import { useSelector } from 'react-redux';
import db, { auth } from '../../Firebase';
import { selectUser } from '../../features/userSlice';
import Modal from 'react-modal';
import firebase from 'firebase';

Modal.setAppElement("#root");

const Navbar = () => {

const user = useSelector(selectUser);
const [openModal,setopenModal] = useState(false); 
const [selectOption,setSelectOption]=useState();
const [input,setInput]  = useState("");
const[inputUrl,setInputUrl] = useState("");

const handleChange=(e) => {
    setSelectOption(e.target.value);
}

const handleQuestion = () => {
    setopenModal(false);
    db.collection('questions').add({
        section:selectOption,
        question:input,
        imageUrl:inputUrl,
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        user: user,
    });
    setInput("");
    setInputUrl("");
    setSelectOption("");
}

    return (
        <div className="navbar">
            <a href="https://set.jainuniversity.ac.in">
            <div className="header_logo">
                <img src={jgi_logo} alt="JU" />
            </div>
            </a>
            <div className="icons_wrapper">
                <div className="icon" title="Home">
                    <HomeIcon />
                </div>
                <div className="icon">
                    <FeaturedPlayListOutlined />
                </div>
                <div className="icon">
                    <AssignmentTurnedInOutlined />
                </div>
                <div className="icon">
                    <PeopleAltOutlined />
                </div>
                <div className="icon" title="Notifications">
                    <NotificationsOutlined />
                </div>
            </div>
            <div className="search">
                <SearchOutlined />
                <input type="text" placeholder="Search" />
            </div>
            <div className="others">
                <div className="avatar" title="Log Out">
                    <Avatar src={user.photo} onClick={() => auth.signOut()}/>
                </div>
                <LanguageOutlined />
                <Button onClick={()=> setopenModal(true)}>Ask Question</Button>
                <Modal isOpen = {openModal}
                   onRequestClose = {() => setopenModal(false)}
                   shouldCloseOnOverlayClick={false}
                   style = {{
                            overlay: {
                            width:700,
                            height:600,
                            backgroundColor:"rgba(0,0,0,0.8)",
                            zIndex:"1000",
                            top:"50%",
                            left:"50%",
                            marginTop:"-300px",
                            marginLeft:"-350px",
                      },
                    }}>
                    <div className="modal__title">
                        <h5>Add Question</h5>
                        <h5>Choose Section</h5>
                        <h5>Share Link</h5>
                    </div>
                        <div className="modal__info">
                            <Avatar className="avatar" src={user.photo} />
                            <p>{user.displayName ? user.displayName : user.email} </p>
                            <div className='modal__select'>
                            <select name="Choose Section" id="" onChange={handleChange} required>
                                <option value="">Select Section</option>
                                <option value="Technology">Technology</option>
                                <option value="Events">Events</option>
                                <option value="Innovation">Innovation</option>
                                <option value="Placement">Placement</option>
                                <option value="Sports">Sports</option>
                                <option value="Transportations">Transportations</option>
                                <option value="Hostel Life">Hostel Life</option>
                                <option value="Canteen">Canteen</option>
                                <option value="Others">Others</option>
                            </select>
                        </div> 
                        </div>
                        <div className="modal__field">
                            <Input type="text" required value={input} onChange={(e)=>setInput(e.target.value)} placeholder = "Enter your question here" />
                        <div className="modal__fieldLink">
                            <LinkOutlined />
                            <Input value={inputUrl} onChange={(e)=>setInputUrl(e.target.value)} type="text" className='modal__link' placeholder = "Optional:Include a link that gives context to the question" />
                        </div>
                        <div className="modal__buttons">
                            <button className="cancel" onClick={() => setopenModal(false)}>Cancel</button>
                            <button onClick={handleQuestion} type="submit" className="add">Post Question</button>
                        </div>
                        </div>
                    </Modal>
            </div>
        </div>
    )
}

export default Navbar
