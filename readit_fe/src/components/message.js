import React, { useState } from "react";
import bgi from '../images/bgi.jpg';
import './message.css';
import Navbar2 from "./navbar2";
import { Link, useNavigate } from "react-router-dom";

function Message(){
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/>
            <div className="d-flex justify-content-center">
                <h2 id="ms-heading">Manu</h2>
            </div>
            <br/><br/>
            <div className="container d-flex justify-content-center" id="ms-msgbox">
                <div className="container-fluid">
                    <div className="container-fluid mt-3" id="ms-msg">
                        <p>Helloo</p>
                    </div>
                    <div className="container-fluid mt-3" id="ms-msg2">
                        <p>Helloo</p>
                    </div>
                    <div className="container-fluid mt-3" id="ms-msg">
                        <p>Helloo</p>
                    </div>
                    <div className="container-fluid mt-3" id="ms-msg2">
                        <p>Helloo</p>
                    </div>
                    <div className="container-fluid mt-3" id="ms-msg">
                        <p>Helloo</p>
                    </div>
                    <div className="container-fluid mt-3" id="ms-msg2">
                        <p>Helloo</p>
                    </div>
                    <div className="container-fluid mt-3" id="ms-msg">
                        <p>Helloo</p>
                    </div>
                    <div className="container-fluid mt-3" id="ms-msg2">
                        <p>Helloo</p>
                    </div>
                    <div className="container-fluid mt-3" id="ms-msg">
                        <p>Helloo</p>
                    </div>
                </div>
                <div class="input-group mb-3" id="ms-sent">
                    <input type="text" class="form-control"/>
                    <button class="btn btn-info" type="button">Sent</button>
                </div>
            </div>
        </div>
    );
};
export default Message;