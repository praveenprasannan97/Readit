import React from "react";
import bgi from '../images/bgi.jpg'
import Navbar1 from "./navbar1";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import './resetpass.css'

function Resetpass() {
    const navigate = useNavigate();
    const { token } = useParams();
 
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function goToLogin(){
        if (password !== passwordConf) {
            setErrorMessage("Passwords do not match");
            return;
        }
        else
            axios.post('http://127.0.0.1:8000/api/reset',{
                resettoken: token,
                password: password
            }).then(response=>{
                setErrorMessage('');
                navigate("/login");
            }).catch(error=>{
                if (error.response) {
                    if (error.response.data.errors) {
                        setErrorMessage(Object.values(error.response.data.errors).join(''));
                    } else if (error.response.data.message) {
                        setErrorMessage(error.response.data.message);
                    } else {
                        setErrorMessage('Failed to reset password. Please contact admin');
                    }
                } else if (error.request) {
                    setErrorMessage('No response from the server. Please try again later.');
                } else {
                    setErrorMessage('An error occurred. Please try again.');
                }
            })
    }
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar1/>
            <br/><br/><br/>
            <div className="row d-flex justify-content-center mx-auto">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="reset-container">
                            <h1 className="mt-5" id="reset-heading">Reset Password</h1>
                            <div className="form-group mb-3">
                                <label class="form-label">Password</label>
                                <input id="reset-ipbg" type="password" className="form-control" placeholder='Password' value={password} onInput={(event) => setPassword(event.target.value)}/>
                            </div>
                            <div className="form-group mb-3">
                                <label class="form-label">Confirm Password</label>
                                <input id="reset-ipbg" type="password" className="form-control" placeholder='Confirm Password' value={passwordConf} onInput={(event) => setPasswordConf(event.target.value)}/>
                            </div>
                            <div className="form-group mb-3">
                                <button className="btn btn-outline-primary float-right" id="reset-mbtn" onClick={goToLogin}>Reset Password</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Resetpass;