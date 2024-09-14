// import React from 'react'

import Header from "../components/Header";
import SignUpSignin from "../components/SignupSignin";

function signup() {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <SignUpSignin />
      </div>
    </div>
  );
}

export default signup;
