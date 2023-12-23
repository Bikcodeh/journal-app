import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Divider,
  Grid,
  Drawer,
  List,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { ArrowBack, Comment } from "@mui/icons-material";
import { setIsMenuOpen } from "../../store/menu/menuSlice";
import { SideBarItem } from "./SideBarItem";
import { useAppSelector } from "../../hooks/hooks";

interface Props {
  drawerWidth: number;
}

export const SideBar = React.memo(({ drawerWidth = 240 }: Props) => {
  const { isOpen } = useAppSelector((state) => state.menu);
  const { notes, active } = useAppSelector(
    (state) => state.journal,
    (prevState, nextState) =>
      prevState.notes === nextState.notes &&
      prevState.active === nextState.active
  );

  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch(setIsMenuOpen(!isOpen));
  };

  const DrawerContent = () => (
    <>
      <Toolbar>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ mr: 1, display: { xs: "block", sm: "none" } }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {displayName}
        </Typography>
      </Toolbar>
      <Divider />
      {notes.length > 0 ? (
        <List>
          {notes.map((note) => {
            return (
              <SideBarItem
                key={note.id}
                {...note}
                isActive={active?.id == note.id}
              />
            );
          })}
        </List>
      ) : (
        <Grid
          container
          justifyContent="center"
          height="100%"
          direction="column"
          alignItems="center"
        >
          <Comment />
          <Typography>Your notes will appear here</Typography>
        </Grid>
      )}
    </>
  );

  const { displayName } = useAppSelector((state) => state.auth);
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <DrawerContent />
      </Drawer>
      <Drawer
        variant="permanent" // temporary
        open
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <DrawerContent />
      </Drawer>
    </Box>
  );
});
