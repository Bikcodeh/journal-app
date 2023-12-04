import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { setIsMenuOpen } from "../../store/menu/menuSlice";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth = 240 }) => {
  const { isOpen } = useSelector((state) => state.menu);
  const { notes, active } = useSelector((state) => state.journal);

  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch(setIsMenuOpen(!isOpen));
  };

  const DrawerContent = () => (
    <>
      <Toolbar>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {displayName}
        </Typography>
      </Toolbar>
      <Divider />

      <List>
        {notes.map((note) => (
          <SideBarItem
            key={note.id}
            {...note}
            isActive={note.id == active?.id}
          />
        ))}
      </List>
    </>
  );

  const { displayName } = useSelector((state) => state.auth);
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
};
