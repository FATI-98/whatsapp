import React,{useState,useEffect} from 'react'
import './sidebarchat.css'
import {Avatar} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import {db} from './firebase'
import {Link} from 'react-router-dom'

function Sidebarchat({id, name, addnewchat}) {
    const[seed,setSeed]=useState('');
    const[messages,setMessages]=useState([]);
   
    useEffect(()=>{
       if(id){ 
        db.collection('room').doc(id).collection('messages')
        .orderBy('timestamp','desc').get()
        .then((querySnapshot) => (
         setMessages(querySnapshot.docs.map((doc)=>
            doc.data()
         ))
        ))
        .catch((error)=> {
            console.log("Error getting sidebarmessages: ", error);
        })   
     }  
    },[id])
    useEffect(()=>{
          setSeed(Math.floor(Math.random()*5000));
    },[])
    const createchat=()=>{
           const roomName=prompt("Please enter name for chat");
           if(roomName){
            db.collection("room").add({
                name: roomName,
                
            }).then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
            

           }
    };
    
    const deleteroom= (e)=>{
            e.preventDefault();
            db.collection("room").doc(id).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
            
        };
  
    return !addnewchat ? (
        <Link to={`/room/${id}`} >
        <div className="sidebarchat"> 
           <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
           
           <div className="sidebarchat-info">
             
             <h3>{name}</h3>
             <p>{messages[0]?.message}</p>
           </div> 
          <span><DeleteIcon onClick={deleteroom}/></span>
        </div>
        </Link>
    ):(
        <div onClick={createchat} className="sidebarchat">
            <h2>Add New Chat</h2> 
        </div>
    )
}

export default Sidebarchat
