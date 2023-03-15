import axios from "axios";
import { url } from "../../utils/consts";

const getUser = async (id) => {
  try {
    const response = await axios.get(`${url}/auth/user/${id}`);

    if (response.status === 200) {
      return response.data
    }
  } catch (err) {
    return err.response.data
  }
};
export default getUser;