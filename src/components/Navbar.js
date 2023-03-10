import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import icon from '../images/Tafel_Deutschland_logo.png'


export default function Navbar() {
  return (
    <nav className="navbar">
      <img src={icon} className="nav--icon" />
            <h3 className="nav--logo_text">Tafel Route</h3>
      <Link to="/" className="site-title">
        Navigation
      </Link>
      <ul className="navlist">
        <OldSchoolMenuLink to="/">Home</OldSchoolMenuLink>
        <OldSchoolMenuLink to="/Login">Login</OldSchoolMenuLink>
        <OldSchoolMenuLink to="/StorePage">StorePage</OldSchoolMenuLink>
        <OldSchoolMenuLink to="/DriverPage">DriverPage</OldSchoolMenuLink>
        <OldSchoolMenuLink to="/AdminPage_Stores">Page for Admins - List of Stores</OldSchoolMenuLink>
        <OldSchoolMenuLink to="/AdminPage_Drivers">Page for Admins - List of Drivers</OldSchoolMenuLink>
      </ul>
    </nav>
  )
}


function OldSchoolMenuLink({ children, to }) {
    const location = useLocation();
    const match = location.pathname === to;
  
    return (
      <div className={match ? "active" : ""}>
        {match ? "> " : ""}
        <Link to={to}>{children}</Link>
      </div>
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
