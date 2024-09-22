import React, { useState } from "react";
import bgi from '../images/bgi.jpg';
import './changepass.css';
import Navbar2 from "./navbar2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import checkAuth from '../store/checkAuth';

function Changepass(){
    var user = useSelector(store=>store.auth.user);
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function changePassword(){
        if (password !== passwordConf) {
            setErrorMessage("Passwords do not match");
            return;
        }
        else
            axios.post('http://127.0.0.1:8000/api/changepass',{password: password},
            {headers:{'Authorization':"Token "+ user.token}
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
            <Navbar2/>
            <br/><br/><br/>
            <div className="row mx-auto d-flex justify-content-center">
                <div className="col-md-6 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="chpw-container">
                    <h1 className="mt-5" id="chpw-heading">Change Password</h1>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <div className="form-group mb-3">
                            <label class="form-label">Password</label>
                            <input id="chpw-ipbg" type="password" className="form-control" placeholder='Password' value={password} onInput={(event) => setPassword(event.target.value)}/>
                        </div>
                        <div className="form-group mb-3">
                            <label class="form-label">Confirm Password</label>
                            <input id="chpw-ipbg" type="password" className="form-control" placeholder='Confirm Password' value={passwordConf} onInput={(event) => setPasswordConf(event.target.value)} />
                        </div>
                        <br/>
                        <div className="form-group mb-3 d-flex justify-content-end">
                            <button className="btn btn-info" id="chpw-mbtn" onClick={changePassword}>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default checkAuth(Changepass);