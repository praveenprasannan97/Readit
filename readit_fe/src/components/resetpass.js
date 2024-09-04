import React from "react";
import bgi from '../images/bgi.jpg'
import Navbar1 from "./navbar1";
import { Link, useNavigate } from "react-router-dom";
import './resetpass.css'

function Resetpass() {
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar1/>
            <br/><br/><br/>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="reset-container">
                            <h1 className="mt-5" id="reset-heading">Reset Password</h1>
                            <div className="form-group mb-3">
                                <label class="form-label">Password</label>
                                <input id="reset-ipbg" type="password" className="form-control" placeholder='Password'/>
                            </div>
                            <div className="form-group mb-3">
                                <label class="form-label">Confirm Password</label>
                                <input id="reset-ipbg" type="password" className="form-control" placeholder='Confirm Password'/>
                            </div>
                            <div className="form-group mb-3">
                                <button className="btn btn-outline-primary float-right" id="reset-mbtn">Reset Password</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Resetpass;