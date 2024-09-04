import React, { useState } from "react";
import bgi from '../images/bgi.jpg';
import './newtopic.css';
import Navbar2 from "./navbar2";
import { Link, useNavigate } from "react-router-dom";

function Newtopic(){
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/>
            <div className="row mx-auto d-flex justify-content-center">
                <div className="col-md-6 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="nt-container">
                    <h1 className="mt-5" id="nt-heading">New Topic</h1>
                        <div className="form-group mb-3">
                            <label class="form-label">Title</label>
                            <input id="nt-ipbg" type="text" className="form-control" placeholder='Title'/>
                        </div>
                        <div className="form-group mb-3">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" placeholder="Description" style={{height:'100px'}} id="nt-ipbg"></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label class="form-label">Image</label>
                            <input class="form-control" type="file" id="nt-ipbg"/>
                        </div>
                        <div className="form-group mb-3">
                            <label class="form-label">Video</label>
                            <input class="form-control" type="file" id="nt-ipbg"/>
                        </div>
                        <div className="form-group mb-3">
                            <label class="form-label">Link</label>
                            <input id="nt-ipbg" type="text" className="form-control" placeholder='External Links'/>
                        </div>
                        <div className="form-group mb-3 d-flex justify-content-end">
                            <button className="btn btn-info" id="nt-mbtn">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Newtopic;