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
import Typography from "@mui/material/Typography";
import BeepAvatar from "./BeepAvatar";

export default function CoffeeComponent({
  person: { name, coffee, id, quote },
}) {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  //   const coffeePhrases = [
  //     "Wanna grab a cuppa?",
  //     "Let's grab coffee :)",
  //     "Make your day smarter with coffee!",
  //     "Power up with coffee",
  //     "Start your day!",
  //     "Coffee is my happy place!",
  //     "Give me a break, give me a coffee",
  //     "Energy to start your day",
  //     "You deserve a coffee break every day",
  //     "Coffee breaks, coffee works!",
  //   ];

  const [iconClicked, setIconClicked] = React.useState(false);

  function handleClick() {
    setIconClicked((prevState) => !prevState);
  }

  if (coffee) {
    return (
      <div className="">
        <ListItem>
          <ListItemAvatar>
            <BeepAvatar {...stringAvatar(name)} />
          </ListItemAvatar>
          <div className="flex-col w-full">
            <ListItemText
              primary={
                <Typography
                  type="body 2"
                  style={{ fontSize: 19, fontWeight: "bold" }}
                >
                  {name}
                </Typography>
              }
            />
            <ListItemText
              // id={labelId}
              secondary={
                <Typography
                  style={{
                    fontSize: 12,
                    fontStyle: "italic",
                    color: "GrayText",
                  }}
                >
                  {quote}
                </Typography>
              }
            />
          </div>
          <FaceIcon
            className={`${
              iconClicked
                ? "text-green-500"
                : "text-gray-500 hover:text-blue-400"
            } hover:cursor-pointer ml-6`}
            onClick={handleClick}
            fontSize="large"
          />
        </ListItem>
      </div>
    );
  }
}
