import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import {RxHamburgerMenu} from 'react-icons/rx'
import {AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const [showNav, setShowNav] = useState(false)

    const handleClick = ()=> {
        setShowNav(prev => !prev)
    
    };

    let styles = showNav ? {width: '300px'} : {width:0} ;

    // console.log(navSlide)
    console.log(showNav)
    const { user } = useAuthContext();

return (
    <header>
        <nav>
            {/* <h1>AnimeDome</h1>
            { showNav ?  <AiOutlineClose className='hamburger-menu' onClick={handleClick}/>
                
                : <RxHamburgerMenu className='hamburger-menu' onClick={handleClick}/>
                }
            </nav>

            <div className='slidein' style={styles}>
                <ul className='mobile-nav-ul'>
                    <li><Link  to="/login">Log In</Link></li>
                    <li> <Link  to="/signup">Sign Up</Link></li>
                    {/* <li> <Link  to="#">Log Out</Link></li> */}
                {/* </ul>
            </div> */} 



            <h1>AnimeDome</h1>

            <div>{user.email}</div>
</nav>
    </header>
  )
}
  

export default Navbar



