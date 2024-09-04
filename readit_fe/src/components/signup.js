import React from "react";
import bgi from '../images/bgi.jpg'
import Navbar1 from "./navbar1";
import { Link, useNavigate } from "react-router-dom";
import './signup.css'

function Signup() {
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar1/>
            <br/><br/><br/>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="signup-container">
                            <h1 id="signup-heading">Signup</h1>
                            <div className="form-group mb-3">
                                <label class="form-label">Email</label>
                                <input id="signup-ipbg" type="text" className="form-control" placeholder='Email'/>
                            </div>
                            <div className="form-group mb-3">
                                <label class="form-label">User Name</label>
                                <input id="signup-ipbg" type="text" className="form-control" placeholder='User Name'/>
                            </div>
                            <div className="form-group mb-3">
                                <label class="form-label">Password</label>
                                <input id="signup-ipbg" type="password" className="form-control" placeholder='Password'/>
                            </div>
                            <div className="form-group mb-3">
                                <label class="form-label">Confirm Password</label>
                                <input id="signup-ipbg" type="password" className="form-control" placeholder='Confirm Password'/>
                            </div>
                            <div className="form-group mb-3">
                                <button className="btn btn-outline-primary" id="signup-mbtn">Signup</button>
                                <Link to='/login'>Go back to Login</Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Signup;