// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Stack direction={matchDownSM ? 'column' : 'row'} justifyContent="center" spacing={2} textAlign={matchDownSM ? 'center' : 'inherit'}>
        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={matchDownSM ? 1 : 3} textAlign={matchDownSM ? 'center' : 'inherit'}>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://www.github.com/Gaurang1901"
            target="_blank"
            underline="hover"
          >
            Github
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://www.linkedin.com/in/GaurangLowalekar1901"
            underline="hover"
            target="_blank"
          >
            LinkedIn
          </Typography>
          <Typography variant="subtitle2" color="secondary" component={Link} href="/about" underline="hover">
            About
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
