import React  from 'react'
import './App.css';
import Sidebar from './Sidebar'
import Login from './Login'
import Chat from "./Chat"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {useValue} from './StateProvider'

function App() {
  const [{user},dispatch]= useValue();
  return (
    
    <div className="app">
    
      {!user ?(
       
          <Login />
        
      ):(
        <div className="app-body">
          <Router>
           <Switch> 
            <Route path='/room/:roomId'>
               <Sidebar/>
               <Chat/>
               
            </Route>
            <Route path='/'>
               <Sidebar/>
               <Chat/>
            </Route>
           </Switch>  
          </Router>   
        </div> 
       )}
      
    </div>
  );
}

export default App;
