import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

//const RequireAuth = ({ allowedRoles })
const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return(
    auth?.email
    ? <Outlet />
    : <Navigate to="/Login" state={{ from: location }} replace />
  );
  
  /*
  return (auth?.type?.find(role => allowedRoles?.includes(role))
  ? <Outlet />
  : auth?.email 
    ? <Navigate to="/Unauthorized" state={{ from: location }} replace />
    : <Navigate to="/Login" state={{ from: location }} replace />
  );
  */
}; 

export default RequireAuth;
