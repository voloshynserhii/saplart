import axios from "axios";
import { url } from "../../utils/consts";

const headers = {
  Authorization: 'Bearer ' + localStorage.getItem('token'),
}
const createDoc = async (query) => {
  try {
    const response = await axios.post(`${url}/feed/doc`, query, {
      headers
    });

    if (response.status === 201) {
      return response.data
    }
  } catch (err) {
    return err.response.data
  }
};
export default createDoc;
