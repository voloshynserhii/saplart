import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
  Rating,
  Tooltip,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
} from "@mui/icons-material";

import FormDialog from "../../components/Dialog";
import ImageCard from "../../components/IPR/ImageCard";
import DetailsTable from "../../components/IPR/Details";
import { state, setUser } from "../../store/reducers/auth";

import { docs } from "../../api";

interface ItemProps {
  path: string;
  title: string;
  tags: string[] | [];
  description: string;
  rateCount: number;
}
const defaultItem = {
  path: "",
  title: "",
  tags: [],
  description: "",
  rateCount: 0,
};

export default function IPR() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(state);
  const [loading, setLoading] = useState<boolean>(true);
  const [item, setItem] = useState<ItemProps>(defaultItem);
  const [rating, setRating] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  let id: string;
  if (router.query?.id && typeof router.query?.id === "string")
    id = router.query.id;

  const { path, title, tags = [], description, rateCount } = item;

  useEffect(() => {
    if (id) {
      getDocData(id);
    }
  }, [id]);

  const getDocData = async (id: string) => {
    setLoading(true);
    const data = await docs.getDoc(id);
    if (data.doc) {
      setItem(data.doc);
      setRating(data.doc.rating);
    }
    setLoading(false);
    return;
  };

  const handleAddToFavorites = async () => {
    if (user) {
      const response = await docs.addToFavorites(id, user._id);
      if (response.user) {
        dispatch(setUser(response.user));
      }
    } else {
      setDialogOpen(true);
    }
  };

  const handleUpdateRating = async (val) => {
    if (user) {
      const data = await docs.updateDoc(id, val);
      if (data.doc) {
        setItem(data.doc);
        setRating(data.doc.rating);
      }
    } else {
      setDialogOpen(true);
    }
  };

  const handleSubscribe = (email: string) => {
    setDialogOpen(false);
    alert(`Updates will be sent to your email ${email}`);
  };

  return (
    <Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <FormDialog
        open={dialogOpen}
        onSubscribe={handleSubscribe}
        onClose={() => setDialogOpen(false)}
      />
      <Grid item my={10}>
        <Grid item sm={12} mb={2}>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid item sm={12} container>
          <Grid item md={9}>
            <Button
              variant="outlined"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={() => router.back()}
            >
              Back
            </Button>
          </Grid>

          <Grid item md={3}>
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
                  value={rating / rateCount}
                  precision={0.5}
                  onChange={(event, newValue) => handleUpdateRating(newValue)}
                />
              </Tooltip>
              <Tooltip title={`Add to Favorites`}>
                <IconButton
                  aria-label="add to favorites"
                  onClick={handleAddToFavorites}
                >
                  <FavoriteIcon color={true ? "error" : "action"} />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <ImageCard path={path} description={description} />
        </Grid>
        <Grid item xs={12} sm={6} md={9}>
          <DetailsTable tags={tags} description={description} />
        </Grid>
      </Grid>
    </Container>
  );
}
