import axios from "axios";
import { url } from "../../utils/consts";

const getTags = async () => {
  try {
    const response = await axios.get(`${url}/tags`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    return err.response.data;
  }
};
export default getTags;
