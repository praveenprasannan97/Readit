import React from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { removeUser } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import './navbar2.css';

function Navbar2(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    var user = useSelector(store=>store.auth.user);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


    function authlogout() {
        if(user){
            axios.post(`${API_BASE_URL}/api/logout`,{},{headers:{'Authorization':"Token "+ user.token}});
            dispatch(removeUser());
            navigate('/login');
        }
    }
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar2-custom">
            <div className="container-fluid">
                <h1 className="navbar-brand fs-2 text-white">
                    <Link className="nav-link text-white ms-3" to={'/home'}>ReadIt</Link>
                </h1>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fa fa-bars" style={{color:'white'}}></i>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-white ms-3" to={'/home'}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white ms-3" to={'/topicslist'}>Topics</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white ms-3" to={'/communitylist'}>Community</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white ms-3" to={'/messageinbox'}>Messages</Link>
                        </li>
                        <li className="nav-item dropdown ms-3" id='nav2-right'>
                            <a className="nav-link dropdown-toggle text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:'white'}}>
                                <i className="fa fa-user" ></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" id='custom-dropdown-menu'>
                                <li><Link className="nav-link text-white ms-3" to={'/profile'}>Profile</Link></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                <li><Link className="nav-link text-white ms-3" onClick={authlogout}>Logout</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            </nav>
        </div>
    )
};
export default Navbar2;