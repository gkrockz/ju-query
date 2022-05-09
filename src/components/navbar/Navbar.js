import React, { useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import './Navbar.css';
import jgi_logo from '../../assets/jgi_logo.jpg';
import { AssignmentTurnedInOutlined, FeaturedPlayListOutlined, LanguageOutlined, NotificationsOutlined, PeopleAltOutlined, SearchOutlined, ExpandMore } from '@material-ui/icons';
import { Avatar, Button, Input } from '@material-ui/core';
import { useSelector } from 'react-redux';
import db, { auth } from '../../Firebase';
import { selectUser } from '../../features/userSlice';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link, withRouter } from 'react-router-dom';
import firebase from 'firebase';
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";

// useSelector() - allows you to extract data from the Redux store 
// state, using a selector function.


const Navbar = ({ history, match }) => {

    const user = useSelector(selectUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectOption, setSelectOption] = useState();
    const [input, setInput] = useState("");
    const [inputUrl, setInputUrl] = useState("");
    const Close = <CloseIcon />;

    const handleChange = (e) => {
        setSelectOption(e.target.value);
    }

    const handleQuestion = (e) => {
        e.preventDefault();
        setIsModalOpen(false);
        db.collection('questions').add({
            section: selectOption,
            question: input,
            imageUrl: inputUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user,
        });
        setInput("");
        setInputUrl("");
        setSelectOption("");
    }
    const navStyle = {
        listStyle: 'none',
        textDecoration: 'none',
    };
    return (
        <div className="navbar">
            <div className="qHeader-content">
            <a href="https://set.jainuniversity.ac.in" target="_blank" rel="noreferrer">
                <div className="header_logo">
                    <img src={jgi_logo} alt="JU" />
                </div>
            </a>
            <div className="icons_wrapper">
                <Link to="/" style={navStyle}>
                    <div className="icon" title="Home">
                        <HomeIcon />
                    </div>
                </Link>
                <Link to="/following" style={navStyle}>
                    <div className="icon" title='Following'>
                        <FeaturedPlayListOutlined />
                    </div>
                </Link>
                <Link to="/question" style={navStyle}>
                    <div className="icon" title='Questions'>
                        <AssignmentTurnedInOutlined />
                    </div>
                </Link>
                <Link to="/users" style={navStyle}>
                    <div className="icon" title='Users'>
                        <PeopleAltOutlined />
                    </div>
                </Link>
                <Link to="/notification" style={navStyle}>
                    <div className="icon" title="Notifications">
                        <NotificationsOutlined />
                    </div>
                </Link>
            </div>
            <div className="search">
                <SearchOutlined />
                <input type="text" placeholder="Search Question" />
            </div>
            <div className="others">
                <span className="avatar" title="Log Out">
                    <Avatar className="avatar" src={user.photo} onClick={() => auth.signOut()} />
                </span>
                <Tooltip title="English (EN)">
                        <LanguageOutlined />
                </Tooltip>
                <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
                <Modal
                    open={isModalOpen}
                    closeIcon={Close}
                    onClose={() => setIsModalOpen(false)}
                    closeOnEsc
                    center
                    closeOnOverlayClick={false}
                    styles={{
                        overlay: {
                            height: "auto",
                        },
                    }}
                >
                    <div className="modal__title">
                        <h5>Add Question</h5>
                        <h5>Share Link</h5>
                    </div>
                    <div className="modal__info">
                        <Avatar className="avatar" src={user.photo} />
                        <div className="modal__scope">
                            <PeopleAltOutlined />
                            <p>Public</p>
                            <ExpandMore />
                        </div>
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
                        <Input type="text" required value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your question here" />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <input
                                type="text"
                                value={inputUrl}
                                onChange={(e) => setInputUrl(e.target.value)}
                                style={{
                                    margin: "10px 0",
                                    border: "1px solid lightgray",
                                    padding: "10px",
                                    outline: "1.5px solid #000",
                                }}
                                placeholder="🔗 Optional: Inclue a link that gives context"
                            />
                            {inputUrl !== "" && (
                                <img
                                    style={{
                                        height: "40vh",
                                        objectFit: "contain",
                                    }}
                                    src={inputUrl}
                                    alt="displayimage"
                                />
                            )}
                        </div>
                        </div>
                        <div className="modal__buttons">
                            <button className="cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button onClick={handleQuestion} type="submit" className="add">Post Question</button>
                        </div>
                </Modal>
            </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar);
