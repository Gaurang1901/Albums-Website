import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { fetchDeleteDataWithAuth } from 'client/client';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';

const Header = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate()
  const id = queryParams.get('id');
  const handleDelete = () => {
    const isConfirm = window.confirm('Are you Sure you want to Delete the Photo? ');

    if (isConfirm) {
      fetchDeleteDataWithAuth(`/albums/${id}/delete`).then((res) => {
        console.log(res);
      });
      navigate('/');
      window.location.reload();
      console.log('Item Deleted');
    } else {
      console.log('Delete Cancelled');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Photo Gallery
        </Typography>

        <Button
          component={Link}
          to={`/album/edit?id=${id}`}
          color="inherit"
          variant="contained"
          sx={{ mr: 2, backgroundColor: '#799edc', '&:hover': { backgroundColor: '#2f6ad0' } }}
        >
          Edit Album
        </Button>

        <Button
          component={Link}
          to={`/album/upload?id=${id}`}
          color="inherit"
          variant="contained"
          sx={{ mr: 2, backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#388E3C' } }}
        >
          Upload Photos
        </Button>
        <Button
          onClick={handleDelete}
          color="inherit"
          variant="contained"
          sx={{ backgroundColor: '#F44336', '&:hover': { backgroundColor: '#D32F2F' } }}
        >
          Delete Album
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
