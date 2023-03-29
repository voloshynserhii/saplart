import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "100%",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
interface FiltersProps {
  rating?: string;
}

export default function FilterModal({ open, onClose, onSetFilter }) {
  const [filters, setFilters] = useState<FiltersProps>({});

  const applyFiltersHandler = () => {
    onSetFilter(filters);
  };

  const addFilterHandler = (name: string, filter: string) => {
    const existing = filters[name] || "";
    if (existing !== filter) {
      setFilters((prev) => ({ ...prev, [name]: filter }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: filter }));
    }
  };

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Choose filters
      </BootstrapDialogTitle>
      <DialogContent dividers sx={{ minWidth: 500 }}>
        <FormControl
          required
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel component="label">By Rating</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters?.rating === "4.5"}
                  onChange={(e) => addFilterHandler("rating", e.target.value)}
                  value="4.5"
                />
              }
              label="4.5+"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters?.rating === "4"}
                  onChange={(e) => addFilterHandler("rating", e.target.value)}
                  value="4"
                />
              }
              label="4+"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters?.rating === "3.5"}
                  onChange={(e) => addFilterHandler("rating", e.target.value)}
                  value="3.5"
                />
              }
              label="3.5+"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters?.rating === "3"}
                  onChange={(e) => addFilterHandler("rating", e.target.value)}
                  value="3"
                />
              }
              label="3+"
            />
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={applyFiltersHandler}>
          Apply
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
