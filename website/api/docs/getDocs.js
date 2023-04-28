import axios from "axios";

const getDocs = async (filters = {}, sortBy = '') => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/feed/docs`,
      {
        params: {
          isPublished: true,
          filters,
          sortBy,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    return {error: err.response.data}
  }
};
export default getDocs;
