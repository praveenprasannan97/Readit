import React, { useEffect, useState } from "react";
import axios from "axios";
import bgi from '../images/bgi.jpg';
import './messageinbox.css';
import Navbar2 from "./navbar2";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from '../store/checkAuth';

function Inbox(){
    var user = useSelector(store => store.auth.user);
    const [searchquery, setSearchquery] = useState("");
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listfilter()
    }, []);

    function listfilter(){
        axios.post("http://127.0.0.1:8000/api/conversations",{searchquery:searchquery}, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => setConversations(response.data))
            .catch(error => console.error("Error fetching conversations", error));
    }
    function GoToNewChat(){
        navigate('/newmessage')
    }

    return (
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/>
            <div className="d-flex justify-content-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9 col-md-8 offset-md-1 col-lg-6 offset-lg-2 col-xl-4 offset-xl-4 ">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder='Search' value={searchquery} 
                                onKeyDown={(event) => { if (event.key === 'Enter') { listfilter();}}}
                                onInput={(event) => setSearchquery(event.target.value)} ></input>
                                <button className="btn btn-dark" type="button" id="button-addon2" onClick={listfilter}>Search</button>
                            </div>
                        </div>
                        <div className="col-3 col-md-3 col-lg-3 col-xl-2">
                            <div className="">
                                <button className="btn btn-info" id="cl-btn1" onClick={GoToNewChat}>New Chat</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="container">
                <table  className="table table-hover table-dark" id="mi-table">
                    <thead>
                        <tr>
                            <th>Participants</th>
                        </tr>
                    </thead>
                    <tbody>
                    {conversations.length > 0 ? (
                        conversations.map((conversation) => (
                        <tr key={conversation.id}>
                            <td>
                            {conversation.participants.filter(participant => participant.email !== user.email).map((participant) => (
                                <Link id="mi-tablerow" key={participant.id} to={`/message/${conversation.id}`}>
                                    {participant.user_name}
                                </Link>
                            ))}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td>No conversations found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default checkAuth(Inbox);
