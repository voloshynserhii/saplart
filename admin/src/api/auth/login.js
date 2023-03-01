import axios from "axios";
import { url } from "../../utils/consts";

const login = async (query) => {
  try {
    const response = await axios.post(`${url}/auth/login`, query);

    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data
    }
  } catch (err) {
    return err.response
  }
};
export default login;
