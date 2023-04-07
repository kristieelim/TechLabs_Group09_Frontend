import { useState, useEffect } from "react" 
import { Link, useNavigate, useMatch, useResolvedPath } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import jwt_decode from "jwt-decode";
//import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import icon from '../images/Tafel_Deutschland_logo.png'
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
  const [isDriver, setIsDriver] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const history = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
      setIsDriver(decoded && decoded.type === "DRIVER");
      setIsEmployee(decoded && decoded.type === "EMPLOYEE");
      setIsAdmin(decoded && decoded.type === "ADMIN");
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsDriver(false);
    setIsEmployee(false);
    setIsAdmin(false);
    history.push("/Login");
  };

  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
      {/* <nav className="navbar"> */}
      <img src={icon} className="nav--icon" />
      <h3 className="tafel">Tafel Route</h3>

      <OldSchoolMenuLink to="/">
        <IconButton>
          <HomeIcon fontSize="medium" variant="outlined" />
        </IconButton>
      </OldSchoolMenuLink>
      {!user && (
        <OldSchoolMenuLink to="/Login">
          <Button variant="outlined" size="small">
            Sign in
          </Button>
        </OldSchoolMenuLink>
      )}
      {!user && (
        <OldSchoolMenuLink to="/Register">
          <Button variant="outlined" size="small">
            Sign up
          </Button>
        </OldSchoolMenuLink>
      )}

      {/* With Authorization */}
      {isEmployee && (
        <CustomLink to="/StorePage">
          <Button variant="outlined" size="small">
            Store Page
          </Button>
        </CustomLink>
      )}
      {isDriver && (
        <CustomLink to="/DriverPage">
          <Button variant="outlined" size="small">
            {" "}
            Driver Page{" "}
          </Button>
        </CustomLink>
      )}

      {/*
      {isAdmin && (
        <OldSchoolMenuLink to="/AdminPage_Stores">
          <Button variant="outlined" size="small">
            Stores
          </Button>
        </OldSchoolMenuLink>
      )}
      {isAdmin && (
        <OldSchoolMenuLink to="/AdminPage_Drivers">
          <Button variant="outlined" size="small">
            Drivers
          </Button>
        </OldSchoolMenuLink>
      )}
      */}

      {/* Without Authorization 
        <OldSchoolMenuLink to="/StorePage">Store Page</OldSchoolMenuLink>
        <OldSchoolMenuLink to="/DriverPage">Driver Page</OldSchoolMenuLink>
        */}
      <OldSchoolMenuLink to="/AdminPage_Stores">Stores</OldSchoolMenuLink>
      <OldSchoolMenuLink to="/AdminPage_Drivers">Drivers</OldSchoolMenuLink>

      {user && (
        <OldSchoolMenuLink to="/Logout" onClick={handleLogout}>
          <IconButton>
            <LogoutIcon fontSize="medium" variant="outlined" />
          </IconButton>
        </OldSchoolMenuLink>
      )}
    </Toolbar>
  );
}


function OldSchoolMenuLink({ children, to }) {
    const location = useLocation();
    const match = location.pathname === to;
  
    return (
      <li className={match ? "active" : ""} y
      style={{listStyle: "none"}}>
        {match ? " " : ""}
        <Link to={to}>{children}</Link>
      </li>
    );
  }


function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""} style={{listStyle: "none"}}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
