// import React, {useState} from 'react'
// import { Link } from 'react-router-dom';

// function Navbar() {
//     const [click, setClick] = useState(false)
//     const handleClick = () => setClick(!click)
//     const closeMobileMenu = () => setClick(false)
//   return (
//     <>
//         <nav className="navbar">
//             <div className="navbar-container">
//                 <Link to="/" className="navbar-logo">
//                     SWBC
//                 </Link>
//                 <div className='menuicon'onClick={handleClick}>
//                     <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
//                 </div>
//                 <ul className={click ? 'nav-menu-active' : 'nav-menu'}>
//                     <li className='nav-item'>
//                         <Link to='/' className='nav-links' onClick={closeMobileMenu}>
//                             Home
//                         </Link>
//                     </li>
//                 </ul>
//                 <ul className={click ? 'nav-menu-active' : 'nav-menu'}>
//                     <li className='nav-item'>
//                         <Link to='/uploads' className='nav-links' onClick={closeMobileMenu}>
//                             Uploads
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     </>
//   )
// }

// export default Navbar

import { Link } from 'react-router-dom';
import logo from '../logo.png';
import './Navbar.css';
import search from '../search.png'
import { useEffect, useReducer, useState, useRef } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return() => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

  return (
    <nav className="nav-container">
      <div className="group-1">
          <img src={logo} alt="SWBC Logo" className="h-10" />
          <div className='nav-bar'>
            <button className="menu-button w-nav-button" onClick={() => setIsOpen(!isOpen)} aria-label="menu" aria-haspopup="menu" aria-expanded={isOpen}>
              <span className="hamburger-icon">&#9776;</span>
            </button>
            <div className={`nav-links ${isOpen ? "active" : ""}`}>
              <Link to="/" className="hover:underline">Dashboard</Link>
              <Link to="/upload" className="hover:underline">Upload</Link>
            </div>
            <button class="button-18" role="button">Search Repository</button>
          </div>
      </div>
      {/* <img src={logo} alt="SWBC Logo" className="h-10" />
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/upload" className="hover:underline">Upload</Link>
      </div> */}
    </nav>
  );
}

export default Navbar;

// return (
//   <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
//     <img src={logo} alt="SWBC Logo" className="h-10" />
//     <div className="space-x-4">
//       <Link to="/" className="hover:underline">Home</Link>
//       <Link to="/upload" className="hover:underline">Upload</Link>
//     </div>
//   </nav>
// );
// }

//name space SWBCDocument API.model;

