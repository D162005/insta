import React from 'react'
import { Link } from 'react-router'
import '../style/form.scss'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    const handleSubmitButt = (e)=>{
        e.preventDefault()

        axios.post('http://localhost:3000/api/auth/register',{
            userName,
            email,
            password
        },{
            withCredentials:true
        })
        .then(res=>{
            console.log(res.data)
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
