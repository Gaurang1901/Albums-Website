import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { fetchPostPasswordResetRequest } from 'client/client';

const AuthPasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: '' });
  const [loginError, setLoginError] = useState('');

  const validateEmail = () => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClick = async () => {
    // Reset previous errors
    setErrors({ email: '', password: '' });

    // Validation
    if (!validateEmail()) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
      return;
    }
    fetchPostPasswordResetRequest(`/auth/reset-password-request?email=${email}`)
      .then((res) => {
        console.log(res);
        setLoginError('');
        window.alert('Password Reset Link is sent');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <Button style={{ marginTop: '15px' }} variant="contained" color="primary" fullWidth onClick={handleClick}>
        Send Reset Password Link
      </Button>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </Container>
  );
};

export default AuthPasswordResetRequest;
