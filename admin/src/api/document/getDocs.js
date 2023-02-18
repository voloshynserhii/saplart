import axios from "axios";
import { url } from "../../utils/consts";

const getDocs = async () => {
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  try {
    if (userId) {
      const response = await axios.get(`${url}/feed/docs`, {
        params: {
          userId,
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    }
  } catch (err) {
    return err.response.data;
  }
};
export default getDocs;
