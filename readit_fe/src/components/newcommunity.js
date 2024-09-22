import React, { useState } from "react";
import bgi from '../images/bgi.jpg';
import './newcommunity.css';
import Navbar2 from "./navbar2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from '../store/checkAuth';


function Newcommunity(){
    var user = useSelector(store => store.auth.user);
    const [cmty_name, setCmty_name] = useState("");
    const [cmty_description, setCmty_description] = useState("");
    const navigate = useNavigate();

    function createcmty(){
        axios.post('http://127.0.0.1:8000/api/newcommunity', {
            communityId : cmty_name,
            community_description : cmty_description
        },{
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }})
        .then(response => {
            const communityId = response.data.id;
            navigate(`/viewcommunity/${communityId}`);
        })
        .catch(error => console.error('Error sending message:', error));
    }

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
                    <label className="form-label" id="nc-label">Community Name</label>
                    <input id="nc-ipbg" type="text" value={cmty_name} onInput={(event) => setCmty_name(event.target.value)} className="form-control" placeholder='User Name'/>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" id="nc-label">Description</label>
                    <textarea className="form-control" placeholder="About The Community" value={cmty_description} onInput={(event) => setCmty_description(event.target.value)} style={{height:'100px'}} id="nc-ipbg"></textarea>
                </div>
                <div className="form-group mb-3 d-flex justify-content-end">
                    <button className="btn btn-info" onClick={createcmty}>Create</button>
                </div>
            </div>
        </div>
    );
};
export default checkAuth(Newcommunity);