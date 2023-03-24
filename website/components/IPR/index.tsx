import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Badge,
  Box,
  ButtonGroup,
  Button,
  CircularProgress,
  IconButton,
  List,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IPRCard from "./IPRCard";
import FilterModal from "../FilterModal";
import { state } from "../../store/reducers/auth";
import { docs } from "../../api";

async function getServerSideProps(filters, sortBy) {
  return await docs.getDocs(filters, sortBy);
}

const sortOptions = [
  {
    value: "asc",
    label: "Newest published",
  },
  {
    value: "desc",
    label: "Oldest published",
  },
  {
    value: "last",
    label: "Last updated",
  },
  {
    value: "oldest",
    label: "Oldest updated",
  },
  {
    value: "rating",
    label: "Best rating",
  },
  {
    value: "popular",
    label: "Most popular",
  },
];

interface IPRCard {
  _id: string
}
const IPRList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [data, setData] = useState<IPRCard[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [filters, setFilters] = useState<string[]>([]);
  
  useEffect(() => {
    getData();
  }, []);
  
  useEffect(() => {
    getData();
  }, [sortBy])

  const getData = async () => {
    const props = await getServerSideProps(filters, sortBy);
    if (props) {
      setData(props?.docs);
    }
    setLoading(false);
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "50vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <FilterModal open={filterOpen} onClose={() => setFilterOpen(false)} onSetFilter={e => console.log(e)} />
      <ButtonGroup
        fullWidth
        disableElevation
        variant="contained"
        aria-label="Disabled elevation buttons"
        sx={{ justifyContent: "space-between" }}
      >
        <TextField
          id="outlined-select"
          select
          label="Sort By"
          value={sortBy}
          variant="standard"
          size="small"
          margin="dense"
          sx={{ width: "25%" }}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <IconButton
          onClick={() => setFilterOpen(true)}
          sx={{
            padding: 0,
            width: 44,
            height: 44,
          }}
        >
          <FilterAltIcon />
        </IconButton>
      </ButtonGroup>
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
        <Grid container spacing={3}>
          {data?.length ? (
            data.map((item) => (
              <Grid item xs={12} md={6} key={item?._id}>
                <IPRCard item={item} />
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "50vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              NO DATA
            </Box>
          )}
        </Grid>
      </List>
    </>
  );
};

export default IPRList;
