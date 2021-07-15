import React,{useEffect} from 'react';
import WebcamCapture from './WebcamCapture';
import Preview from './Preview'
import './App.css';
import Chats from './Chats'
import ChatView from './ChatView'
import Login from './Login'
import {auth} from './firebase'
import {login, logout} from './features/appSlice'

import {useDispatch,useSelector} from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { selectUser } from './features/appSlice';
function App() {

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
     if(authUser){
      dispatch(
        login({
            
            username:authUser.displayName,
            profilePic:authUser.photoURL,
            id:authUser.uid
        })
    )
     }else{
       dispatch(logout());
     }
    })
  },[])

  const user=useSelector(selectUser);
  const dispatch=useDispatch();
  return (
    <div className="app">
      <Router>
     
  
         {!user?(<Login/>):(
           <>
    <div className="app_body">
      
        <Switch>

           <Route  exact path="/test">
            <h1>this is a new page</h1>
          </Route>
          <Route exact path="/preview">
            <Preview/>
            </Route>
            <Route exact path="/chats">
            <Chats/>
            </Route>
            <Route exact path="/chats/view">
            <ChatView/>
            </Route>
          <Route  exact path="/">
      <WebcamCapture/>
            
          </Route>
        </Switch>
        </div>
        </>)} 
    </Router>
    </div>
  )
}

export default App;
