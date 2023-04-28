import axios from "axios";

const headers = {
  // Authorization: "Bearer " + localStorage.getItem("token")
};

const updateDoc = async (id, val) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/feed/doc/${id}`, {rating: val}, {
      headers,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    return {error: err.response.data}
  }
};
export default updateDoc;
