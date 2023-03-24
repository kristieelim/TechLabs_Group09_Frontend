import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MuiOtpInput } from "mui-one-time-password-input";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useState, useEffect, useRef } from "react";
import axios from "./api/axios";
const VERIFY_OTP_URL = "/api/auth/verify-otp";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://techlabs.org/location/aachen">
        Tafel Route Group 9
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function VerifyOTP() {
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const theme = createTheme();

  useEffect(() => {
    setErrMsg("");
  }, [email, otp]);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    /*
    try{
      const response = axios.post(
        VERIFY_OTP_URL,
        JSON.stringify({ email: email, otp: otp }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
      setSuccess(true);

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Incorrect OTP");
      } else {
        setErrMsg("Registration Failed");
      }
    }
    */

    axios
      .post(VERIFY_OTP_URL, JSON.stringify({ email: email, otp: otp }), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        setSuccess(true);
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 401) {
          setErrMsg("Incorrect OTP");
        } else {
          setErrMsg("Verification Failed");
        }
      });

  };

  return (
    <>
      {success ? (
        <section>
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
              ></Box>
              <Typography component="h1" variant="h5">
                Registration Successful
              </Typography>
              <Grid container>
                <Grid item>
                  <Link href="/Login" variant="body2">
                    Sign in
                  </Link>
                </Grid>
              </Grid>
            </Container>
          </ThemeProvider>
        </section>
      ) : (
        <section>
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
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Verify OTP
                </Typography>

                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <MuiOtpInput length={6} value={otp} onChange={handleChange} />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Verify
                  </Button>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider>
        </section>
      )}
    </>
  );
}
