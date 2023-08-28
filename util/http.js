import axios from "axios";

const API_KEY = "AIzaSyCIYFJbhYyG1C6jpvpxARx59Jzus5mMsr4";

const authenticate = async (mode, email, password) => {
  const resp = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=` + API_KEY,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  return resp.data;
};

export const signupUser = (email, password) => {
  return authenticate("signUp", email, password);
};

export const signinUser = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};
