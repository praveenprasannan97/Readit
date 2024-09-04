import React, { useState } from "react";
import Navbar2 from "./navbar2";
import bgi from '../images/bgi.jpg';
import './home.css';

function Home(){
    const [searchquery, setSearchquery] = useState("");
    function listfilter(){}
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
            <div className="row mx-auto">
                <div className="col-md-6 col-12">
                    <h3 id="home-h3">Trending Topics</h3>
                    <br/>
                    <div className="container">
                        <table className="table table-hover table-dark" id="home-table">
                            <tbody>
                                <tr>
                                    <td>Welcome to Readit</td>
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
                <div className="col-md-6 col-12">
                    <h3 id="home-h3">Popular Communities</h3>
                    <br/>
                    <div className="container">
                        <table className="table table-hover table-dark" id="home-table">
                            <tbody>
                                <tr>
                                    <td>Technology</td>
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
        </div>
    )
}

export default Home;