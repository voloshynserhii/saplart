import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Rating,
  Tooltip,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
} from "@mui/icons-material";

import FormDialog from "../../components/Dialog";
import { state, setUser } from "../../store/reducers/auth";

import { docs } from "../../api";

export default function IPR(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(state);
  const [fallbackVisible, setFallbackVisible] = useState<boolean>(false);
  const [item, setItem] = useState({});
  const [rating, setRating] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fileFormat, setFileFormat] = useState("img");

  const { id } = router.query;

  const { path, title, tags = [], description, rateCount }: any = item;

  const defultImagePath =
    fileFormat === "pdf"
      ? "/PDF-icon.png"
      : fileFormat === "img"
      ? "/icons/defaultImage.png"
      : "/Document-icon.png";

  const onError = () => setFallbackVisible(true);

  useEffect(() => {
    if (path) {
      if (path.includes(".doc") || path.includes(".xls")) {
        setFileFormat("document");
      } else if (path.includes(".pdf")) {
        setFileFormat("pdf");
      } else if (
        path.includes(".png") ||
        path.includes(".jpg") ||
        path.includes(".svg") ||
        path.includes(".gif") ||
        path.includes(".jpeg")
      ) {
        setFileFormat("img");
      } else {
        setFileFormat("document");
      }
    }
  }, [path]);

  useEffect(() => {
    if (id) {
      getDocData(id);
    }
  }, [id]);

  const getDocData = async (id) => {
    const data = await docs.getDoc(id);
    setItem(data.doc);
    setRating(data.doc.rating);
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
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              {fallbackVisible && (
                <>
                  <CardMedia
                    sx={{
                      objectFit: "contain",
                      position: "inherit",
                      zIndex: 2,
                    }}
                    component="img"
                    height="140"
                    image={defultImagePath}
                    alt={title}
                  />
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`}
                    download
                    target="_blank"
                    underline="none"
                    sx={{ display: "block", textAlign: "center" }}
                  >
                    View
                  </Link>
                </>
              )}
              {!fallbackVisible && path && (
                <CardMedia
                  sx={{
                    zIndex: 3,
                  }}
                  component="img"
                  height="140"
                  image={`${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`}
                  onError={onError}
                  onLoad={() => setFallbackVisible(false)}
                  alt={title}
                />
              )}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={9}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Tags</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {description}
                  </TableCell>
                  <TableCell align="right">
                    {tags?.map((tag) => (
                      <span key={tag}>{tag}|</span>
                    ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
