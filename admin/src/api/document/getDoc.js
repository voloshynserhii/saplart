import axios from "axios";
import { url } from "../../utils/consts";

const getDoc = async (id) => {
  try {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    
    const response = await axios.get(`${url}/feed/doc/${id}`, {
      params: {
        userId,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    return err.response.data;
  }
};
export default getDoc;
