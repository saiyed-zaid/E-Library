export const GET = (data) => {
  return {
    type: "GETBOOKS",
    payload: data,
  };
};

export const INSERT = () => {
  return {
    type: "INSERT",
  };
};

export const UPDATE = () => {
  return {
    type: "UPDATE",
  };
};

export const DELETE = () => {
  return {
    type: "DELETE",
  };
};

export const LOADING = () => {
  return {
    type: "LOADING",
  };
};

export const SUCCESS = () => {
  return {
    type: "SUCCESS",
  };
};

export const FAILURE = () => {
  return {
    type: "FAILURE",
  };
};
