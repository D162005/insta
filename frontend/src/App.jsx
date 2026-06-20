import React from 'react'
import './App.scss'
import AppRoutes from './AppRoutes'
import { AuthPovider } from './features/auth/auth.context.jsx'

const App = () => {
  return (
    <AuthPovider>
      <AppRoutes/>
    </AuthPovider>
  )
}

export default App
