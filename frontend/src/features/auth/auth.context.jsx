import { createContext, useState, useEffect } from "react";
import {login, register, getMe} from './services/auth.api.js'

export const AuthContext = createContext()

export function AuthPovider({children}){

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [getUser, setGetUser] = useState('')

    const handleLogin = async(userName,password)=>{
        setLoading(true)
        try{
            const response = await login(userName,password)
            setUser(response.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleRegister = async(userName, email, password)=>{
        setLoading(true)

        try{
            const response = await register(userName, email, password)
            setUser(response.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    
        const handleGetMe = async()=>{
        setLoading(true)
        const response = await getMe()
        setGetUser(response)
        console.log()
        setLoading(false)
    }
    console.log(getUser)
    

    return(
        <AuthContext.Provider value={{user, loading, getUser,handleLogin, handleRegister, handleGetMe}}>
            {children}
        </AuthContext.Provider>
    )
}

