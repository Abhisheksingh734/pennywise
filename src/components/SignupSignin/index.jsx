// import React from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import Input from "../Input";
import { auth } from "../../firebase";
import "./styles.css";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function signupWithEmail() {
    setLoading(true);
    console.log("name:", name);
    console.log("email:", email);
    console.log("password:", password);
    console.log("confirm password:", confirmPassword);

    //Authenticate a user or create a user with email and password
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
            toast.success("User Created!");
            setLoading(false);
            setEmail("");
            setName("");
            setPassword("");
            setConfirmPassword("");
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.success(errorCode + " " + errorMessage);
          });
      } else {
        setLoading(false);
        toast.error("Password and Confirm Password don't match!");
      }
    } else {
      setLoading(false);
      toast.error("All fields ar mandatory");
    }
  }

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>PennyWise.</span>
      </h2>
      <form action="">
        <Input
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder="John Doe"
        />
        <Input
          type="email"
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder="Johndoe@gmail.com"
        />
        <Input
          type="password"
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder="Johndoe@gmail.com"
        />
        <Input
          type="password"
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder="Johndoe@gmail.com"
        />
        <Button
          disabled={loading}
          text={loading ? "Loading..." : "Signup Using Email and Password"}
          onClick={signupWithEmail}
        />
        <p style={{ textAlign: "center", margin: 0 }}> or</p>
        <Button
          disabled={loading}
          text={loading ? "Loading..." : "Signup Using Google"}
          blue={true}
        />
      </form>
    </div>
  );
};

export default SignUpSignin;
