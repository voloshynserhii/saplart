import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import {
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
} from "@mui/material";

import Dialog from "../components/dialog";
import Iconify from "../components/iconify";
import DocumentCard from "../sections/@dashboard/products/DocumentCard";
import { state, deleteDoc } from "../store/reducers/documents";
import { updateDoc } from "../api/document";

export default function ProductPage() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { current } = useSelector(state);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);

  useEffect(() => {
    if (!current) {
      navigation("/dashboard/products");
    }
  }, [current]);

  const deleteDocHandler = (id) => {
    dispatch(deleteDoc(id));
  };

  const updateDocHandler = (id) => {
    navigation(`/dashboard/product/${id}`);
  };

  const publishDocHandler = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const response = await updateDoc(current._id, { userId,isPublished: !current.isPublished });
    if (response) {
      setPublishDialogOpen(false);
      navigation("/dashboard/products");
    }
  };

  if (!current) return <></>;

  return (
    <>
      <Helmet>
        <title> Dashboard: IP | Lawyerd </title>
      </Helmet>
      {publishDialogOpen && (
        <Dialog
          title="Do you really want to publish the document?"
          description="If you agree you won't be able to make any changes in the document!"
          onAgree={publishDocHandler}
          onClose={() => setPublishDialogOpen(false)}
        />
      )}
      <Container>
        <Grid item mb={5}>
          <Grid item sm={12} mb={2}>
            <Typography variant="h4">IP Rights</Typography>
          </Grid>
          <Grid item sm={12} container>
            <Grid item md={6}>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="eva:arrow-back-outline" />}
                onClick={() => navigation("/dashboard/products")}
              >
                Back
              </Button>
            </Grid>
            <Grid item md={6} align="right">
              <Button
                sx={{ mr: 1 }}
                variant="contained"
                startIcon={<Iconify icon="ant-design:send-outlined" />}
                onClick={() => setPublishDialogOpen(true)}
              >
                {current.isPublished ? "Unpublish" : "Publish"}
              </Button>
              <Button
                sx={{ mr: 1 }}
                variant="contained"
                startIcon={
                  <Iconify icon="ant-design:safety-certificate-outlined" />
                }
              >
                Protect
              </Button>
              <Button
                variant="contained"
                startIcon={
                  <Iconify icon="ant-design:cloud-download-outlined" />
                }
              >
                Certify
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <DocumentCard doc={current} />
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Tags</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {current?.title}
                    </TableCell>
                    <TableCell align="right">
                      {current?.tags?.map((tag) => (
                        <span key={tag}>{tag}|</span>
                      ))}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {current?.description}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Grid item mt={5}>
          <Grid item md={12} align="right">
            <Button
              disabled={current.isPublished}
              sx={{ mr: 1 }}
              variant="outlined"
              startIcon={<Iconify icon="ant-design:delete-fill" />}
              onClick={() => deleteDocHandler(current._id)}
            >
              Delete
            </Button>
            <Button
              disabled={current.isPublished}
              sx={{ mr: 1 }}
              variant="contained"
              startIcon={<Iconify icon="ant-design:send-outlined" />}
              onClick={() => updateDocHandler(current._id)}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
