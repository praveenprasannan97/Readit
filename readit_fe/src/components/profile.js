import React, { useEffect, useState } from "react";
import bgi from '../images/bgi.jpg';
import pic from '../images/nopic.jpg';
import './profile.css';
import Navbar2 from "./navbar2";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import checkAuth from '../store/checkAuth';

function Profile() {
    var user = useSelector(store => store.auth.user);
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState("");

    useEffect(() => {
        fetchprofile();
    }, []);

    function fetchprofile(){
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

    function GoToEdit() {
        navigate('/editprofile');
    }

    function GoToChangepass() {
        navigate('/changepass');
    }

    return (
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2 />
            <br /><br /><br /><br /><br />
            <div className="container row mx-auto">
                <div className="col-md-6 col-12">
                    <div className="container" id="pro-text">
                        <h4>User Name</h4>
                        <p className="fs-4">{profileData.user_name}</p>
                        <br />
                        <h4>Email</h4>
                        <p className="fs-4">{profileData.email}</p>
                        <br />
                        <h4>About</h4>
                        <p className="fs-4">{profileData.about || "No information provided"}</p>
                    </div>
                </div>
                <div className="col-md-6 col-12" id="pro-text">
                    <div className="d-flex justify-content-center">
                        <img id="pro-pic" 
                             src={profileData.profile_picture ? `http://127.0.0.1:8000/${profileData.profile_picture}` : pic} 
                             alt="Profile" />
                    </div>
                    <br />
                    <button className="btn btn-info" id="pro-btn" onClick={GoToEdit}>Edit Profile</button>
                    <br /><br />
                    <button className="btn btn-info" id="pro-btn" onClick={GoToChangepass}>Change Password</button>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(Profile);
