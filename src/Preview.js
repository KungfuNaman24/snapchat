import React,{useEffect} from 'react'
import "./Preview.css"
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {resetCameraImage, selectCameraImage} from './features/cameraSlice'
import CloseIcon from '@material-ui/icons/Close'

import  TextFieldsIcon  from '@material-ui/icons/TextFields';
import  CropIcon  from '@material-ui/icons/Crop';
import  MusicNoteIcon  from '@material-ui/icons/Timer';
import  AttachFileIcon  from '@material-ui/icons/AttachFile';
import  NoteIcon  from '@material-ui/icons/Note';
import  CreateIcon  from '@material-ui/icons/Create';
import  TimerIcon  from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import {v4 as uuid} from "uuid";
import {db,storage} from "./firebase";
import firebase from 'firebase';
import { selectUser } from './features/appSlice';

function Preview() {


    const cameraImage=useSelector(selectCameraImage);
    const history=useHistory();
    const dispatch=useDispatch();
    const user=useSelector(selectUser)
    const closePreview=()=>{
       dispatch(resetCameraImage());
    }
    useEffect(()=>{
        if(!cameraImage){
            history.replace("/");
        }
    },[cameraImage,history]);


    const sendPost=()=>{
        //here we are storing it in storage....just the image and then getting a download url from it 
        const id=uuid();
        const uploadTask=storage.ref(`posts/${id}`).putString(cameraImage,"data_url");
        uploadTask.on("state_changed",null,(error)=>{
            console.log(error);
        },
        ()=>{ ///here we are storing it in the cloud firestore where it is stored in form of collections
            
          storage.ref('posts').child(id).getDownloadURL().then((url)=>{
              db.collection("posts").add({  //this is stored as an object
                  imageUrl:url,
                  username:user.username,
                  read:false,
                  profilePic:user.profilePic,
                  timestamp:firebase.firestore.FieldValue.serverTimestamp(),

              });
              history.replace("/chats");
          })
         
        })
    }
    return (
        <div className="preview">
            <CloseIcon className="preview_close" onClick={closePreview}/>
            <div className="preview_toolbarRight">
                <TextFieldsIcon/>
                <CreateIcon/>
                <NoteIcon/>
                <MusicNoteIcon/>
                <AttachFileIcon/>
                <CropIcon/>
                <TimerIcon/>
            </div>
            <img src={cameraImage}></img>
            <div onClick={sendPost} className="preview_footer">
            <h2>Send Now</h2>
            <SendIcon className="preview_sendIcon" fontSize="small"/>
            </div>
        </div>
    )
}

export default Preview
