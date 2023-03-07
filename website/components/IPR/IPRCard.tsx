import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material/";
import { docs } from "../../api";
import { setUser } from "../../store/reducers/auth";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function IPRCard({ item, user }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { _id, title, description, path, inFavorites, publishedAt, updatedAt } =
    item;

  useEffect(() => {
    setFavorite(user?.favorites?.includes(_id));
  }, [user]);

  const handleAddToFavorites = async () => {
    const response = await docs.addToFavorites(_id, user._id);
    if (response.user) {
      dispatch(setUser(response.user));
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const date = moment(new Date(updatedAt), "MM/DD/YYYY").format("D MMMM Y");

  return (
    <Card sx={{ width: "100%", my: 1 }}>
      <CardHeader
        avatar={
          <IconButton aria-label="profile">
            <Avatar
              sx={{ bgcolor: red[500] }}
              onClick={() => alert("Open profile")}
            >
              {item.creator?.name?.slice(0, 1)}
            </Avatar>
          </IconButton>
        }
        action={
          <>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            {/* {user && (
              <IconButton
                aria-label="add to favorites"
                onClick={handleAddToFavorites}
              >
                <Badge badgeContent={inFavorites?.length || 0} color="primary">
                  <FavoriteIcon color={favorite ? "error" : "action"} />
                </Badge>
              </IconButton>
            )} */}
          </>
        }
        // title={title}
        title={
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ minHeight: "20px", cursor: "pointer" }}
            onClick={() => router.push(`/ipr/${_id}`)}
          >
            {title}
          </Typography>
        }
        subheader={date}
      />
      {/* <CardMedia
        component="img"
        height="250px"
        image={`${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`}
        alt={title}
      /> */}
      <CardContent onClick={() => alert("Show document page")}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ minHeight: "20px" }}
        >
          {description.length > 40
            ? `${description.slice(0, 40)}...`
            : description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Tooltip title="Rate it!">
              <Rating
                name="simple-controlled"
                value={5}
                precision={0.5}
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
              />
            </Tooltip>
            <Tooltip
              title={`Add to Favorites. ${inFavorites?.length} user likes it`}
            >
              <IconButton
                aria-label="add to favorites"
                onClick={handleAddToFavorites}
              >
                <Badge badgeContent={inFavorites?.length || 0} color="primary">
                  <FavoriteIcon color={favorite ? "error" : "action"} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
