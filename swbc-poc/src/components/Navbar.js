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
        <Link to="/" className="hover:underline">
          <img src={logo} alt="SWBC Logo" className="h-10" />
        </Link>
          <div className='nav-bar'>
            <button className="menu-button w-nav-button" onClick={() => setIsOpen(!isOpen)} aria-label="menu" aria-haspopup="menu" aria-expanded={isOpen}>
              <span className="hamburger-icon">&#9776;</span>
            </button>
            <div className={`nav-links ${isOpen ? "active" : ""}`}>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/upload" className="hover:underline">Upload</Link>
            </div>
            <Link to="/" className="hover:underline">
              <img src={search} alt="Search Button" className="h-11"/>
            </Link>
            <Link to="/login" className="hover:underline">
              <button class="button-18" role="button">Log In</button> 
            </Link>
          </div>
      </div>
    </nav>
  );
}

export default Navbar;


