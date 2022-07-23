import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {     
  return (    
      <>
        <nav className="navbar">
            <div className="container-fluid justify-content-center">
                <Link className='text text-decoration-none text-white h3' to="/" > My Tutor </Link>
            </div>
        </nav>  
    </>
  )

}

export default Navbar
