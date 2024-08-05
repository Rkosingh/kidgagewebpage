import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const handleGuestCheckout = () => {
    navigate('/checkoutguest');
  };

  return (
    <div className="wrapper">
      <div className="checkout-container">
        <div className="image-container"></div>
        <div className="options-container">
          <button className="guest-button" onClick={handleGuestCheckout}>Checkout as guest</button>
          <p>or</p>
          <Link to="/personal-signup"><button className="account-button">Create an Account</button></Link>
          <p className="login-link">
            Already have an account? <Link to="/personal-signup"><a>Login</a></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
