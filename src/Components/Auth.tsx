import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config/firebase'
import { useState } from 'react';

const Auth = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    async function signIn(){
        await createUserWithEmailAndPassword (auth, email, password);
    }
  return (
    <div>
      <input placeholder="Email..." type='email'onChange={(e)=>setEmail(e.target.value)}/>
      <input placeholder="Password..." type='password' onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={signIn}>SignIn</button>
    </div>
  )
}

export default Auth
