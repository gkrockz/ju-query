import { Avatar, Input } from '@material-ui/core';
import './QueryBox.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import db from '../../Firebase';
import firebase from 'firebase';
import { selectUser } from '../../features/userSlice';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CloseIcon from "@material-ui/icons/Close";
import { PeopleAltOutlined, ExpandMore } from '@material-ui/icons';

const QueryBox = () => {
    const user = useSelector(selectUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectOption, setSelectOption] = useState();
    const [input, setInput] = useState("");
    const [inputUrl, setInputUrl] = useState("");
    const Close = <CloseIcon />;
    const handleChange = (e) => {
        setSelectOption(e.target.value);
    }
    const handleQuestion = () => {
        setIsModalOpen(false);
        db.collection('questions').add({
            section: selectOption,
            question: input,
            imageUrl: inputUrl,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
        setInputUrl("");
        setSelectOption("");

    }
    return (
        <div className="wrapper">
            <div className="info">
                <Avatar src={user.photo} />
                <h5>{user.displayName}</h5>
            </div>
            <div className="box" onClick={() => setIsModalOpen(true)}>
                <p>Post your question here : )</p>
            </div>
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
                <div className='modal__title'>
                    <h5>Add Question</h5>
                    <h5>Share Link</h5>
                </div>
                <div className='modal__info'>
                    <Avatar
                        className='avatar'
                        src={user.photo} />
                    <div className="modal__info">
                        <div className="modal__scope">
                            <PeopleAltOutlined />
                            <p>Public</p>
                            <ExpandMore />
                        </div>
                    <div className='modal__select'>
                        <select name="Choose Section" onChange={handleChange} required>
                            <option value="">Select section</option>
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
                                    margin: "10 px 0",
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
                    <div className='modal__buttons'>
                        <button
                            className='cancel'
                            onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        <button onClick={handleQuestion} type='submit' className='add'>
                            Add Question
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default QueryBox;
