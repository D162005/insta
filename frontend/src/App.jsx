import React from 'react'
import './App.scss'
import AppRoutes from './AppRoutes'
import { AuthPovider } from './features/auth/auth.context.jsx'
import { PostProvider } from './features/post/Post.context.jsx'

const App = () => {
  return (
    <AuthPovider>
      <PostProvider>
        <AppRoutes/>
      </PostProvider>
    </AuthPovider>
  )
}

export default App
