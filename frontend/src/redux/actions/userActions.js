export const signup = () => {
  return {
    type: "LOADING",
  };
};

export const login = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const authUser = (data) => {
  return {
    type: "AUTHUSER",
    payload: data,
  };
};

export const Logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const GET = () => {
  return {
    type: "GET",
  };
};

export const success = (data) => {
  return {
    type: "SUCCESS",
    payload: data,
  };
};
