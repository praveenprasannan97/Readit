import React, { useState } from "react";
import bgi from '../images/bgi.jpg';
import './communitylist.css';
import Navbar2 from "./navbar2";
import { Link, useNavigate } from "react-router-dom";

function Communitylist(){
    const navigate = useNavigate();
    const [searchquery, setSearchquery] = useState("");
    function listfilter(){}
    function GoToNew(){
        navigate('/newcommunity')
    }

    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/>
            <div className="d-flex justify-content-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8 col-md-8 offset-md-1 col-lg-6 offset-lg-2 col-xl-6 offset-xl-2 ">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder='Search' value={searchquery} 
                                onKeyDown={(event) => { if (event.key === 'Enter') { listfilter();}}}
                                onInput={(event) => setSearchquery(event.target.value)} ></input>
                                <button className="btn btn-dark" type="button" id="button-addon2" onClick={listfilter}>Search</button>
                            </div>
                        </div>
                        <div className="col-4 col-md-3 col-lg-3 col-xl-2">
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
                    <div className="row">
                        <div className="col-2 offset-2">
                            <button className="btn btn-info" id="cl-btn2">Following</button>
                        </div>
                        <div className="col-2 offset-2 offset-md-4">
                            <button className="btn btn-info" id="cl-btn2">All Communities</button>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div>
                <div className="container">
                    <table className="table table-hover table-dark" id="cl-table">
                        <tbody>
                            <tr>
                                <td><Link to='/viewcommunity' id="cl-tblink">Technology</Link></td>
                            </tr>
                            <tr>
                                <td>Culture</td>
                            </tr>
                            <tr>
                                <td>Space</td>
                            </tr>
                            <tr>
                                <td>DIY</td>
                            </tr>
                            <tr>
                                <td>Time Travel</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center">
                    <p style={{color:'white'}}>1 2 3 4 5 6</p>
                </div>
            </div>
        </div>
    );
};
export default Communitylist;