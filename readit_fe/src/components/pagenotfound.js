import React, { useState } from "react";
// import bgi from '../images/bgi.jpg';
import './pagenotfound.css';
import Navbar2 from "./navbar2";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from '../store/checkAuth';


function Pagenotfound(){
    var user = useSelector(store=>store.auth.user);
    const navigate = useNavigate();

    return(
        <div id='bgimage'>
            <Navbar2/>
            <br/><br/><br/>
            <h1 id='pnf-head'>404</h1>
            <br></br>
            <h3 id='pnf-body'>Looks Like You Are Lost</h3>
            <br></br>
            <Link to='/home' id='pnf-link'>Go Home</Link>
        </div>
    );
};
export default checkAuth(Pagenotfound);