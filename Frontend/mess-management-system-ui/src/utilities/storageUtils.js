export const saveAuthToken = (token) => {
  localStorage.setItem("mess-app-auth-token", token);
};

export const fetchAuthToken = () => {
  return localStorage.getItem("mess-app-auth-token");
};

export const removeAuthToken = () => {
  localStorage.removeItem("mess-app-auth-token");
};
