import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Navbar2 from "./navbar2";
import bgi from '../images/bgi.jpg';
import './newtopic.css';
import { useSelector } from "react-redux";
import checkAuth from '../store/checkAuth';

function Newtopic(){
    var user = useSelector(store => store.auth.user);
    const { cmtid } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [link, setLink] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) formData.append('image', image);
        if (video) formData.append('video', video);
        if (link) formData.append('link', link);
        formData.append('community_id', cmtid);


        axios.post('http://127.0.0.1:8000/api/newtopic', 
            formData, 
            {
                headers: {
                    'Authorization': `Token ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(response => {
                const topicId = response.data.id;
                navigate(`/viewpost/${topicId}`);
            })
            .catch(error => {
                console.error('Error creating new topic:', error);
            });
    };

    return (
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2 />
            <br /><br />
            <div className="row mx-auto d-flex justify-content-center">
                <div className="col-md-6 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="nt-container">
                        <h1 className="mt-5" id="nt-heading">New Topic</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label className="form-label">Title</label>
                                <input id="nt-ipbg" type="text" className="form-control" placeholder='Title' 
                                    value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" placeholder="Description" style={{ height: '100px' }} 
                                    id="nt-ipbg" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Image</label>
                                <input className="form-control" type="file" id="nt-ipbg" onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Video</label>
                                <input className="form-control" type="file" id="nt-ipbg" onChange={(e) => setVideo(e.target.files[0])} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Link</label>
                                <input id="nt-ipbg" type="text" className="form-control" placeholder='External Links' 
                                    value={link} onChange={(e) => setLink(e.target.value)} />
                            </div>
                            <div className="form-group mb-3 d-flex justify-content-end">
                                <button className="btn btn-info" id="nt-mbtn" type="submit">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(Newtopic);
