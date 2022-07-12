import { Avatar } from '@material-ui/core';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, ChatBubbleOutline, MoreHorizOutlined, RepeatOutlined, ShareOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import './Post.css';
import ShareButton from 'react-web-share-button';
import "react-responsive-modal/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { selectQuestionId, setQuestionInfo } from '../../features/questionSlice';
import db from '../../Firebase';
import firebase from 'firebase';
import { selectUser } from '../../features/userSlice';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ReactQuill from 'react-quill';
import CloseIcon from "@material-ui/icons/Close";
import "react-quill/dist/quill.snow.css";
import ReactHtmlParser from 'react-html-parser';

const Post = ({ Id, imageUrl, section, question, timestamp, JuUser }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const questionId = useSelector(selectQuestionId);
    const [answer, setAnswer] = useState("");
    const user = useSelector(selectUser);
    const [getAnswer, setGetAnswer] = useState([]);
    const Close = <CloseIcon />;
    const handleQuill = (value) => {
        setAnswer(value);
    };
    useEffect(() => {
        if (questionId) {
            db.collection("questions").doc(questionId).collection('answer').orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => setGetAnswer(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    answers: doc.data()
                }))))
        }
    })
    const handleAnswer = () => {
        if (questionId) {
            db.collection("questions").doc(questionId).collection("answer").add({
                user: user,
                answer: answer,
                questionId: questionId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }
        setAnswer("");
        setIsModalOpen(false);
    };

    return (
        <div className="post" onClick={() => dispatch(setQuestionInfo({
            questionId: Id,
            questionName: question,
        }))}>
            <div className="post_info">
                <Avatar src={JuUser.photo} />
                <div className='post__details'>
                    <h5>{JuUser.displayName ? JuUser.displayName : JuUser.email}</h5>
                    <span>posted on</span>
                    <p>{section}</p>
                    <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
                </div>
            </div>
            <div className="post_body">
                <div className="question">
                    <p>{question}</p>
                    <button className="btnanswer" onClick={() => setIsModalOpen(true)}>Answer</button>
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
                        <div className='modal__question'>
                            <h1>{question}</h1>
                            <p>asked by <span className='name'>{JuUser.displayName ? JuUser.displayName : JuUser.email}</span>{""}
                                on <span className='name'> {new Date(timestamp?.toDate()).toLocaleString()}</span>
                            </p>
                        </div>
                        <div className='modal__answer'>
                            <ReactQuill 
                                value={answer} placeholder='Enter Your Answer'
                                onChange={handleQuill}
                            />
                        </div>
                        <div className='modal__button'>
                            <button className='cancel' onClick={() => setIsModalOpen(false)}>
                                Cancel</button>
                            <button type='submit' className='add' onClick={handleAnswer}>
                                Add Answer
                            </button>
                        </div>
                    </Modal>
                </div>
                <div className="answer">
                    {getAnswer.map(({ id, answers }) => (
                        <p key={id} style={{ position: "relative", paddingBottom: "5px" }}> {
                            Id === answers.questionId ? (
                                <span>
                                   {ReactHtmlParser(`${answers.answer}`)}
                                    <br />
                                    <span
                                        style={{
                                            color: "gray",
                                            fontSize: "small",
                                            display: "flex",
                                            right: "0px"
                                        }}>
                                        <span style={{ color: "#3052c0" }}>
                                            {answers.user.displayName ? answers.user.displayName : answers.user.email}{" "}
                                            on{" "}
                                            {new Date(answers.timestamp?.toDate()).toLocaleString()}
                                        </span>
                                    </span>
                                </span>
                            ) : ("")
                        }
                        </p>
                    ))}
                </div>
                <img src={imageUrl}
                    alt="" />

            </div>
            <div className="footer">
                <div className="action">
                    <ArrowUpwardOutlined />
                    <ArrowDownwardOutlined />
                </div>
                <div className="footer_middle">
                    <RepeatOutlined />
                    <ChatBubbleOutline />
                </div>
                <div className="footer_left">
                    <ShareButton title="Ju Query Feed" text="JU Query" url="https://ju-query-beta.web.app/" />
                    <MoreHorizOutlined />
                </div>
            </div>
        </div>
    );
};

export default Post