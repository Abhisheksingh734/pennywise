// import React from 'react'
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

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
        <p className="logo link" onClick={logoutFnc}>
          Logout
        </p>
      )}
    </div>
  );
};

export default Header;
