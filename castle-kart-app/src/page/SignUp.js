import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function SignUp() {

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)

  async function registerUser(event) {
    event.preventDefault();
    const { email, password, firstName, lastName,confirmpassword } = event.target;
    console.log(confirmpassword.value)
    console.log(password.value)

    console.log(email.value, password.value, firstName.value, lastName.value,confirmpassword.value)
       if(password.value === confirmpassword.value){
        await signUp(email.value, password.value, firstName.value, lastName.value);
        navigate("/login"); 
       }
        else {
          alert('Rewrite your paswword')
        }
   
  }

  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar
          sx={{
            m: 1,
            bgcolor: "brown",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component={"h1"} variant="h5">
          Sign Up
        </Typography>
        <Box component={"form"} sx={{ mt: 3 }} onSubmit={registerUser} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                fullWidth
                required
                name="name"
                id="firstName"
                autoFocus
                label="FirstName"
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                fullWidth
                required
                name="name"
                id="lastName"
                autoFocus
                label="LastName"
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField autoComplete="email"
               fullWidth
                required
                 name="email"
                  id="email"
                   label="Email">
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                required
                name="password"
                id="password"
                label="Password"
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                required
                name="confirmpassword"
                id="confirmpassword"
                label="Confirm Password"
              ></TextField>
               <label>
              <input type="checkbox" onChange={() => setShowPassword(!showPassword)}/> {showPassword ? 'Hide Password' : 'Show Password'}
              </label>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: 'brown', "&": { ":hover": { bgcolor: 'black' } } }}>
            Register
          </Button>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Link variant="body2" to="/login" style={{ textDecoration: 'none', color: 'brown' }}>
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp
