import axios from "axios";
import { url } from "../../utils/consts";

const addTag = async (tag) => {
  try {
    const response = await axios.post(`${url}/tags`, {newTag: tag});

    if (response.status === 201) {
      return response.data
    }
  } catch (err) {
    return err.response.data
  }
};
export default addTag;
