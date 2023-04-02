import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div>
      <h1>You have been logged out.</h1>
      <a href="/">{"Home"}</a>
    </div>
  );
};

export default Logout;
