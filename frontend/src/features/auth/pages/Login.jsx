import React from 'react'
import { Link } from 'react-router'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmitButt = (e)=>{
        e.preventDefault()

        axios.post('http://localhost:3000/api/auth/login',{
            userName,
            password
        },{
            withCredentials:true
        })
        .then(res => {
            console.log(res.data)
        })
    }
    

  return (
    <>
    <main>
        <h1>Login</h1>
        <form onSubmit={handleSubmitButt}>
            <input type="text" name="userName" onInput={(e)=>{setUserName(e.target.value)}}/>
            <input type="password" name='password' onInput={(e)=>{setPassword(e.target.value)}}/>
            <button>Login</button>
        </form>
        <p>Don't have Account <Link className='authTogel' to='/register'>Register</Link></p>
    </main>
      
    </>
  )
}

export default Login
