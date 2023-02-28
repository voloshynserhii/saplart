import axios from "axios";

const addToFavorites = async (id, userId) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/feed/doc/like/${id}`, {userId});
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    return err.response;
  }
};
export default addToFavorites;