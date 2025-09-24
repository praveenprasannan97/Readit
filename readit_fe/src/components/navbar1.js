import React from 'react';
import { Link } from 'react-router-dom';
import './navbar1.css';
function Navbar1(){
  return(
    <div>
      <nav className="navbar navbar-expand-lg navbar1-custom">
        <div className="container-fluid">
          <h1 className="navbar-brand fs-2 text-white">
            <Link className="nav-link text-white ms-3" to={'/'}>ReadIt</Link>
          </h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fa fa-bars" style={{color:'white'}}></i>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white ms-3" to={'/'}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white ms-3" to={'/login'}>Login</Link>
              </li>
              <li className="nav-item" id='nav1-right'>
                <Link className="nav-link text-white ms-3" to={'/signup'}>Signup</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
};
export default Navbar1;