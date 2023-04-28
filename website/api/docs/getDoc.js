import axios from "axios";

const getDoc = async (id) => {
  try {    
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/feed/doc/${id}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    return {error: err.response.data}
  }
};
export default getDoc;
