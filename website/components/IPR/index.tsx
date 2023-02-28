import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { List, Grid } from "@mui/material";
import IPRCard from "./IPRCard";
import { state } from "../../store/reducers/auth";

async function getServerSideProps() {
  console.log(process.env.SERVER_URL)
  const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/feed/docs`, {
    params: {
      isPublished: true,
    },
  });
  return { response };
}

const IPRList = () => {
  const { user } = useSelector(state);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const props = await getServerSideProps();
    if (props) {
      setData(props.response?.data?.docs);
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={3}>
        {data?.length ? (
          data.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item._id}>
              <IPRCard item={item} user={user} />
            </Grid>
          ))
        ) : (
          <div>NO DATA</div>
        )}
      </Grid>
    </List>
  );
};

export default IPRList;
