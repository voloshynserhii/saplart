import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, List, ListItemText } from "@mui/material";
import { logOut } from "../../store/reducers/auth";

import { StyledNavItem, StyledNavItemIcon } from "./styles";

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], onClick, ...props }) {
  const dispatch = useDispatch();

  return (
    <Box {...props}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <div key={item.title} onClick={() => item.title === "Logout" && dispatch(logOut())}>
            <NavItem item={item} />
          </div>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
