// import React from "react";
import Button from "../Button";
import Input from "../Input";
import "./styles.css";
import { useState } from "react";

const SignUpSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder="Johndoe@gmail.com"
        />
        <Input
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder="Johndoe@gmail.com"
        />
        <Input
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder="Johndoe@gmail.com"
        />
        <Button text={"Signup Using Email and Password"} />
        <p style={{ textAlign: "center", margin: 0 }}> or</p>
        <Button text={"Signup Using Google"} blue={true} />
      </form>
    </div>
  );
};

export default SignUpSignin;
