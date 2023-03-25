import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function DefaultListItem(props) {
  return (
    <ListItem disablePadding>
        <ListItemIcon>
        <AddIcon />
        </ListItemIcon>
        <ListItemText primary={props.text} />
    </ListItem>
  )
}