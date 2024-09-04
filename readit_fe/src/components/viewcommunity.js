import React, { useState } from "react";
import bgi from '../images/bgi.jpg';
import './viewcommunity.css';
import Navbar2 from "./navbar2";
import { Link, useNavigate } from "react-router-dom";

function Viewcommunity(){
    const navigate = useNavigate();
    const [searchquery, setSearchquery] = useState("");
    function listfilter(){}
    function GotoNew(){
        navigate('/newtopic')
    }
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/>
            <div className="d-flex justify-content-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8 col-md-8 offset-md-1 col-lg-6 offset-lg-2 col-xl-6 offset-xl-2 ">
                            <h1 id="vc-head">Technology</h1>
                        </div>
                        <div className="col-4 col-md-3 col-lg-3 col-xl-2">
                            <div className="">
                                <button className="btn btn-info">Join</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
            <div className="container">
                <p id="vc-head">
                    Our technology community is a dynamic hub for enthusiasts, professionals, and learners passionate about the latest in tech. 
                    We foster collaboration, knowledge-sharing, and innovation through discussions, workshops, and events. Whether you're into coding, 
                    cybersecurity, AI, or emerging technologies, our community offers a supportive environment to grow and connect with like-minded individuals. 
                    Join us to stay ahead in the tech world, contribute to exciting projects, and build meaningful networks. Together, we're driving the future of technology.
                </p>
            </div>
            <div className="d-flex justify-content-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8 col-sm-8 offset-sm-1 col-md-8 offset-md-1 col-lg-6 offset-lg-2 col-xl-6 offset-xl-2 ">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder='Search' value={searchquery} 
                                onKeyDown={(event) => { if (event.key === 'Enter') { listfilter();}}}
                                onInput={(event) => setSearchquery(event.target.value)} ></input>
                                <button className="btn btn-dark" type="button" id="button-addon2" onClick={listfilter}>Search</button>
                            </div>
                        </div>
                        <div className="col-4 col-sm-3 col-md-3 col-lg-2 offset-lg-1 col-xl-2 offset-xl-1">
                            <div className="">
                                <button className="btn btn-info" id="vc-btn1" onClick={GotoNew}>New Topic</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="container">
                        <table className="table table-hover table-dark" id="home-table">
                            <tbody>
                                <tr>
                                    <td>Welcome to readit</td>
                                </tr>
                                <tr>
                                    <td>How To create Communities</td>
                                </tr>
                                <tr>
                                    <td>How to Messages another user</td>
                                </tr>
                                <tr>
                                    <td>How to block a user</td>
                                </tr>
                                <tr>
                                    <td>Readit messaging not working</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p style={{color:'white'}}>1 2 3 4 5 6</p>
                    </div>
        </div>
    );
};
export default Viewcommunity;