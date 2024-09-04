import React from "react";
import bgi from '../images/bgi.jpg'
import Navbar1 from "./navbar1";
import { Link, useNavigate } from "react-router-dom";
import './forgotpass.css'

function Forgotpass() {
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar1/>
            <br/><br/><br/>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="forgot-container">
                            <h1 className="mt-5" id="forgot-heading">Forgot Password</h1>
                            <div className="form-group mb-3">
                                <label class="form-label">Registered Email</label>
                                <input id="forgot-ipbg" type="text" className="form-control" placeholder='Email'/>
                            </div>
                            <div className="form-group mb-3">
                                <button className="btn btn-outline-primary float-right" id="forgot-mbtn">Sent Email</button>
                                <Link to='/login'>Go back to Login</Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Forgotpass;