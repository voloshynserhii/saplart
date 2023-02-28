import axios from 'axios';

const signup = async (query) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`, query);

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
