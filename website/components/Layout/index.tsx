import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import Menu from "./Menu";
import { state, setUser, logOut } from "../../store/reducers/auth";

export default function Layout({ children }) {
  const { user } = useSelector(state);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!!user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const drawerWidth = 240;
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Menu user={user} onLogout={handleLogout} />
        </Grid>
        {/* <Grid item md={2}> */}
        {/* 
                    <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                {["Home"].map(
                  (text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  )
                )}
              </List>
              <Divider />
              <List>
                {["All mail"].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
         */}
        {/* </Grid> */}
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}
