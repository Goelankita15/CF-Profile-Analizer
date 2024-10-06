import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink


const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <NavLink to="/" className="text-2xl font-bold">CF Profile Analyzer</NavLink>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink 
                exact
                to="/" 
                className="font-bold check" 
                activeClassName="border-b-4 border-white" 
                style={({ isActive }) => isActive ? { borderBottom: '4px solid white' } : {}}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard" 
                className="font-bold check" 
                activeClassName="border-b-4 border-white" 
                style={({ isActive }) => isActive ? { borderBottom: '4px solid white' } : {}}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/recommend" 
                className="font-bold check" 
                activeClassName="border-b-4 border-white" 
                style={({ isActive }) => isActive ? { borderBottom: '4px solid white' } : {}}
              >
                Problem-Recommender
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
