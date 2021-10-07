import React ,{useState,useEffect} from 'react'
import './sidebar.css'
import Sidebarchat from "./Sidebarchat"
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {Avatar,IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useValue} from './StateProvider'
import {actionTypes} from './reducer'
import {db} from './firebase'
import {auth} from './firebase'
function Sidebar() {
    const [rooms,setRooms]=useState([]);
    const [{user},dispatch]=useValue();
    useEffect(()=>{
       
        db.collection("room")  
            .get()
            .then((querySnapshot) => {
                setRooms(querySnapshot.docs.map((doc) => (
                   {
                         id : doc.id,
                         data : doc.data(),
                    }  
                )));
            })
            .catch((error)=> {
            console.log("Error getting documents: ", error);
            });
  
    },[rooms])
    const signout=()=>{
        if(user && window.confirm('would you really signout? ')){
            auth.signOut().then(() => {
                console.log('user signout');
                dispatch({
                    type:actionTypes.Set_User,
                    user:null,
                })
              }).catch((error) => {
                console.log('error  to signout',error);
              });
              
        }
    };
   
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                
               <Avatar src={user?.photoURL} onClick={signout}/>
               <div className='sidebar-headerright' >
                   <IconButton>
                        <DonutLargeIcon />
                   </IconButton>
                   <IconButton>
                        <ChatIcon />
                   </IconButton>
                   <IconButton>
                        <MoreVertIcon/>
                   </IconButton>
               </div>  
            </div>
            <div className="sidebar-search">
                <div className="sidebar-searchcontainer">
                 <SearchOutlinedIcon/>
                 <input placeholder="Search or start new chat" type="text"/>
                </div>
            </div>
            <div className="sidebar-chat">
                <Sidebarchat addnewchat/>
                {rooms && rooms.map((room)=>(
                   <Sidebarchat
                      key={room.id} id={room.id}
                      name={room.data.name}
                    /> 
                  
                ))
                }
                
                

            </div>
        </div>
    )
}

export default Sidebar
