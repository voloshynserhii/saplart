import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Stack, Typography } from "@mui/material";

import { ProductSort, DocumentList } from "../sections/@dashboard/products";
import Iconify from "../components/iconify";
import {
  state,
  getDocs,
  setCurrentDocument,
} from "../store/reducers/documents";

export default function ProductsPage() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { documents } = useSelector(state);

  useEffect(() => {
    dispatch(getDocs());
  }, []);

  const registerNewDocHandler = () => {
    navigation("/dashboard/product/new");
    dispatch(setCurrentDocument(null));
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Your IP's | Lawyerd </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">IP Rights</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={registerNewDocHandler}
          >
            Register new
          </Button>
        </Stack>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductSort />
          </Stack>
        </Stack>

        <DocumentList
          docs={documents}
          onDocumentClick={(doc) => {
            dispatch(setCurrentDocument(doc));
            navigation("/dashboard/product");
          }}
        />
      </Container>
    </>
  );
}
