import { Avatar } from '@material-ui/core'
import  ChatBubbleIcon  from '@material-ui/icons/ChatBubble'
import SearchIcon from '@material-ui/icons/Search';
import React ,{useState,useEffect} from 'react'
import './Chats.css'
import { db } from './firebase';
import Chat from './Chat'
import { selectUser } from './features/appSlice';
import {useSelector,useDispatch} from 'react-redux';
import {auth} from './firebase'

import  RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';
function Chats() {
  const dispatch=useDispatch();
  const history=useHistory();
    const takeSnap=()=>{
        history.push("/")
        dispatch(resetCameraImage())

    }
    const [posts,setPosts]=useState([]);
    const user=useSelector(selectUser);



    useEffect(()=>{
        db.collection("posts").orderBy("timestamp","desc").onSnapshot((snapshot)=>
            setPosts(
            snapshot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data(),

        }))))
    },[])
    return (
        <div className="chats">

           <div className="chats_header">
                <Avatar src={user.profilePic} className="chats_avatar" onClick={()=>auth.signOut()}/>
             <div className="chats_search">
             <SearchIcon/>
                <input placeholder="Friends" type="text"/>
                </div>
                <ChatBubbleIcon className="chats_chatIcon"/>
            </div>

            <div className="chats_posts">
            {posts.map(({id,data:{profilePic,username,timestamp,imageUrl,read}})=>(
                <Chat key={id} id={id} username={username} timestamp={timestamp} imageUrl={imageUrl} read={read} profilePic={profilePic}/>
            )
                
                )}
            </div>
            <RadioButtonUncheckedIcon className="chats_takePicIcon" onClick={takeSnap}
            fontSize="large"/>

        </div>
    )
}
//                        <SearchIcon/>
//<ChatBubbleIcon className="chats_chatIcon"/>



export default Chats
