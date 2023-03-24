import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import 'leaflet/dist/leaflet.css'
import { AuthProvider } from './components/context/AuthProvider';
import { ChakraProvider, theme } from '@chakra-ui/react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from '@mui/material/styles';

const theme1 = createTheme();



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider theme={theme}>
        <Router>
          <App />
        </Router>
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
