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
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      {/* <nav className="navbar"> */}
      <img src={icon} className="nav--icon" />
      <h3 className="tafel">Tafel Route</h3>

      <OldSchoolMenuLink to="/">
        <IconButton>
          <HomeIcon fontSize="medium" variant="outlined"/>
        </IconButton>
      </OldSchoolMenuLink>
        {!user && <OldSchoolMenuLink to="/Login">
          <Button variant="outlined" size="small">
          Sign in
          </Button>
          </OldSchoolMenuLink>}
        {!user && <OldSchoolMenuLink to="/Register">
          <Button variant="outlined" size="small">
          Sign up
          </Button>
          </OldSchoolMenuLink>}
        {isEmployee && <CustomLink to="/StorePage">Store Page</CustomLink>}
        {/* {isDriver && <CustomLink to="/DriverPage">Driver Page</CustomLink>} */}
      <CustomLink to="/DriverPage">Driver Page</CustomLink>
        {isAdmin && (
          <OldSchoolMenuLink to="/AdminPage_Stores">Stores</OldSchoolMenuLink>
        )}
        {isAdmin && (
          <OldSchoolMenuLink to="/AdminPage_Drivers">Drivers</OldSchoolMenuLink>
        )}
        {user && (
      <OldSchoolMenuLink to="/Logout" onClick={handleLogout}>
        Sign out
      </OldSchoolMenuLink>
        )}
      
      {/* </nav> */}
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
