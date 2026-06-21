import React from 'react'
import '../style/home.scss'

const Home = () => {
  return (
    <>
      <main>
        <div className='feed-section'>
          {Feed.map(post=>{
            return <Post/>
          })}
        </div>
      </main>
    </>
  )
}

export default Home
