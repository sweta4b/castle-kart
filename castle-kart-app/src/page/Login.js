import { useTheme } from '@mui/material';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';


function Login() {

  const { signIn } = useAuth();
  const theme = useTheme();
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPassword, setGuestPassword] = useState('')

  async function login(event) {
    event.preventDefault();
    const { email, password } = event.target;

    await signIn(email.value, password.value);
  }


  async function loginAsGuest() {
    const email = "adarshbalika@gmail.com"
    const password = "adarshbalika"
    setGuestEmail(email)
    setGuestPassword(password)
    await signIn(email, password);
  }

  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundColor: 'brown',
          }}
        >
          <LockOutlinedIcon sx={{}} />
        </Avatar>
        <Typography component={"h1"} variant="h5">
          Sign In
        </Typography>
        <form onSubmit={login}
          sx={{
            width: "100%",
            mt: 1,
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            type="email"
            autoFocus
            autoComplete="off"
            placeholder={guestEmail}
          ></TextField>

          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            type="password"
            autoFocus
            autoComplete="current-password"
            placeholder={guestPassword}
          ></TextField>

          <Button type="submit" fullWidth variant="contained" color="primary" sx={{
            margin: theme.spacing(3, 0, 2), backgroundColor: 'brown', "&": {
              ":hover": {
                backgroundColor: 'black'
              }
            }
          }}>sign in</Button>
          <Button onClick={() => loginAsGuest()} type="submit" fullWidth variant="contained" color="primary" sx={{
            margin: theme.spacing(0, 0, 2), backgroundColor: 'brown', "&": {
              ":hover": {
                backgroundColor: 'black'
              }
            }
          }}>Login as guest</Button>

        </form>
        <Grid container justifyContent={"flex-end"}>
          <Grid item>
            <Link variant="body2" to="/signup" style={{ textDecoration: 'none', color: 'brown' }}>New User? Sign Up </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}



export default Login
