import React, { useEffect, useState } from "react";
import Navbar2 from "./navbar2";
import bgi from '../images/bgi.jpg';
import axios from "axios";
import './home.css';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import checkAuth from '../store/checkAuth';

function Home(){
    var user = useSelector(store => store.auth.user);
    const [searchquery, setSearchquery] = useState("");
    const [topics, setTopics] = useState([]);
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        listfilter();
    }, []);

    function listfilter(){
        axios.post("http://127.0.0.1:8000/api/hometopic", {searchquery: searchquery}, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => setTopics(response.data))
        .catch(error => console.error("Error fetching topics", error));
        
        axios.post("http://127.0.0.1:8000/api/homecommunity", {searchquery: searchquery}, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => setCommunities(response.data))
        .catch(error => console.error("Error fetching communities", error));
    }

    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/>
            <div className="d-flex justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder='Search' value={searchquery} 
                        onKeyDown={(event) => { if (event.key === 'Enter') { listfilter();}}}
                        onInput={(event) => setSearchquery(event.target.value)} />
                        <button className="btn btn-dark" type="button" onClick={listfilter}>Search</button>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="row mx-auto">
                <div className="col-md-6 col-12">
                    <h3 id="home-h3">Trending Topics</h3>
                    <br/>
                    <div className="container">
                        <table className="table table-hover table-dark" id="home-table">
                            <tbody>
                                {topics.length > 0 ? (
                                    topics.map(post => (
                                    <tr key={post.id}>
                                        <td><Link to={`/viewpost/${post.id}`} id="tl-tblink">{post.topic_title}</Link></td>
                                    </tr>
                                ))
                                ) : (
                                    <tr>
                                        <td>No Topics found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <h3 id="home-h3">Popular Communities</h3>
                    <br/>
                    <div className="container">
                        <table className="table table-hover table-dark" id="home-table">
                            <tbody>
                                {communities.length > 0 ? (
                                    communities.map(cmt => (
                                    <tr key={cmt.id}>
                                        <td><Link id="mi-tablerow" to={`/viewcommunity/${cmt.id}`}>{cmt.community_name}</Link></td>
                                    </tr>
                                ))
                                ) : (
                                    <tr>
                                        <td>No community found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(Home);
