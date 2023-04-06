import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import { Center, Flex } from "@chakra-ui/react";
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';

const Logout = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div>
      <h1>You have been logged out.</h1>

      <Stack className="logout" spacing={2} >
      <a href="/Login"><Button variant="outlined" size="big">
          Sign in
          </Button></a>
          <a href="/">
          <IconButton>
            <HomeIcon fontSize="large" variant="outlined"/>
          </IconButton>
          </a>
          </Stack>
      

    </div>
  );
};

export default Logout;
