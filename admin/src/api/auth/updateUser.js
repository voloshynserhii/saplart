import axios from 'axios';
import { url } from "../../utils/consts";

const updateUser = async (id, query) => {

  try {
    const response = await axios.put(`${url}/auth/update/${id}`, query);

    if (response.status === 201) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data
    }
  } catch (err) {
    return err.response
  }

};
export default updateUser;
