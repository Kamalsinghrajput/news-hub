import React, { useState } from "react";
import SignUp from "../Authentication/sign_up/SignUp";
import SignIn from "../Authentication/sign_in/SignIn";

export const Register = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      {isSignUp ? (
        <SignIn setIsSignUp={setIsSignUp} />
      ) : (
        <SignUp setIsSignUp={setIsSignUp} />
      )}
    </div>
  );
};
