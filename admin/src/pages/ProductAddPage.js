import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CardMedia,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutocompleteTags from "../components/tags";
import Iconify from "../components/iconify";
import { state, createDoc, getDoc } from "../store/reducers/documents";
import { generateBase64FromImage } from "../utils/util/image";
import updateDoc from "../api/document/updateDoc";

import { url } from "../utils/consts";

const docData = {
  title: "",
  description: "",
  tags: [],
  file: null,
};
export default function ProductAddPage() {
  const { id } = useParams();
  const navigation = useNavigate();
  const { current } = useSelector(state);
  const dispatch = useDispatch();
  const [isDisabled, setDisabled] = useState(true);
  const [data, setData] = useState(docData);
  const [attachment, setAttachment] = useState(null);
  const [fileFormat, setFileFormat] = useState("img");
  const defultImagePath =
    fileFormat === "pdf" ? "/assets/PDF-icon.png" : "/assets/Document-icon.png";

  useEffect(() => {
    if (id && !current) {
      dispatch(getDoc(id));
    }
  }, [id, current, dispatch]);

  useEffect(() => {
    if (current) {
      setData(current);
      setAttachment(`${url}/${current.path}`);
    }
  }, [current]);

  useEffect(() => {
    if (!attachment) {
      setDisabled(true);
    } else {
      setDisabled(false);
      if (attachment?.includes("/pdf;") || attachment?.includes(".pdf")) {
        setFileFormat("pdf");
      } else if (
        (attachment?.includes("application/") &&
          !attachment?.includes("/pdf;")) ||
        attachment?.includes(".doc") ||
        attachment?.includes(".xls")
      ) {
        setFileFormat("document");
      } else if (attachment?.includes("image/")) {
        setFileFormat("img");
      } else {
        setFileFormat("document");
      }
    }
  }, [attachment]);

  const onUploadFileHandler = (e) => {
    const file = e.target.files[0];

    if (file.size > 50000000) {
      return alert("File is too big! Should be max 50MB");
    }

    setData((data) => ({ ...data, file }));

    if (file) {
      generateBase64FromImage(file)
        .then((b64) => {
          setAttachment(b64);
        })
        .catch((e) => {
          setAttachment(null);
        });
    }
    setDisabled(false);
  };

  const onSendFormHandler = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tags", data.tags);
    if (data?.file) {
      formData.append("image", data?.file);
    }
    if (data?.path) {
      formData.append("path", data.path);
    }
    formData.append("userId", userId);

    !id
      ? dispatch(createDoc(formData)).then(() =>
          navigation("/dashboard/products")
        )
      : await updateDoc(id, formData).then(() =>
          navigation("/dashboard/products")
        );
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Add Product | Lawyerd </title>
      </Helmet>

      <Container>
        <Stack mb={5}>
          <Typography variant="h4">New IP Right</Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Button
            variant="outlined"
            startIcon={<Iconify icon="eva:arrow-back-outline" />}
            onClick={() =>
              current
                ? navigation("/dashboard/product")
                : navigation("/dashboard/products")
            }
          >
            Back
          </Button>
          <Button
            variant="contained"
            startIcon={!current && <Iconify icon="eva:plus-fill" />}
            disabled={isDisabled}
            onClick={onSendFormHandler}
          >
            {current ? "Update" : "Add"}
          </Button>
        </Stack>

        <Stack
          direction="column"
          alignItems="start"
          sx={{
            mb: 5,
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Document Name"
              id="docName"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <AutocompleteTags
              data={data.tags}
              onChangeTags={(tags) => setData({ ...data, tags })}
            />
          </FormControl>
          {attachment && (
            <Box mt={2} textAlign="center">
              <div>File Preview:</div>
              {fileFormat === "img" ? (
                <CardMedia
                  sx={{
                    objectFit: "contain",
                    position: "inherit",
                    zIndex: 3,
                  }}
                  component="img"
                  image={attachment}
                  alt={data.title}
                />
              ) : (
                <CardMedia
                  sx={{
                    objectFit: "contain",
                    position: "inherit",
                    zIndex: 3,
                    height: 200,
                  }}
                  component="img"
                  image={defultImagePath}
                  alt={data.title}
                />
              )}
            </Box>
          )}
          <FormControl sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Button
              variant="contained"
              component="label"
              disabled={!data.title || !!attachment}
            >
              Upload File
              <input
                hidden
                accept="image/*,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-excel,audio/*,video/*"
                type="file"
                onChange={onUploadFileHandler}
              />
            </Button>
            <Button
              variant="outlined"
              component="label"
              disabled={!attachment}
              onClick={() => setAttachment(null)}
            >
              Clear
            </Button>
          </FormControl>
        </Stack>
      </Container>
    </>
  );
}
