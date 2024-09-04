import React, { useState } from "react";
import bgi from '../images/bgi.jpg';
import './topicslist.css';
import Navbar2 from "./navbar2";
import { Link, useNavigate } from "react-router-dom";

function Topicslist(){
    const [searchquery, setSearchquery] = useState("");
    function listfilter(){}
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/>
            <div className="d-flex justify-content-center">
                        <div className="col-8 col-md-8 col-lg-6 col-xl-6">
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
                    <div className="row">
                        <div className="col-2 offset-2">
                            <button className="btn btn-info" id="tl-btn1">My Topics</button>
                        </div>
                        <div className="col-2 offset-2 offset-md-4">
                            <button className="btn btn-info" id="tl-btn1">All Topics</button>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="container">
                <table className="table table-hover table-dark" id="tl-table">
                    <tbody>
                        <tr>
                            <td><Link to='/viewpost' id="tl-tblink">Welcome to Readit</Link></td>
                        </tr>
                        <tr>
                            <td>How To create Communities</td>
                        </tr>
                        <tr>
                            <td>How to Messages another user</td>
                        </tr>
                        <tr>
                            <td>How to block a user</td>
                        </tr>
                        <tr>
                            <td>Readit messaging not working</td>
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
export default Topicslist;