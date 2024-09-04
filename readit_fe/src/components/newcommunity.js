import React, { useState } from "react";
import bgi from '../images/bgi.jpg';
import './newcommunity.css';
import Navbar2 from "./navbar2";
import { Link, useNavigate } from "react-router-dom";

function Newcommunity(){
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/>
            <div className="container d-flex justify-content-center">
                <h1 id="nc-heading">Start New Community</h1>
            </div>
            <br/><br/>
            <div className="container">
                <div className="form-group mb-3">
                    <label class="form-label" id="nc-label">Community Name</label>
                    <input id="nc-ipbg" type="text" className="form-control" placeholder='User Name'/>
                </div>
                <div className="form-group mb-3">
                    <label class="form-label" id="nc-label">Description</label>
                    <textarea class="form-control" placeholder="About The Community" style={{height:'100px'}} id="nc-ipbg"></textarea>
                </div>
                <div className="form-group mb-3 d-flex justify-content-end">
                    <button className="btn btn-info">Create</button>
                </div>
            </div>
        </div>
    );
};
export default Newcommunity;