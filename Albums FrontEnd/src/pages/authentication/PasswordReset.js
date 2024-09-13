import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import

import AuthWrapper from './AuthWrapper';
import AuthPasswordReset from './auth-forms/AuthPasswordReset';


// ================================|| REGISTER ||================================ //

const PasswordResetRequest = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Password Reset</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthPasswordReset />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default PasswordResetRequest;
