import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import {login} from './features/appSlice'
import {useDispatch} from 'react-redux'
import {auth,provider} from './firebase'
function Login() {
    const dispatch=useDispatch();
    const signIn=()=>{
        auth.signInWithPopup(provider).then((result)=>{
            dispatch(
                login({
                    
                    username:result.user.username,

                    profilePic:result.user.photoURL,
                    id:result.user.uid
                })
            )
        }).catch(error=>alert(error.message))

    }
    return (
        <div className="login">
            <div className="login_container">
              <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt=""></img>
              <Button variant="outlined" onClick={signIn}>
                  signIn</Button>  
                
                
            </div>
            
        </div>
    )
}

export default Login
