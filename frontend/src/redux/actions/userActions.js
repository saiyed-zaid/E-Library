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

export const loader = () => {
  return {
    type: "LOADING",
  };
};

export const success = (data) => {
  return {
    type: "SUCCESS",
    payload: data,
  };
};

export const failure = (data) => {
  return {
    type: "FAILURE",
    payload: data,
  };
};
