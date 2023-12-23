import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";
import { ReactNode } from "react";

const drawerWidth = 240;

interface Props {
  children: ReactNode;
}

export const JournalLayout = ({ children }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}  className="animate__animated animate__fadeIn">
      <NavBar drawerWidth={drawerWidth} />

      <SideBar drawerWidth={drawerWidth} />

      <Box 
            component='main' 
            sx={{ flexGrow: 1, p: 3 }}
        >
        <Toolbar />
        { children }
      </Box>
    </Box>
  );
};
