import axios from "axios";

const getTags = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/tags`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    return err.response.data;
  }
};
export default getTags;