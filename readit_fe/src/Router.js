import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/signup";
import Login from "./components/login";
import Forgotpass from "./components/forgotpass";
import Resetpass from "./components/resetpass";
import Home from "./components/home";
import Profile from "./components/profile";
import Editprofile from "./components/editprofile";
import Changepass from "./components/changepass";
import Communitylist from "./components/communitylist";
import Viewcommunity from "./components/viewcommunity";
import Newtopic from "./components/newtopic";
import Topicslist from "./components/topicslist";
import Viewpost from "./components/viewpost";
import Messageinbox from "./components/messageinbox";
import Message from "./components/message";
import Newcommunity from "./components/newcommunity";
import CreateConversation from "./components/newconversation";


const router = createBrowserRouter([
    { path: '', element: <App/>},                               //
    { path: 'signup', element: <Signup/>},                      //
    { path: 'login', element: <Login/>},                        //
    { path: 'forgotpass', element: <Forgotpass/>},              //
    { path: 'resetpass/:token', element: <Resetpass/>},         //
    { path: 'home', element: <Home/>},                          //
    { path: 'profile', element: <Profile/>},                    //
    { path: 'editprofile', element: <Editprofile/>},            //
    { path: 'changepass', element: <Changepass/>},              //
    { path: 'communitylist', element: <Communitylist/>},        //
    { path: 'newcommunity', element:<Newcommunity/>},           //
    { path: 'viewcommunity/:cmtid', element: <Viewcommunity/>}, //
    { path: 'newtopic/:cmtid', element: <Newtopic/>},           //
    { path: 'topicslist', element: <Topicslist/>},              //
    { path: 'viewpost/:pstid', element: <Viewpost/>},           //
    { path: 'messageinbox', element:<Messageinbox/>},           //
    { path: 'newmessage', element: <CreateConversation/>},      //
    { path: 'message/:conversationId', element:<Message/>},     //
]);

export default router;