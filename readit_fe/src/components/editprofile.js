import React from "react";
import bgi from '../images/bgi.jpg';
import pic from '../images/ajeesh.jpg';
import './editprofile.css';
import Navbar2 from "./navbar2";

function Editprofile(){
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/><br/>
            <div className="row mx-auto d-flex justify-content-center">
                <div className="col-md-6 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="epro-container">
                    <h1 className="mt-5" id="epro-heading">Edit Profile</h1>
                        <div className="form-group mb-3">
                            <label class="form-label">User Name</label>
                            <input id="epro-ipbg" type="text" className="form-control" placeholder='User Name'/>
                        </div>
                        <div className="form-group mb-3">
                            <label class="form-label">Email</label>
                            <input id="epro-ipbg" type="text" className="form-control" placeholder='Email'/>
                        </div>
                        <div className="form-group mb-3">
                            <label class="form-label">About</label>
                            <textarea class="form-control" placeholder="About You" style={{height:'100px'}} id="epro-ipbg"></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label class="form-label">Profile Picture</label>
                            <input class="form-control" type="file" id="epro-ipbg"/>
                        </div>
                        <div className="form-group mb-3 d-flex justify-content-end">
                            <button className="btn btn-info" id="epro-mbtn">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Editprofile;