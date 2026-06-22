import React from 'react'
import { Link, useNavigate } from 'react-router'
import '../../common/style/form.scss'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    const {loading, handleRegister} = useAuth()
    const nevigate = useNavigate()

    if(loading){
        return(
            <main><h1>Loading...</h1></main>
        )
    }

    const handleSubmitButt = (e)=>{
        e.preventDefault()

        handleRegister(userName, email, password)
        .then(res=>{
            console.log(res)
            nevigate('/')
        })
    }

  return (
    <>
    <main>
        <h1>Register</h1>
        <form onSubmit={handleSubmitButt}>
            <input type="text" name='userName' onInput={(e)=>{setUserName(e.target.value)}} />
            <input type="text" name='email' onInput={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" name='password' onInput={(e)=>{setpassword(e.target.value)}}/>
            <button>Register</button>
        </form>
        <p>Already have a Account <Link className='authTogel' to='/login'>Login</Link></p>
    </main>
      
    </>
  )
}

export default Register
