import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './Header.css';
import logo from './assets/images/logo.png';
import bell from './assets/images/bell.png';
import profile from './assets/images/profile.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (path, activeTab) => {
        console.log(`Navigating to: ${path}`); // Debug log
        navigate(path, { state: { activeTab } });
        setIsMenuOpen(false); // Close the menu after navigation
    };

    return (
        <header className="home-header">
            <div className="notification-bar">
                <img className='bell-icon' src={bell} alt="Notification" />
                Are you an activity provider? <a href="/learn-more">Learn how to be listed</a>
            </div>
            <div className='header-content'>
                <div className="home-logo">
                    <img src={logo} alt="KIDGAGE" onClick={() => handleNavigation('/', '')} style={{cursor: 'pointer'}} />
                </div>
                <button className="menu-toggle" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={`header-right ${isMenuOpen ? 'active' : ''}`}>
                    <nav className="home-nav-links">
                        <button onClick={() => handleNavigation("/shops", 'shops')}>SHOPS</button>
                        <button onClick={() => handleNavigation("/parents", 'parents')}>PARENTS</button>
                        <button onClick={() => handleNavigation("/providers", 'providers')}>PROVIDERS</button>
                        <button onClick={() => handleNavigation("/about", 'about')}>ABOUT</button>
                    </nav>
                    <button onClick={() => handleNavigation("/profile", 'profile')}>
                        <div className="profile-icon">
                            <img className='profile-icon' src={profile} alt="Profile" />
                        </div>
                    </button>
                    <button onClick={() => handleNavigation("/dashboard", 'dashboard')}>
                        <div className="profile-icon">
                            <p>DASHBOARD</p>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;