import React, { useEffect, useState } from "react";
import bgi from '../images/bgi.jpg';
import './viewpost.css';
import Navbar2 from "./navbar2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import checkAuth from '../store/checkAuth';
import CopyToClipboard from "react-copy-to-clipboard";



function Viewpost(){
    const user = useSelector(store => store.auth.user);
    const url = window.location.href;
    const navigate = useNavigate();
    const { pstid } = useParams(); 
    const [topic, setTopic] = useState({});
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        fetchpost();
        fetchcomment();
    }, [pstid]);

    function fetchpost(){
        axios.post('http://127.0.0.1:8000/api/viewpost', {
            pstid: pstid,
        },{
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setTopic(response.data);
                setUpvotes(response.data.upvotes || 0);
                setDownvotes(response.data.downvotes || 0);
            })
            .catch(error => console.error('Error fetching topic:', error));
    }

    function fetchcomment(){
        axios.post('http://127.0.0.1:8000/api/viewcomments', {
            pstid: pstid,
        },{
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setComments(response.data);
            })
            .catch(error => console.error('Error fetching comments:', error));
    }

    function handleVote(voteType) {
        axios.post('http://127.0.0.1:8000/api/addvote', {
            topic_id: pstid,
            vote_type: voteType
        }, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            setUpvotes(response.data.upvotes);
            setDownvotes(response.data.downvotes);
        })
        .catch(error => {
            console.error('Error voting:', error);
        });
    }

    const handlePostComment = () => {
        if (!newComment.trim()) return;

        axios.post('http://127.0.0.1:8000/api/newcomment', {
            topic_id: pstid,
            comment: newComment
        }, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            fetchcomment();
            setNewComment("");
        })
        .catch(error => console.error('Error posting comment:', error));
    };

    return (
        <div id='vp-bgi' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2 />
            <br /><br />
            <div className="d-flex justify-content-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8 col-md-8 offset-md-1 col-lg-6 offset-lg-2 col-xl-6 offset-xl-2">
                            <h1 id="vp-head">{topic.topic_title || "Loading..."}</h1>
                        </div>
                        <div className="col-4 col-md-3 col-lg-3 col-xl-2">
                            <div className="">
                                <button className="btn"><i className="fa fa-arrow-up" style={{ color: 'white' }} onClick={() => handleVote('up')}></i></button><span id="vp-count">{upvotes}</span>
                                <button className="btn"><i className="fa fa-arrow-down" style={{ color: 'white' }} onClick={() => handleVote('down')}></i></button><span id="vp-count">{downvotes}</span>
                                <CopyToClipboard text={url}>
                                    <button className="btn"><i className="fa fa-share" style={{ color: 'white' }}></i></button>
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            <div className="d-flex justify-content-center">
                <div className="container row">
                    {topic.topic_image && (
                        <div className="col-md-6 col-12" id="vp-height">
                            <img className="img-thumbnail" src={`http://127.0.0.1:8000/${topic.topic_image}`} alt="image" id="vp-img" />
                        </div>
                    )}
                    {topic.topic_video && (
                        <div className="col-md-6 col-12" id="vp-height">
                            <video controls id="vp-height">
                                <source src={`http://127.0.0.1:8000/${topic.topic_video}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                </div>
            </div>
            <br /><br />
            <div className="container">
                <p id="vp-description">{topic.topic_description || "No description available"}</p>

                {topic.topic_link && (
                    <a target="_blank" href={topic.topic_link} rel="noreferrer" id="vp-link" data-toggle="tooltip" data-placement="top" title="This is an external link, proceed with caution!">
                        {topic.topic_link}
                    </a>
                )}

                <br /><br />
                <p id="vp-description">Post by {topic.user_id ? topic.user_name : "Unknown"}</p>
            </div>

            <div className="container mt-5" id="vp-cbx">
                <div className="d-flex justify-content-center">
                    <h5>Comments</h5>
                </div>
                
                <div className="container-fluid mb-3" id="vp-pcmt">
                    <textarea
                        className="form-control mt-3"
                        placeholder="Type your comment here"
                        style={{ height: '100px' }}
                        id="vp-ipbg"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-info mt-3 mb-3" onClick={handlePostComment}>Post</button>
                    </div>
                </div>

                {comments.map((comment) => (
                    <div className="container-fluid mb-3" id="vp-cmt" key={comment.id}>
                        <p className="mt-3">{comment.user_name}</p>
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default checkAuth(Viewpost);
