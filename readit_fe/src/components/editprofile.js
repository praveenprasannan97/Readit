import React, { useEffect, useState } from "react";
import bgi from '../images/bgi.jpg';
import './editprofile.css';
import Navbar2 from "./navbar2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import checkAuth from '../store/checkAuth';

function Editprofile() {
    var user = useSelector(store => store.auth.user);
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        user_name: '',
        email: '',
        about: '',
        profile_picture: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    function fetchProfile() {
        axios.post('http://127.0.0.1:8000/api/profile', {},{
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            setProfileData(response.data);
        })
        .catch(error => {
            console.error("Error fetching profile data", error);
        });
    }

    function handleChange(e) {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    }

    function handleFileChange(e) {
        setSelectedFile(e.target.files[0]);
    }

    function handleSubmit(e) {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('user_name', profileData.user_name);
        formData.append('email', profileData.email);
        formData.append('about', profileData.about);
    
        if (selectedFile) {
            formData.append('profile_picture', selectedFile);
        }
    
        axios.post('http://127.0.0.1:8000/api/editprofile', formData, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            console.log("Profile updated", response.data);
            navigate('/profile');
        })
        .catch(error => {
            console.error("Error updating profile", error);
        });
    }

    return (
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2 />
            <br /><br /><br />
            <div className="row mx-auto d-flex justify-content-center">
                <div className="col-md-6 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="epro-container">
                        <h1 className="mt-5" id="epro-heading">Edit Profile</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label className="form-label">User Name</label>
                                <input id="epro-ipbg" 
                                       type="text" 
                                       className="form-control" 
                                       name="user_name"
                                       value={profileData.user_name}
                                       onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Email</label>
                                <input id="epro-ipbg" 
                                       type="email" 
                                       className="form-control" 
                                       name="email"
                                       value={profileData.email}
                                       onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">About</label>
                                <textarea className="form-control" 
                                          name="about"
                                          value={profileData.about || ''} 
                                          onChange={handleChange} 
                                          style={{ height: '100px' }} 
                                          id="epro-ipbg"></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Profile Picture</label>
                                <input className="form-control" 
                                       type="file" 
                                       onChange={handleFileChange} 
                                       id="epro-ipbg" />
                            </div>
                            <div className="form-group mb-3 d-flex justify-content-end">
                                <button type="submit" className="btn btn-info" id="epro-mbtn">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(Editprofile);
