import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar2 from "./navbar2";
import bgi from '../images/bgi.jpg';
import './newconversation.css';
import checkAuth from '../store/checkAuth';

function CreateConversation(){
    const user = useSelector(store => store.auth.user);
    const [searchquery, setsearchquery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Handle search query and API call
    const handleSearch = () => {
        if (searchquery.trim() === "") {
            setErrorMessage("Search query cannot be empty.");
            return;
        }
        
        axios.post("http://127.0.0.1:8000/api/searchuser",{searchquery:searchquery}, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            setSearchResults(response.data);
            setErrorMessage("");
        })
        .catch(error => {
            console.error("Error fetching users", error);
            setErrorMessage("Error fetching users.");
        });
    };

    const handleCreateConversation = (selectedUserId) => {
        console.log(selectedUserId)
        axios.post("http://127.0.0.1:8000/api/createconversation", {
            participants: [selectedUserId]
        }, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            const conversationId = response.data.id;
            navigate(`/message/${conversationId}`);
        })
        .catch(error => {
            console.error("Error creating conversation", error);
            setErrorMessage("Error creating conversation.");
        });
    };

    return (
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2 />
            <br/><br/>
            <div className="mt-5">
                <h2 id="ncnv-heading">Search for Users</h2>
                <br/><br/>
                <div className="d-flex justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter user name"
                                value={searchquery}
                                onChange={(e) => setsearchquery(e.target.value)}
                                onKeyDown={(event) => { if (event.key === 'Enter') { handleSearch();}}}
                            />
                            <button className="btn btn-dark" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <br/><br/>
                {errorMessage && <div className="container alert alert-danger">{errorMessage}</div>}
                <div className="container">
                    {searchResults.length > 0 ? (
                        <ul className="list-group">
                            {searchResults.map(user => (
                                <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {user.user_name}
                                    <button className="btn btn-info" onClick={() => handleCreateConversation(user.id)}>
                                        Start Chat
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default checkAuth(CreateConversation);
