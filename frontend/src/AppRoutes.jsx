import React from 'react'
import {Route, Routes, BrowserRouter} from 'react-router'
import Home from './features/home/pages/Home'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import PostCreateForm from './features/post/pages/PostCreateForm'

const AppRoutes = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/create-post' element={<PostCreateForm/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRoutes
