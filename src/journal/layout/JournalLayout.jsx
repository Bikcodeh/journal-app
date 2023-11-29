import { Box } from "@mui/material";
import { NavBar } from "../components/NavBar";

const drawerWidth = 240

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ displaxy: "flex" }}>
      <NavBar  drawerWidth={drawerWidth}/>

      {/* Sidebar */}
      <Box component="main" sx={{ flexFlow: 1, p: 3 }}>
        { children }
      </Box>

      {/* Toolbar */}
    </Box>
  );
};
