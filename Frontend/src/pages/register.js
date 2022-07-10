import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactComponent as Logo } from "../images/knifefork.svg";

import { useState } from "react";

const theme = createTheme();

export default function Register(props) {
  const navigate = useNavigate();
  const submitLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var axios = require("axios");
    var fetchData = JSON.stringify({
      username: data.get("email"),
      name: data.get("name"),
      password: data.get("password"),
    });

    var config = {
      method: "post",
      url: "http://localhost:3001/api/persons",
      headers: {
        "Content-Type": "application/json",
      },
      data: fetchData,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setUsername("");
        setName("");
        setPassword("");
        navigate("/signin");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo className="stroke-blue-400 w-[10rem] -mt-10" />
          <h1 className="Logo mb-10 mt-2 font-bold text-6xl text-blue-400">feed</h1>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={submitLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={name}
              type="text"
              onChange={({ target }) => setName(target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={username}
              type="text"
              onChange={({ target }) => setUsername(target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  className="hover:text-blue-400"
                  to="/register"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  className="hover:text-blue-400"
                  to="/signin"
                  variant="body2"
                >
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
