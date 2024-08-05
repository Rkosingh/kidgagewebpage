import React, { useState } from 'react';
import Button from './Button';

const AdminSignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', // Added name field
    phoneNumber: '' // Added phone number field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in submission
    console.log(formData);
  };

  return (
    <body className='form-body'>
        <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Admin's Sign-In</h2>
      <label>User Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <Button primary type="submit">Sign In</Button>
    </form>
    </body>
  );
};

export default AdminSignIn;
