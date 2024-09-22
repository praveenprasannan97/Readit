import React, { useState } from "react";
import bgi from '../images/bgi.jpg'
import Navbar1 from "./navbar1";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import './login.css'
import { setUser } from '../store/authSlice';
import axios from "axios";
import checkGuest from '../store/checkGuest';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function attemptLogin(){
        axios.post('http://127.0.0.1:8000/api/login',{
            email:email,
            password:password
        }).then(response=>{
            setErrorMessage('')
            var user = {
                email:email,
                token:response.data.token
            }
            dispatch(setUser(user));
            navigate("/home");
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(''))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar1/>
            <br/><br/><br/>
            <div className="row d-flex justify-content-center mx-auto">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="login-container">
                            <h1 className="mt-5" id="login-heading">Login</h1>
                            <div className="form-group mb-3">
                                <label class="form-label">Email</label>
                                <input id="login-ipbg" type="text" className="form-control" placeholder='Email' value={email} onInput={(event) => setEmail(event.target.value)}/>
                            </div>
                            <div className="form-group mb-3">
                                <label class="form-label">Password</label>
                                <input id="login-ipbg" type="password"
                                className="form-control" placeholder='Password' 
                                value={password} onInput={(event) => setPassword(event.target.value)}
                                onKeyDown={(event) => { if (event.key === 'Enter') { attemptLogin();}}}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <button className="btn btn-outline-primary float-right" id="login-mbtn" onClick={attemptLogin}>Login</button>
                                <Link to='/forgotpass'>Forgot Password</Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default checkGuest(Login);