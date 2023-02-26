import axios from "axios";

const login = async (query) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/login`, query);

    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data
    }
  } catch (err) {
    return err.response.data
  }
};
export default login;
