import { useDispatch } from "react-redux";
import {
  ListItem,
  ListItemIcon,
  ListItemButton,
  Grid,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({ id, title, body, isActive, date, imageUrls }) => {
    const dispatch = useDispatch();
  const onItemClick = () => {
    dispatch(setActiveNote({ title, body, id, imageUrls, date}));
  };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={ onItemClick} selected={isActive}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={title} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
