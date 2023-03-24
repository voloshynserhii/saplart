import {useState} from "react";
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

export default function CustomizedDialogs({ open, onClose, onSetFilter }) {
  const [filter, setFilter] = useState('');
  
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Choose filters
      </BootstrapDialogTitle>
      <DialogContent dividers sx={{minWidth: 500}}>
        <FormControl
          required
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel component="legend">By Rating</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                    // checked={gilad}
                    onChange={() => setFilter('gilad')}
                  name="gilad"
                />
              }
              label="4.5+"
            />
            <FormControlLabel
              control={
                <Checkbox
                  //   checked={jason}
                  //   onChange={handleChange}
                  name="jason"
                />
              }
              label="4"
            />
            <FormControlLabel
              control={
                <Checkbox
                  //   checked={antoine}
                  //   onChange={handleChange}
                  name="antoine"
                />
              }
              label="3.5+"
            />
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onSetFilter(filter)}>
          Apply
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
