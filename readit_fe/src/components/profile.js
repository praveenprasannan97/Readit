import React from "react";
import bgi from '../images/bgi.jpg';
import pic from '../images/ajeesh.jpg';
import './profile.css';
import Navbar2 from "./navbar2";
import { Link, useNavigate } from "react-router-dom";

function Profile(){
    const navigate = useNavigate();

    function GoToEdit(){
        navigate('/editprofile');
    }
    function GoToChangepass(){
        navigate('/changepass');
    }

    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/><br/><br/><br/>
            <div className="container row mx-auto" >
                <div className="col-md-6 col-12">
                    <div className="container" id="pro-text">
                        <h4>User Name</h4>
                        <p className="fs-4">Ajeesh</p>
                        <br/>
                        <h4>Email</h4>
                        <p className="fs-4">Ajeesh@gmail.com</p>
                        <br/>
                        <h4>About</h4>
                        <p className="fs-4">Hello, I'm Ajeesh</p>
                    </div>
                </div>
                <div className="col-md-6 col-12" id="pro-text">
                    <div className="d-flex justify-content-center">
                        <img src={pic} id="pro-pic"/>
                    </div>
                    <br/>
                    <button className="btn btn-info" id="pro-btn" onClick={GoToEdit}>Edit Profile</button>
                    <br/><br/>
                    <button className="btn btn-info" id="pro-btn" onClick={GoToChangepass}>Change Password</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;