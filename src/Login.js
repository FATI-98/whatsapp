import React from 'react'
import './login.css'
import {auth , provider} from './firebase'
import {useValue}from './StateProvider'
import {actionTypes} from './reducer'
function Login() {
    const [{user},dispatch]=useValue();

    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then((result) => {
           dispatch({
            type:actionTypes.Set_User,
            user:result.user,
          });
        })
        .catch((error)=>alert (error.message)); 
    }
  
    return (
        <div className='login'>
          <div className='login-container'>
              <img
                 src='https://img.generation-nt.com/0001654473.jpg'
                 alt=''
              />
              <div className="login-text">
                  <h1>Signin to WhatsApp</h1>
              </div>
              <button type='submit'onClick={signIn}>
                  Sign In With Google
              </button>

          </div>  
            
        </div>
    )
}

export default Login
