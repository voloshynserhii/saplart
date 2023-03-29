import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Autocomplete,
  Badge,
  Box,
  ButtonGroup,
  Button,
  CircularProgress,
  Chip,
  IconButton,
  List,
  Grid,
  MenuItem,
  TextField,
  Select,
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
  _id: string;
}
const IPRList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [data, setData] = useState<IPRCard[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("tag");
  const [filters, setFilters] = useState<object>({});
  const [tagData, setTagData] = useState<string[]>([]);
  const countFilters = Object.values(filters).filter((f) => !!f).length;

  useEffect(() => {
    getTagsRequest();
  }, []);

  const getTagsRequest = async () => {
    const tags = await docs.getTags();
    if (tags.length) {
      setTagData(tags.map((tag) => tag.name));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [sortBy, filters]);

  const getData = async () => {
    const props = await getServerSideProps(filters, sortBy);
    if (props) {
      setData(props?.docs);
    }
    setLoading(false);
  };

  const filterDocsHandler = (newFilters) => {
    setFilters(newFilters);
    setFilterOpen(false);
    console.log(newFilters);
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
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onSetFilter={filterDocsHandler}
      />

      <ButtonGroup
        fullWidth
        disableElevation
        variant="contained"
        aria-label="Disabled elevation buttons"
        sx={{ justifyContent: "space-between", alignItems: "center", gap: 1 }}
      >
        <div>
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterType}
              onChange={(e) => {
                setFilters({});
                setFilterType(e.target.value);
              }}
            >
              <MenuItem value="tag">By Tag</MenuItem>
              <MenuItem value="text">By Text</MenuItem>
            </Select>
            <Autocomplete
              size="small"
              options={filterType === "tag" ? tagData : []}
              freeSolo
              onChange={(event, newValue) =>
                setFilters((prev) => ({ ...prev, [filterType]: newValue }))
              }
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`Search by ${filterType}`}
                  placeholder="Start printing or select value"
                />
              )}
              sx={{ width: 250, borderRadius: "0px" }}
            />
          </ButtonGroup>

          <IconButton
            onClick={() => {
              setFilterOpen(true);
              setFilters({});
            }}
            sx={{
              padding: 0,
              width: 44,
              height: 44,
            }}
          >
            <Badge badgeContent={countFilters} color="secondary">
              <FilterAltIcon />
            </Badge>
          </IconButton>
        </div>
        <TextField
          id="outlined-select"
          select
          label="Sort By"
          value={sortBy}
          size="small"
          margin="dense"
          sx={{ width: "20%", minWidth: "100px" }}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
