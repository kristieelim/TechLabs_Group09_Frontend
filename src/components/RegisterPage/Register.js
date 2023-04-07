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
import { createTheme, ThemeProvider } from "@mui/material/styles";


import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import "./Register.css";
import Select from "react-select";
import { InputLabel } from "@mui/material";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/auth/register";

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

const theme = createTheme();

const Register = () => {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const options = [
    { value: "DRIVER", label: "Driver" },
    { value: "EMPLOYEE", label: "Store Employee" },
  ];

  const [accountType, setAccountType] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    setValidMatchPwd(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [accountType, firstName, lastName, email, pwd, matchPwd]);

  const handleTypeSelect = (e) => {
    setAccountType(e.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v2 = PWD_REGEX.test(pwd);
    if (!v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          type: accountType,
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      //clear input fields

      navigate("/VerifyOTP");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
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
                  Sign up
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
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Select 
                        options={options}
                        onChange={handleTypeSelect}
                        value={options.filter(function (option) {
                          return option.value === accountType;
                        })}
                        label="Single select"
                        required
                        styles={{ menu: base => ({ ...base, zIndex: 100 }) }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField 
                        name="firstName"
                        required
                        fullWidth
                        // label={<InputLabel >First Name</InputLabel>}
                        label='First Name'
                        autoFocus
                        type="text"
                        id="firstName"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder="First Name"
                        // InputLabelProps={{
                        //   shrink: true,
                        // }} 
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label='Last Name'
                        name="lastName"
                        type="text"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Last Name"
                        // InputLabelProps={{
                        //   shrink: true,
                        // }} 
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label='Email Address'
                        name="email"
                        type="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email"
                        // InputLabelProps={{
                        //   shrink: true,
                        // }} 
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validPwd ? "valid" : "hide"}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={validPwd || !pwd ? "hide" : "invalid"}
                      />
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        placeholder="Password"
                        // InputLabelProps={{
                        //   shrink: true,
                        // }} 
                      />
                      <p
                        id="pwdnote"
                        className={
                          pwdFocus && !validPwd ? "instructions" : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <br />
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number
                        and a special character.
                        <br />
                        Allowed special characters:{" "}
                        <span aria-label="exclamation mark">!</span>{" "}
                        <span aria-label="at symbol">@</span>{" "}
                        <span aria-label="hashtag">#</span>{" "}
                        <span aria-label="dollar sign">$</span>{" "}
                        <span aria-label="percent">%</span>
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <span
                        className={validMatchPwd && matchPwd ? "valid" : "hide"}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validMatchPwd || !matchPwd ? "hide" : "invalid"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>

                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Confirm Password"
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        aria-invalid={validMatchPwd ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchPwdFocus(true)}
                        onBlur={() => setMatchPwdFocus(false)}
                        placeholder="Confirm Password"
                        // InputLabelProps={{
                        //   shrink: true,
                        // }} 
                      />

                      <p
                        id="confirmnote"
                        className={
                          matchPwdFocus && !validMatchPwd
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <br />
                        Must match the first password input field.
                      </p>
                    </Grid>
                  </Grid>
                  <Button
                    disabled={!validPwd || !validMatchPwd ? true : false}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link href="/Login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 5 }} />
            </Container>
          </ThemeProvider>
        </section>
  );
};

export default Register;
