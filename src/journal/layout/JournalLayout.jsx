import { Box } from "@mui/material";

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ displaxy: "flex" }}>
      {/* Navbar */}

      {/* Sidebar */}
      <Box component="main" sx={{ flexFlow: 1, p: 3 }}>
        { children }
      </Box>

      {/* Toolbar */}
    </Box>
  );
};
