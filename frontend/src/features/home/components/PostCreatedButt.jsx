import React from 'react'
import { Navigate, useNavigate } from 'react-router'
import '../style/postButton.scss'

const PostCreatedButt = () => {
  const nevigate = useNavigate()

    const handleCreatePostButt = ()=>{
        nevigate('/create-post')
    }
    
  return (
    <>
      <button onClick={handleCreatePostButt}>Create Post</button>
    </>
  )
}

export default PostCreatedButt
