import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <div class="bar">
            <h5 class="name">Raghav</h5>
            <nav>
                <ul>
                    <li><a href="/l">HOME</a></li>
                    <li><a href="/l">PROJECTS</a></li>
                    <li><a href="/l">CONTACT</a></li>
                   
                </ul>
            </nav>
        </div>
  );
};

export default NavBar;