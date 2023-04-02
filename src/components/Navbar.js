import { useState, useEffect } from "react" 
import { Link, useNavigate, useMatch, useResolvedPath } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import jwt_decode from "jwt-decode";
//import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import icon from '../images/Tafel_Deutschland_logo.png'

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
    <nav className="navbar">
      <img src={icon} className="nav--icon" />
      <h3 className="tafel">Tafel Route</h3>
      {/* <Link  className="site-title">
        Navigation
      </Link> */}

      <ul>
        <OldSchoolMenuLink to="/">Home</OldSchoolMenuLink>
        {!user && <OldSchoolMenuLink to="/Login">Sign in</OldSchoolMenuLink>}
        {!user && <OldSchoolMenuLink to="/Register">Sign up</OldSchoolMenuLink>}
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
      </ul>
    </nav>
  );
}


function OldSchoolMenuLink({ children, to }) {
    const location = useLocation();
    const match = location.pathname === to;
  
    return (
      <li className={match ? "active" : ""}>
        {match ? " " : ""}
        <Link to={to}>{children}</Link>
      </li>
    );
  }


function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
