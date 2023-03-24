import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import icon from '../images/Tafel_Deutschland_logo.png'


export default function Navbar() {
  return (
    <nav className="navbar">
      <img src={icon} className="nav--icon" />
      <h3 className="tafel">Tafel Route</h3>
      {/* <Link  className="site-title">
        Navigation
      </Link> */}
      <ul>
        <OldSchoolMenuLink to="/">Home</OldSchoolMenuLink>
        <OldSchoolMenuLink to="/Login">Sign in</OldSchoolMenuLink>
        <OldSchoolMenuLink to="/Register">Sign up</OldSchoolMenuLink>
        <OldSchoolMenuLink to="/VerifyOTP">Verify</OldSchoolMenuLink>
        <OldSchoolMenuLink to="/StorePage">Store Page</OldSchoolMenuLink>
        <OldSchoolMenuLink to="/DriverPage">Driver Page</OldSchoolMenuLink>
        <OldSchoolMenuLink to="/AdminPage_Stores">
          List of Stores
        </OldSchoolMenuLink>
        <OldSchoolMenuLink to="/AdminPage_Drivers">
          List of Drivers
        </OldSchoolMenuLink>
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
