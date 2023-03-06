import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Avatar, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Grid, Container, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  // BlogPostCard,
  BlogPostsSort,
  BlogPostsSearch,
} from "../sections/@dashboard/blog";
import {
  state,
  getHistory,
} from "../store/reducers/documents";

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

export default function NewsPage() {
  const dispatch = useDispatch();
  const { news } = useSelector(state);
  
  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);
  
  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Lawyerd </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            News
          </Typography>
        </Stack>

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <BlogPostsSearch news={news} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {news.map((event) => {

        return (
          <ListItem
            key={event._id}
            secondaryAction={
              <div>View</div>
            }
            // disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={event.creator?.name}
                  // src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={event._id} primary={event.title} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
          
          
          {/* {news?.map(event => (
            <BlogPostCard key={event._id} event={event} />
          ))} */}
        </Grid>
      </Container>
    </>
  );
}
