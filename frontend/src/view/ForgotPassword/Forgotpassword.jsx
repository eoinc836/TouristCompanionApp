import React, { useState } from 'react';
import axios from 'axios';
import "./Forgotpassword.scss";
import { useNavigate } from "react-router-dom";

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      if (newPassword === confirmNewPassword) {
        const response = await axios.post('http://137.43.49.75/api/reset_password', {
          email,
          username,
          new_password: newPassword,
        });
        setMessage(response.data.message);
        if (response.data.message === 'Password reset successfully') {
            navigate('/login'); 
          }
      } else {
        setMessage('Username does not match confirm new password.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="resetpasswordContainer">
      
      <form className="password-reset-form" onSubmit={handleReset}>
      <h1>Password Reset</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default PasswordReset;
