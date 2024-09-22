import React, { useEffect, useState } from "react";
import bgi from '../images/bgi.jpg';
import './topicslist.css';
import axios from "axios";
import Navbar2 from "./navbar2";
import Pagination from "./pagination";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from '../store/checkAuth';

function Topicslist(){
    var user = useSelector(store => store.auth.user);
    const [searchquery, setSearchquery] = useState("");
    const [selection, setSelection] = useState(0);
    const [topicsin, setTopicsin] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const topics = topicsin.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(topicsin.length / recordsPerPage)

    useEffect(() => {
        listfilter()
    }, [selection]);

    function listfilter(){
        axios.post("http://127.0.0.1:8000/api/topics",{searchquery:searchquery,selection:selection}, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => setTopicsin(response.data))
            .catch(error => console.error("Error fetching topics", error));
    }
    function toggleSelection(){
        setSelection(selection === 0 ? 1 : 0)
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
                        onInput={(event) => setSearchquery(event.target.value)} ></input>
                        <button className="btn btn-dark" type="button" id="button-addon2" onClick={listfilter}>Search</button>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="d-flex justify-content-center">
                <div className="container">
                    <div>
                        {selection === 1 ? (
                            <div className="row">
                                <div className="col-2 offset-2">
                                    <button className="btn btn-success" id="cl-btn2">My Topics</button>
                                </div>
                                <div className="col-2 offset-2 offset-md-4">
                                    <button className="btn btn-secondary" id="cl-btn2" onClick={toggleSelection}>All Topics</button>
                                </div>
                            </div>
                        ):(
                            <div className="row">
                                <div className="col-2 offset-2">
                                    <button className="btn btn-secondary" id="cl-btn2" onClick={toggleSelection}>My Topics</button>
                                </div>
                                <div className="col-2 offset-2 offset-md-4">
                                    <button className="btn btn-success" id="cl-btn2" >All Topics</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="container">
                <table className="table table-hover table-dark" id="tl-table">
                    <tbody>
                        {topics.length > 0 ? (
                            topics.map((post) => (
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
            <div className="d-flex justify-content-center">
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};
export default checkAuth(Topicslist);