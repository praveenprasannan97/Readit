import React, { useState } from "react";
import bgi from '../images/bgi.jpg'
import Navbar1 from "./navbar1";
import { Link, useNavigate} from "react-router-dom";
import './forgotpass.css'
import axios from "axios"

function Forgotpass() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function sentmail(){
        axios.post('http://127.0.0.1:8000/api/forgotpass',{
            email:email
        }).then(response=>{
            setErrorMessage('');
            navigate("/login");
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(''))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to reset password. Please contact admin')
            }
        })
    }
    return(
        <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
            <Navbar1/>
            <br/><br/><br/>
            <div className="row mx-auto d-flex justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="forgot-container">
                            <h1 className="mt-5" id="forgot-heading">Forgot Password</h1>
                            <div className="form-group mb-3">
                                <label class="form-label">Registered Email</label>
                                <input id="forgot-ipbg" type="text" className="form-control" placeholder='Email' value={email} onInput={(event) => setEmail(event.target.value)}/>
                            </div>
                            <div className="form-group mb-3">
                                <button className="btn btn-outline-primary float-right" id="forgot-mbtn" onClick={sentmail}>Sent Email</button>
                                <Link to='/login'>Go back to Login</Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Forgotpass;