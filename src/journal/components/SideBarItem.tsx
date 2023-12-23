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
import { useAppDispatch } from "../../hooks/hooks";

interface Props {
  id: string;
  title: string;
  body: string;
  isActive: boolean;
  date: number;
  imageUrls: string[];
}

export const SideBarItem = ({ id, title, body, isActive, date, imageUrls }: Props) => {
    const dispatch = useAppDispatch();
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