// import React from 'react'
import "./styles.css";

const Header = () => {
  function logoutFnc() {
    alert("Logeed out");
  }
  return (
    <div className="navbar">
      <p className="logo">PennyWise</p>
      <p className="logo link" onClick={logoutFnc}>
        Logout
      </p>
    </div>
  );
};

export default Header;
