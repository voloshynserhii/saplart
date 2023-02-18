import { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@mui/material";
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
      {data?.length ? (
        data.map((item) => <IPRCard key={item._id} item={item} />)
      ) : (
        <div>NO DATA</div>
      )}

      {/* {data?.length ? (
        data.map(({ _id, title, description, path }) => {
          return (
            <div key={_id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="title" src={`${url}/${path}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={title}
                  secondary={
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {description}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          );
        })
      ) : (
        <>No data</>
      )} */}
    </List>
  );
};

export default IPRList;
