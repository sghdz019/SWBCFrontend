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
import logo from '../logo.jpg';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <img src={logo} alt="SWBC Logo" className="h-10" />
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/upload" className="hover:underline">Upload</Link>
      </div>
    </nav>
  );
}

export default Navbar;