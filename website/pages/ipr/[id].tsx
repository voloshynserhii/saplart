import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Grid,
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Favorite as FavoriteIcon } from "@mui/icons-material/";
import { CardActionArea } from "@mui/material";
import { state } from "../../store/reducers/auth";
import { docs } from "../../api";

export default function IPR(props) {
  const router = useRouter();
  const [item, setItem] = useState({});
  const { id } = router.query;

  const { path, title, tags = [], description }: any = item;

  const getDocData = async (id) => {
    const data = await docs.getDoc(id);
    setItem(data.doc);
  };

  useEffect(() => {
    if (id) {
      getDocData(id);
    }
  }, [id]);

  return (
    <Container>
      <Grid item my={10}>
        <Grid item sm={12} mb={2}>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid item sm={12} container>
          <Grid item md={9}>
            <Button
              variant="outlined"
              // startIcon={<Iconify icon="eva:arrow-back-outline" />}
              onClick={() => router.push("/")}
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
                  value={5}
                  precision={0.5}
                  // onChange={(event, newValue) => {
                  //   setValue(newValue);
                  // }}
                />
              </Tooltip>
              <Tooltip title={`Add to Favorites`}>
                <IconButton
                  aria-label="add to favorites"
                  // onClick={handleAddToFavorites}
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
              <CardMedia
                component="img"
                height="140"
                image={`${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`}
                alt="green iguana"
              />
              <CardContent>
                {/* <Typography gutterBottom variant="h5" component="div">
                  {description}
                </Typography> */}
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
