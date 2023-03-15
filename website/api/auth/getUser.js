import axios from "axios";

const getUser = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/${id}`);

    if (response.status === 200) {
      return response.data
    }
  } catch (err) {
    return err.response.data
  }
};
export default getUser;
