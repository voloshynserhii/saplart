const logout = () => {
  localStorage.setItem("token", '');
  localStorage.setItem("user", '');
};
export default logout;
