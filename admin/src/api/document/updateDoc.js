import axios from "axios";
import { url } from "../../utils/consts";

const headers = {
  Authorization: "Bearer " + localStorage.getItem("token")
};

const updateDoc = async (id, query) => {
  try {
    const response = await axios.put(`${url}/feed/doc/${id}`, query, {
      headers,
    });
    console.log("UPDATE DOC", response);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    return err.response.data;
  }
};
export default updateDoc;
