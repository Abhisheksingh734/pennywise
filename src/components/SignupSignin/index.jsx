// import React from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import Input from "../Input";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./styles.css";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const SignUpSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

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
            createDoc(user);
            navigate("/dashboard");
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

  function loginUsingEmail() {
    console.log("Email", email);
    console.log("Password", password);
    setLoading(true);

    if (email != "" && password != "") {
      //signin user
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoading(false);
          // Signed in
          const user = userCredential.user;
          toast.success("user logged In!");
          console.log("User Loggeed in >>", user);

          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          setLoading(false);
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } else {
      setLoading(false);
      toast.error("All fields are Mandatory!");
    }
  }

  async function createDoc(user) {
    //mke sure doc with uid doesn't exists
    // create a doc.
    setLoading(true);

    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        // toast.success("Doc created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          console.log("user>>>", user);
          createDoc(user);
          navigate("/dashboard");
          setLoading(false);
          toast.success("User Authenticated");
        })
        .catch((error) => {
          // Handle Errors here.

          const errorMessage = error.message;
          toast.error(errorMessage);

          setLoading(false);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <>
      {loginForm ? (
        <>
          {" "}
          <div className="signup-wrapper">
            <h2 className="title">
              Login on <span style={{ color: "var(--theme)" }}>PennyWise.</span>
            </h2>
            <form action="">
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
              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Login Using Email and Password"}
                onClick={loginUsingEmail}
              />
              <p style={{ textAlign: "center", margin: 0 }}> or</p>
              <Button
                disabled={loading}
                onClick={googleAuth}
                text={loading ? "Loading..." : "Login Using Google"}
                blue={true}
              />
              <p
                className="p-login cursor-pointer"
                onClick={() => setLoginForm(!loginForm)}
              >
                {" "}
                or Don't Have An Account? Click Here
              </p>
            </form>
          </div>
        </>
      ) : (
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
              onClick={googleAuth}
              text={loading ? "Loading..." : "Signup Using Google"}
              blue={true}
            />
            <p
              className="p-login cursor-pointer"
              onClick={() => setLoginForm(!loginForm)}
            >
              {" "}
              or Have An Account Already? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpSignin;
