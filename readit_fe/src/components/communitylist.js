import React, { useEffect, useState } from "react";
import bgi from '../images/bgi.jpg';
import './communitylist.css';
import Navbar2 from "./navbar2";
import Pagination from "./pagination";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import checkAuth from '../store/checkAuth';

function Communitylist(){
    var user = useSelector(store => store.auth.user);
    const navigate = useNavigate();
    const [selection, setSelection] = useState(0);
    const [searchquery, setSearchquery] = useState("");
    const [communityip, setCommunityip] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const community = communityip.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(communityip.length / recordsPerPage)

    useEffect(() => {
        listfilter()
    }, [selection]);

    function listfilter(){
        axios.post("http://127.0.0.1:8000/api/community",{searchquery:searchquery,selection:selection}, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => setCommunityip(response.data))
            .catch(error => console.error("Error fetching communities", error));
    }
    function GoToNew(){
        navigate('/newcommunity')
    }
    function toggleSelection(){
        setSelection(selection === 0 ? 1 : 0)
    }

    return(
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
                                <button className="btn btn-info" id="cl-btn1" onClick={GoToNew}>New Community</button>
                            </div>
                        </div>
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
                                    <button className="btn btn-success" id="cl-btn2">Following</button>
                                </div>
                                <div className="col-2 offset-2 offset-md-4">
                                    <button className="btn btn-secondary" id="cl-btn2" onClick={toggleSelection}>All Communities</button>
                                </div>
                            </div>
                        ):(
                            <div className="row">
                                <div className="col-2 offset-2">
                                    <button className="btn btn-secondary" id="cl-btn2" onClick={toggleSelection}>Following</button>
                                </div>
                                <div className="col-2 offset-2 offset-md-4">
                                    <button className="btn btn-success" id="cl-btn2" >All Communities</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <br/><br/>
            <div>
                <div className="container">
                    <table className="table table-hover table-dark" id="cl-table">
                        <tbody>
                        {community.length > 0 ? (
                            community.map((cmt) => (
                            <tr key={cmt.id}>
                                <td>
                                    <Link id="mi-tablerow" to={`/viewcommunity/${cmt.id}`}>
                                        {cmt.community_name}
                                    </Link>
                                </td>
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
                <div className="d-flex justify-content-center">
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                </div>
            </div>
        </div>
    );
};
export default checkAuth(Communitylist);