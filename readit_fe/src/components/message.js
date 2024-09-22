import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom"; 
import bgi from '../images/bgi.jpg';
import './message.css';
import Navbar2 from "./navbar2";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from '../store/checkAuth';

function Message() {
    var user = useSelector(store => store.auth.user);
    const { conversationId } = useParams(); 
    const [messages, setMessages] = useState([]); 
    const [newMessage, setNewMessage] = useState(''); 
    const msgBoxRef = useRef(null); 

    useEffect(() => {
        // Fetch messages for the conversation
        axios.post(`http://127.0.0.1:8000/api/messages/${conversationId}`,{}, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => setMessages(response.data))
            .catch(error => console.error('Error fetching messages:', error));
    }, [conversationId]); 

    useEffect(() => {
        // Scroll to the bottom of the messages when the component updates
        if (msgBoxRef.current) {
            msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
        }
    }, [messages]); 

    function handleSendMessage() {
        if (newMessage.trim() !== '') {
            axios.post('http://127.0.0.1:8000/api/createmessage', {
                conversation_id: conversationId,
                content: newMessage
            },{
                headers: {
                    'Authorization': `Token ${user.token}`,
                    'Content-Type': 'application/json',
                }})
            .then(response => {
                setMessages([...messages, response.data]);
                setNewMessage('');
            })
            .catch(error => console.error('Error sending message:', error));
        }
    };

    return (
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/>
            <div className="d-flex justify-content-center">
                <h2 id="ms-heading"></h2>
            </div>
            <br/><br/>
            <div  className="container" id="ms-msgbox"  ref={msgBoxRef}>
                {messages.map((msg, index) => (
                    <div key={index} id="ms-msgbox1">
                        {msg.sender.email === user.email ? (
                            // Sent message
                            <div className=" mb-3 message" id="ms-msg2">
                                <p id="ms-pw">{msg.sender.user_name}<br/>{msg.content}</p>
                            </div>
                        ) : (
                            // Received message
                            <div className=" mb-3 message" id="ms-msg">
                                <p>{msg.sender.user_name}<br/>{msg.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="container d-flex justify-content-center">
                <div class="input-group mb-3" id="ms-sent" >
                    <input 
                    class="form-control" 
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message" id="ms-sip"/>
                    <button class="btn btn-info" type="button" onClick={handleSendMessage}>Sent</button>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(Message);
