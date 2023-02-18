import axios from "axios";
import { url } from "../../utils/consts";

const deleteDoc = async (id) => {
  try {
    const response = await axios.delete(`${url}/feed/doc/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    return err.response.data;
  }
};
export default deleteDoc;
