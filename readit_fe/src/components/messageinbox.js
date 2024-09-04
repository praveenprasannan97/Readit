import React, { useState } from "react";
import bgi from '../images/bgi.jpg';
import './messageinbox.css';
import Navbar2 from "./navbar2";
import { Link, useNavigate } from "react-router-dom";

function Messageinbox(){
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/>
            <div className="d-flex justify-content-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8 col-md-8 offset-md-1 col-lg-6 offset-lg-2 col-xl-6 offset-xl-2 ">
                            <h1 id="mi-head">Message Inbox</h1>
                        </div>
                        <div className="col-4 col-md-3 col-lg-3 col-xl-2">
                            <div className="">
                                <button className="btn btn-info">New Message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="container">
                <table className="table table-hover table-dark" id="mi-table">
                    <tbody>
                        <tr>
                            <td><Link to='/message' id="mi-tblink">Manu</Link></td>
                        </tr>
                        <tr>
                            <td>Ajeesh</td>
                        </tr>
                        <tr>
                            <td>Deepu</td>
                        </tr>
                        <tr>
                            <td>Afsal</td>
                        </tr>
                        <tr>
                            <td>Hari</td>
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
export default Messageinbox;