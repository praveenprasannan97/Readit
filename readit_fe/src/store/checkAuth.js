import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export const checkAuth = (Component) =>{
    function Wrapper(props){
        var user = useSelector(store=>store.auth.user);
        var navigate = useNavigate();
        // useEffect(()=>{
        //     if(!user){
        //         navigate('/login');
        //         return;
        //     }
        // },[user]);
        useEffect(() => {
            // Redirect if no user or token
            if (!user || !user.token) {
                navigate("/login");
            }
        }, [user, navigate]);
        return <Component {...props}/>;
    }
    return Wrapper;
}

export default checkAuth;