import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - sample page
const AlbumsPage = Loadable(lazy(() => import('pages/albums/albums')));
const AboutPage = Loadable(lazy(() => import('pages/staticPages/about')));
const AddAlbumPage = Loadable(lazy(() => import('pages/albums/albumAdd')));
const ShowAlbumPage = Loadable(lazy(() => import('pages/albums/showAlbum')));
const UploadAlbumPage = Loadable(lazy(() => import('pages/albums/albumUpload')));
const EditAlbumPage = Loadable(lazy(() => import('pages/albums/albumEdit')));
const EditPhotoPage = Loadable(lazy(() => import('pages/albums/photoEdit')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <AlbumsPage />
    },
    {
      path: '/albums/add',
      element: <AddAlbumPage />
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/album/show',
      element: <ShowAlbumPage />
    },
    {
      path: '/album/upload',
      element: <UploadAlbumPage />
    },
    {
      path: '/album/edit',
      element: <EditAlbumPage />
    },
    {
      path: '/photo/edit',
      element: <EditPhotoPage />
    }
  ]
};

export default MainRoutes;
