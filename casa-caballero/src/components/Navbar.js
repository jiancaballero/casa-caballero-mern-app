import React from 'react'
import logo from '../assets/images/logo.png'
const Navbar = () => {

    
  return (
    <div className='Navbar'>
        <div className ='NavContainer'>
            <div className ='logo'>
                <img src={logo} alt='casa caballero logo'/>
            </div>
           <ul>
            <li>Home</li>
            <li>Accomodations</li>
            <li>Facilities & Services</li>
            <li>Special Offers</li>
            <li>Contact</li>
           </ul>
           <div className='RegistrationBtn'>
            
           </div>
        </div>
    </div>
  )
}

export default Navbar