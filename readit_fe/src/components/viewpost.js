import React, { useState } from "react";
import bgi from '../images/bgi.jpg';
import './viewpost.css';
import Navbar2 from "./navbar2";
import { Link, useNavigate } from "react-router-dom";

function Viewpost(){
    return(
        <div id='vp-bgi' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar2/>
            <br/><br/>
            <div className="d-flex justify-content-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8 col-md-8 offset-md-1 col-lg-6 offset-lg-2 col-xl-6 offset-xl-2 ">
                            <h1 id="vp-head">Welcome To Readit</h1>
                        </div>
                        <div className="col-4 col-md-3 col-lg-3 col-xl-2">
                            <div className="">
                                <button className="btn"><i className="fa fa-arrow-up" style={{color:'white'}}></i></button>
                                <button className="btn"><i className="fa fa-arrow-down" style={{color:'white'}}></i></button>
                                <button className="btn"><i className="fa fa-share" style={{color:'white'}}></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="d-flex justify-content-center">
                <div className="container row">
                    <div className="col-md-6 col-12">
                        <img className="img-thumbnail" src="https://www.shutterstock.com/shutterstock/photos/1883859943/display_1500/stock-photo-the-word-example-is-written-on-a-magnifying-glass-on-a-yellow-background-1883859943.jpg" alt="image" id="vp-img"/>
                    </div>
                    <div className="col-md-6 col-12">
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/LDU_Txk06tM?si=dGDQm23VLSRN7i_Z&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="container">
                <p id="vp-description">This is a scocial media platform where users can write their stories ask questions and share achivements.</p>
                <a target="_blank" href="https://www.wikipedia.org/" title="This is an external link, Mightbe malicious. Proceed with caution !" id="vp-link"><abbr>https://www.wikipedia.org/</abbr></a>
                <br/><br/>
                <p id="vp-description">Post by Admin</p>
            </div>
            <div className="container mt-5" id="vp-cbx">
                <div className="d-flex justify-content-center">
                    <h5>Comments</h5>
                </div>
                <div className="container-fluid mb-3" id="vp-pcmt">
                    <textarea class="form-control mt-3" placeholder="Type your comment here" style={{height:'100px'}} id="vp-ipbg"></textarea>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-info mt-3 mb-3">Post</button>
                    </div>
                </div>
                <div class="container-fluid mb-3" id="vp-cmt">
                    <p className="mt-3">Ajeesh</p>
                    <p>hello happy to be here</p>
                </div>
                <div class="container-fluid mb-3" id="vp-cmt">
                    <p className="mt-3">Ajeesh</p>
                    <p>hello happy to be here</p>
                </div>
                <div class="container-fluid mb-3" id="vp-cmt">
                    <p className="mt-3">Ajeesh</p>
                    <p>hello happy to be here</p>
                </div>
                <div class="container-fluid mb-3" id="vp-cmt">
                    <p className="mt-3">Ajeesh</p>
                    <p>hello happy to be here</p>
                </div>
                <div class="container-fluid mb-3" id="vp-cmt">
                    <p className="mt-3">Ajeesh</p>
                    <p>hello happy to be here</p>
                </div>
                <div class="container-fluid mb-3" id="vp-cmt">
                    <p className="mt-3">Ajeesh</p>
                    <p>hello happy to be here</p>
                </div>
                <div class="container-fluid mb-3" id="vp-cmt">
                    <p className="mt-3">Ajeesh</p>
                    <p>hello happy to be here</p>
                </div>
                <div class="container-fluid mb-3" id="vp-cmt">
                    <p className="mt-3">Ajeesh</p>
                    <p>hello happy to be here</p>
                </div>
                <div class="container-fluid mb-3" id="vp-cmt">
                    <p className="mt-3">Ajeesh</p>
                    <p>hello happy to be here</p>
                </div>
            </div>
        </div>
    );
};
export default Viewpost;