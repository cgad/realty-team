import React from 'react';
import "./Nav.scss";

const Nav = () => {
    return (
        <nav className="nav">
            <div className="nav-wrapper">
                <div className="nav-logo-container">
                    <img className="nav-logo" href="#"></img>
                </div>
                <ul className="nav-list">
                    <li className="nav-list-item">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-list-item">
                        <a className="nav-link" href="#">Search</a>
                    </li>
                    <li className="nav-list-item">
                        <a className="nav-link" href="#">Featured Listings</a>
                    </li>
                    <li className="nav-list-item">
                        <a className="nav-link" href="#">Neighborhoods</a>
                    </li>
                    <li className="nav-list-item">
                        <a className="nav-link" href="#">Testimonials</a>
                    </li>
                    <li className="nav-list-item">
                        <a className="nav-link" href="#">Blog Posts</a>
                    </li>
                    <li className="nav-list-item">
                        <a className="nav-link" href="#">Realty Team</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;