// import React from 'react'
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import userDefault from "../../assets/user.svg";

const Header = () => {
  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logged out Successfully");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);

          // An error happened.
        });
    } catch (e) {
      toast.error(e.message);
    }
  }

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className="navbar">
      <p className="logo">PennyWise</p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            style={{ borderRadius: "50%", height: "1.5rem", width: "1.5rem" }}
            src={user.photoURL ? user.photoURL : userDefault}
            alt=""
          />
          <p className="logo link" onClick={logoutFnc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
