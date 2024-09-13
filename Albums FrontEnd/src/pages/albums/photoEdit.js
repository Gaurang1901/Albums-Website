import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { fetchPutDataWithAuth } from 'client/client';
import { useNavigate, useLocation } from 'react-router-dom';

const EditPhotoForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const album_id = queryParams.get('album_id');
  const photo_id = queryParams.get('photo_id');
  const photo_name = queryParams.get('photo_name');
  const photo_desc = queryParams.get('photo_desc');

  const [formData, setFormData] = useState({
    name: photo_name || '',
    description: photo_desc || ''
  });

  const [errors, setErrors] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    const handlePopState = () => {
      window.location.reload(); // Reload the page
    };

    window.addEventListener('popstate', handlePopState);

    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
      navigate('/login');
      window.location.reload();
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { name: '', description: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const payload = {
        name: formData.name,
        description: formData.description
      };

      try {
        await fetchPutDataWithAuth(`/albums/${album_id}/photos/${photo_id}/update`, payload);
        console.log('Form submitted:', payload);
        navigate(`/album/show?id=${album_id}`);
        window.location.reload();
      } catch (error) {
        console.error('Update error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        error={!!errors.name}
        helperText={errors.name}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        error={!!errors.description}
        helperText={errors.description}
        multiline
        rows={4}
        margin="normal"
      />

      <Button style={{ marginTop: '15px' }} type="submit" variant="contained" color="primary">
        Update Photo
      </Button>
    </form>
  );
};

export default EditPhotoForm;
