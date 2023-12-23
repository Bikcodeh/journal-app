import { ReactNode } from "react";
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { purpleTheme } from './purpleTheme';

interface Props {
  children: ReactNode;
}

export const AppTheme = ({ children }: Props) => {
  return (
   <ThemeProvider theme={ purpleTheme}>
        <CssBaseline />
        { children }
   </ThemeProvider>
  )
}
