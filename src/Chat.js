import React ,{useState, useEffect} from 'react'
import "./chat.css"
import {Avatar,IconButton} from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom'
import {db} from './firebase.js'
import {useValue} from './StateProvider'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"

function Chat() {
    const[{user},dispatch]=useValue();
    const[input,setInput]=useState('');
    const[seed, setSeed]=useState('');
    const{roomId}=useParams();
    const [roomName,setRoomName]=useState('');
    const[messages,setMessages]=useState([]);

    useEffect(()=>{

        if(roomId){
            db.collection("room").doc(roomId)
                            .get()
                            .then((querySnapshot) => {
                               setRoomName(querySnapshot.data().name);   
                            })
                            .catch((error)=> {
                                  console.log("Error getting documents: ", error);
                            });
            db.collection('room').doc(roomId)
            .collection('messages').orderBy('timestamp','asc')
            .get()
            .then((querySnapshot) => {
                setMessages(querySnapshot.docs.map(doc =>
                    doc.data()  
                ))
            })
            .catch((error)=> {
                   console.log("Error getting messages: ", error);
            })               
       

        }
    },[roomId])
    console.log('messages',messages)
    useEffect(()=>{
      setSeed(Math.floor(Math.random() *5000));
    },[])
    const sendMessage=(e)=>{
        e.preventDefault();
        console.log('input',input);
        db.collection('room').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),

            
        }).then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing input: ", error);
        });
        
        setInput("");
    };
    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat-headerinfo">
                    <h4>{roomName}</h4>
                    <p>{user ?'online': 'last seen' && new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()} </p>
                </div>
                <div className='chat-headerright' >
                   <IconButton>
                        <SearchOutlinedIcon  />
                   </IconButton>
                   <IconButton>
                        <AttachFileOutlinedIcon />
                   </IconButton>
                   <IconButton>
                        <MoreVertIcon/>
                   </IconButton>
               </div>  

               
            </div>  
            <div className="chat-body">
                {messages.map((message)=>(
                   <p className={`chat-receiver ${message.name===user.displayName && 'chat-message'}`}> {/*(true=>message.name===user.displayName*/}
                 
                   <span className="chat-name">{message.name}</span>
                   {message.message}
                   <span className="chat-timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                   </p>
                ))}   
            </div>
            <div className="chat-footer">
                 <EmojiEmotionsOutlinedIcon/>
                 <form>
                     <input type="text" value={input} onChange={e=>setInput(e.target.value)}  placeholder="type a message"/>
                     <button onClick={sendMessage} type="submit">Send a Message</button>
                 </form>
                 <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
