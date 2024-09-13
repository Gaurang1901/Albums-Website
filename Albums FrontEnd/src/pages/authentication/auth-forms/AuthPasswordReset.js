import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { fetchPostData } from 'client/client';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../../../../node_modules/react-router-dom/dist/index';

const AuthPasswordReset = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ password: '' });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const validatePassword = () => {
    // Basic password length validation
    return password.length >= 6 && password.length <= 15 && password === confirmPassword;
  };

  const handleClick = async () => {
    // Reset previous errors
    setErrors({ password: '' });

    if (!validatePassword()) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 6 characters and both must match' }));
      return;
    }
    // Add your login logic here
    fetchPostData('/auth/reset-password', { token, password })
      .then((response) => {
        console.log(response);
        navigate('/login');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Login error:', error);
        // Handle other login errors
        setLoginError('An error occurred during login');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="confirmedPassword"
        fullWidth
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button style={{ marginTop: '15px' }} variant="contained" color="primary" fullWidth onClick={handleClick}>
        Update Password
      </Button>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </Container>
  );
};

export default AuthPasswordReset;
