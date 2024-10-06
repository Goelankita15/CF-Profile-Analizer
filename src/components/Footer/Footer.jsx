// src/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} CF Problem Analyzer. All rights reserved.</p>
        <a href="https://codeforces.com/profile/Ankita_15" className="underline">Profile</a>
        <p >Made by Ankita </p> 
      </div>
    </footer>
  );
};

export default Footer;
