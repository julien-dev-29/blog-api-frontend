export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const storeUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return localStorage.getItem("user");
};

export const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.id;
};

export const isAuth = () => {
  return localStorage.getItem("token") ?? false;
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
