import React, { useState, useContext } from "react";

import AuthContent from "../components/auth/AuthContent.js";
import * as http from "../util/http.js";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/AuthContext";

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const authenticationHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await http.signupUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      console.log(error);
      alert("Wrong credentials");
    }

    setIsAuthenticating(false);
  };
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating account..." />;
  }
  return <AuthContent onAuthenticate={authenticationHandler} />;
};

export default SignupScreen;
