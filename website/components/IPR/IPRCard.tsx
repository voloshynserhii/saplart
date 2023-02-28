import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
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
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { _id, title, description, path, publishedAt } = item;

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
  const date = moment(new Date(publishedAt), "MM/DD/YYYY").format("D MMMM Y");

  return (
    <Card sx={{ width: "100%", my: 4 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={title}
        subheader={publishedAt ? date : ""}
      />
      <CardMedia
        component="img"
        height="250px"
        image={`${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description.length > 40
            ? `${description.slice(0, 40)}...`
            : description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {user && (
          <IconButton
            aria-label="add to favorites"
            onClick={handleAddToFavorites}
          >
            <FavoriteIcon color={favorite ? "error" : "action"} />
          </IconButton>
        )}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
        </CardContent>
      </Collapse>
    </Card>
  );
}
