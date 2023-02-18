import axios from 'axios';
import { url } from "../../utils/consts";

const signup = async (query) => {
  try {
    const response = await axios.put(`${url}/auth/signup`, query);

    if (response.status === 201) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data
    }
  } catch (err) {
    return err.response.data
  }

};
export default signup;
