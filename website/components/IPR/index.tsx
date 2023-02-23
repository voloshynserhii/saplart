import { useState, useEffect } from "react";
import axios from "axios";
import { List, Grid } from "@mui/material";
import IPRCard from "./IPRCard";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : process.env.PUBLIC_URL;

async function getServerSideProps() {
  const response = await axios.get(`${url}/feed/docs`, {
    params: {
      isPublished: true,
    },
  });
  return { response };
}

const IPRList = () => {
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
          data.map(({ _id, ...item }) => (
            <Grid item xs={12} md={6} lg={4} key={_id}>
              <IPRCard item={item} />
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
