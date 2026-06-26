import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'


const Login = () => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const {handleLogin, loading} = useAuth()
    const nevigator = useNavigate()

    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }

    const handleSubmitButt = (e)=>{
        e.preventDefault()

        handleLogin(userName, password)
        .then(res=>{
            console.log(res)
            nevigator('/')
        })
    }
    

  return (
    <>
    <nav-bar>
        <h2 onClick={()=>{nevigator('/')}}>Insta</h2>
        <button onClick={()=>{nevigator('/')}}> Back </button>
    </nav-bar>
    <main>
        <h1>Login</h1>
        <form onSubmit={handleSubmitButt}>
            <input type="text" name="userName" onInput={(e)=>{setUserName(e.target.value)}} placeholder='User Name'/>
            <input type="password" name='password' onInput={(e)=>{setPassword(e.target.value)}} placeholder='Password'/>
            <button>Login</button>
        </form>
        <p>Don't have Account <Link className='authTogel' to='/register'>Register</Link></p>
    </main>
      
    </>
  )
}

export default Login
