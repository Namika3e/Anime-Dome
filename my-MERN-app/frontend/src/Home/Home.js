import React from 'react'
import '../App.css'
import './home.css'
import Navbar from '../components/Navbar/Navbar'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
      <div className='hero'>
        <h1>For Weebs by a Weeb 🔥</h1>
        <Link to="#" className='btn'>Enter the Dome行くぞ</Link>
      </div>
    </div>
  )
}

export default Home