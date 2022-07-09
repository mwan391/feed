import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import FaceIcon from "@mui/icons-material/Face";
import { deepOrange, deepPurple, pink } from "@mui/material/colors";
import CoffeeListItem from "../components/CoffeeListItem";

export default function CheckboxListSecondary() {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className="coffee-outer">
      <div
        className="coffee-inner"
        style={{ maxHeight: 500, overflow: "auto" }}
      >
        <List
          dense
          sx={{
            width: "100%",
            maxWidth: 400,
            bgcolor: "background.paper",
            borderRadius: "0.75rem",
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return <CoffeeListItem value={value} labelId={labelId} />;
          })}
        </List>
      </div>
    </div>
  );
}
