import React from "react";
import bgi from '../images/bgi.jpg'
import Navbar1 from "./navbar1";
import { Link, useNavigate } from "react-router-dom";
import './login.css'

function Login() {
    const navigate = useNavigate();

    function GoToHome(){
        navigate('/home');
    }
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar1/>
            <br/><br/><br/>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="login-container">
                            <h1 className="mt-5" id="login-heading">Login</h1>
                            <div className="form-group mb-3">
                                <label class="form-label">Email</label>
                                <input id="login-ipbg" type="text" className="form-control" placeholder='Email'/>
                            </div>
                            <div className="form-group mb-3">
                                <label class="form-label">Password</label>
                                <input id="login-ipbg" type="password" className="form-control" placeholder='Password'/>
                            </div>
                            <div className="form-group mb-3">
                                <button className="btn btn-outline-primary float-right" id="login-mbtn" onClick={GoToHome}>Login</button>
                                <Link to='/forgotpass'>Forgot Password</Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;