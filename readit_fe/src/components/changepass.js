import React from "react";
import bgi from '../images/bgi.jpg';
import './changepass.css';
import Navbar2 from "./navbar2";

function Changepass(){
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/><br/>
            <div className="row mx-auto d-flex justify-content-center">
                <div className="col-md-6 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="chpw-container">
                    <h1 className="mt-5" id="chpw-heading">Reset Password</h1>
                        <div className="form-group mb-3">
                            <label class="form-label">Password</label>
                            <input id="chpw-ipbg" type="password" className="form-control" placeholder='Password'/>
                        </div>
                        <div className="form-group mb-3">
                            <label class="form-label">Confirm Password</label>
                            <input id="chpw-ipbg" type="password" className="form-control" placeholder='Confirm Password'/>
                        </div>
                        <div className="form-group mb-3 d-flex justify-content-end">
                            <button className="btn btn-info" id="chpw-mbtn">Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Changepass;