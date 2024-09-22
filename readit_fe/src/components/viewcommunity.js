import React, { useEffect, useState } from "react";
import bgi from '../images/bgi.jpg';
import './viewcommunity.css';
import Navbar2 from "./navbar2";
import Pagination from "./pagination";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import checkAuth from '../store/checkAuth';

function Viewcommunity() {
    var user = useSelector(store => store.auth.user);
    const navigate = useNavigate();
    const { cmtid } = useParams(); 
    const [searchquery, setSearchquery] = useState("");
    const [community, setCommunity] = useState({});
    const [postsip, setPostsip] = useState([]);
    const [isMember, setIsMember] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const posts = postsip.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(postsip.length / recordsPerPage)

    useEffect(() => {
        fetchdetails();
        fetchposts();
        checkMembership();
    }, []);

    function fetchdetails() {
        axios.post("http://127.0.0.1:8000/api/viewcommunity", { cmt_id: cmtid }, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (response.data && response.data.length > 0) {
                setCommunity(response.data[0]);
            }
        })
        .catch(error => console.error("Error fetching community details", error));
    }

    function fetchposts() {
        axios.post("http://127.0.0.1:8000/api/communitypost", { cmt_id: cmtid, searchquery: searchquery }, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => setPostsip(response.data))
        .catch(error => console.error("Error fetching posts", error));
    }

    function checkMembership() {
        axios.post("http://127.0.0.1:8000/api/checkmembership", { cmt_id: cmtid }, {
            headers: {
                'Authorization': `Token ${user.token}`,
            }
        })
        .then(response => {
            setIsMember(response.data.is_member);
        })
        .catch(error => console.error("Error checking membership", error));
    }

    function joinCommunity() {
        axios.post("http://127.0.0.1:8000/api/joincommunity", { cmt_id: cmtid }, {
            headers: {
                'Authorization': `Token ${user.token}`,
            }
        })
        .then(() => {
            setIsMember(true);
        })
        .catch(error => console.error("Error joining community", error));
    }

    function leaveCommunity() {
        axios.post("http://127.0.0.1:8000/api/leavecommunity", { cmt_id: cmtid }, {
            headers: {
                'Authorization': `Token ${user.token}`,
            }
        })
        .then(() => {
            setIsMember(false);
        })
        .catch(error => console.error("Error leaving community", error));
    }

    function GotoNew() {
        navigate(`/newtopic/${cmtid}`);
    }

    return (
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/>
            <div className="d-flex justify-content-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8 col-md-8 offset-md-1 col-lg-6 offset-lg-2 col-xl-6 offset-xl-2 ">
                            <h1 id="vc-head">{community.community_name}</h1>
                        </div>
                        <div className="col-4 col-md-3 col-lg-3 col-xl-2">
                            <div className="">
                                {isMember ? (
                                <button className="btn btn-danger" onClick={leaveCommunity}>Leave</button>
                                ) : (
                                <button className="btn btn-info" onClick={joinCommunity}>Join</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
            <div className="container">
                <p className="fs-5" id="vc-head">{community.community_description}</p>
            </div>
            <div className="d-flex justify-content-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8 col-sm-8 offset-sm-1 col-md-8 offset-md-1 col-lg-6 offset-lg-2 col-xl-6 offset-xl-2 ">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder='Search' value={searchquery} 
                                onKeyDown={(event) => { if (event.key === 'Enter') { fetchposts(); } }}
                                onInput={(event) => setSearchquery(event.target.value)} />
                                <button className="btn btn-dark" type="button" id="button-addon2" onClick={fetchposts}>Search</button>
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
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <tr key={post.id}>
                                    <td>
                                        <Link id="mi-tablerow" to={`/viewpost/${post.id}`}>
                                            {post.topic_title}
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>No posts found</td>
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
}

export default checkAuth(Viewcommunity);
