import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Buffer } from 'buffer';
import { fetchDeleteDataWithAuth, fetchGetBlobDataWithAuth, fetchGetDataWithArrayBuffer, fetchGetDataWithAuth } from 'client/client';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '../../../../node_modules/@mui/material/index';
import { makeStyles } from '../../../../node_modules/@mui/styles/index';
import { Button } from '../../../../node_modules/@mui/material/index';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalMain: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: '90%',
    maxWidth: '90%',
    overflow: 'auto'
  },
  closeButton: {
    marginLeft: 'auto'
  }
}));

const menu = [
  { id: 'edit', label: 'Edit Details' },
  { id: 'download', label: 'Download Image' },
  { id: 'delete', label: 'Delete Image' }
];

const PhotoGrid = () => {
  const [photos, setPhotos] = useState({});
  const [albumInfo, setAlbumInfo] = useState({});
  const [currentPhotoKey, setCurrentPhotoKey] = useState(null);
  const [open, setOpen] = useState(false);
  const [PhotoContent, setPhotoContent] = useState(null);
  const [PhotoDesc, setPhotoDesc] = useState(null);
  const [DownloadLink, setDownloadLink] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const queryParams = new URLSearchParams(location.search);
  const album_id = queryParams.get('id');

  const handleOpen = () => {
    setTimeout(() => {
      setOpen(true);
    }, 250);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };
    window.addEventListener('popstate', handlePopState);

    fetchGetDataWithAuth(`/albums/${album_id}`).then((res) => {
      setAlbumInfo(res.data);
      const photoList = res.data.photos;
      photoList.forEach((photo) => {
        let thumbnail_link = photo.download_link.replace('/download-photo', '/download-thumbnail');
        fetchGetDataWithArrayBuffer(thumbnail_link).then((response) => {
          const albumPhotoId = `album_${album_id}_photo_${photo.id}`;
          const buffer = Buffer.from(response.data, 'binary').toString('base64');

          const temp = {
            album_id: album_id,
            photo_id: photo.id,
            name: photo.name,
            description: photo.desciption || '',
            content: buffer,
            download_link: photo.download_link
          };
          setPhotos((prevPhotos) => ({ ...prevPhotos, [albumPhotoId]: temp }));
        });
      });
    });
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [album_id]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);

  const handleClick = (event, key) => {
    setAnchorEl(event.currentTarget);
    setCurrentPhotoKey(key); // Store the key of the clicked photo
  };

  const handleClose = (id) => {
    const key = currentPhotoKey; // Get the key of the clicked photo

    if (id === 'edit') {
      const selectedPhoto = photos[key];
      if (selectedPhoto) {
        const { photo_id, name, description } = selectedPhoto;
        navigate(`/photo/edit?album_id=${album_id}&photo_id=${photo_id}&photo_name=${name}&photo_desc=${description}`);
        window.location.reload();
      }
    }
    if (id === 'download') {
      const selectedPhoto = photos[key];
      const { download_link } = selectedPhoto;
      fetchGetBlobDataWithAuth(download_link)
        .then((res) => {
          console.log(res);
          const disposition = res.headers.get('content-disposition');
          const match = /filename="(.*)"/.exec(disposition);
          const fileName = match ? match[1] : 'downloadFile';
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (id === 'delete') {
      const isConfirm = window.confirm('Are you Sure you want to Delete the Photo? ');
      const selectedPhoto = photos[key];
      if (isConfirm && selectedPhoto) {
        const { photo_id } = selectedPhoto;

        fetchDeleteDataWithAuth(`/albums/${album_id}/photos/${photo_id}/delete`).then((res) => {
          console.log(res);
          window.location.reload();
        });
        console.log('Item Deleted');
      } else {
        console.log('Delete Cancelled');
      }
    }

    setAnchorEl(null);
  };
  const handleDownload = (download_link) => {
    console.log(download_link);
    fetchGetBlobDataWithAuth(download_link)
      .then((response) => {
        console.log(response);
        const disposition = response.headers.get('Content-Disposition');
        const match = /filename="(.*)"/.exec(disposition);
        const filename = match ? match[1] : 'downloadedFile';
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        // Handle error
        console.error('Error downloading photo:', error);
      });
  };

  const handleView = (key1) => {
    const key = currentPhotoKey;
    const selectedPhoto = photos[key];
    if (selectedPhoto) {
      const { download_link, description } = selectedPhoto;
      fetchGetDataWithArrayBuffer(download_link).then((response) => {
        const buffer = Buffer.from(response.data, 'binary').toString('base64');
        setPhotoContent(buffer);
      });
      setDownloadLink(download_link);
      setPhotoDesc(description);
      handleOpen();
    } else {
      console.log(photos[key1]['download_link']);
      console.log(photos[key1]['description']);
      fetchGetDataWithArrayBuffer(photos[key1]['download_link']).then((response) => {
        const buffer = Buffer.from(response.data, 'binary').toString('base64');
        setPhotoContent(buffer);
      });
      setDownloadLink(photos[key1]['download_link']);
      setPhotoDesc(photos[key1]['description']);
      handleOpen();
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modal}
      >
        <div className={classes.modalMain}>
          <img src={'data:image/jpeg;base64,' + PhotoContent} alt={PhotoDesc} style={{ width: '100%', height: 'auto' }} />
          <Button onClick={() => handleDownload(DownloadLink)}> Download Photo </Button>
          <Button onClick={handleModalClose} className={classes.closeButton}>
            Close
          </Button>
        </div>
      </Modal>

      <Typography variant="h4" gutterBottom>
        {albumInfo.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {albumInfo.description}
      </Typography>
      <Grid sx={{ paddingTop: 2 }} container spacing={3}>
        {Object.keys(photos).map((key) => (
          <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardHeader
                action={
                  <IconButton
                    aria-controls={open1 ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open1 ? 'true' : undefined}
                    onClick={(event) => handleClick(event, key)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
                title={<Typography variant="h4">{photos[key]['name']}</Typography>}
              />
              <div>
                <CardMedia
                  sx={{ cursor: 'pointer' }}
                  component="img"
                  height="200"
                  image={`data:image/jpeg;base64,${photos[key]['content']}`}
                  alt={photos[key]['name']}
                  onClick={() => handleView(key)}
                />
              </div>
              <CardContent>
                <Typography variant="subtitle1">{photos[key]['description']}</Typography>
              </CardContent>
            </Card>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open1}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem onClick={handleView}>View Image</MenuItem>
              {menu.map((item) => (
                <MenuItem key={item.id} onClick={() => handleClose(item.id)}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PhotoGrid;
