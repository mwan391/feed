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
import peopleService from "../services/persons";
import CoffeeComponent from "./CoffeeComponent";

export default function CoffeeListItem() {
  const [iconClicked, setIconClicked] = React.useState(false);
  const [allPeople, setAllPeople] = React.useState([]);

  React.useEffect(
    () => async () => {
      const allPersons = await peopleService.getAll();
      setAllPeople(allPersons);
    },
    []
  );

  function handleClick() {
    setIconClicked((prevState) => !prevState);
  }

  const coffeePhrases = [
    "Wanna grab a cuppa?",
    "Let's grab coffee :)",
    "Make your day smarter with coffee!",
    "Power up with coffee",
    "Start your day!",
    "Coffee is my happy place!",
    "Give me a break, give me a coffee",
    "Energy to start your day",
    "You deserve a coffee break every day",
    "Coffee breaks, coffee works!",
  ];

  return (
    <div className="py-2">
      {allPeople?.map((person) => (
        <CoffeeComponent person={person} key={person.id} />
      ))}
      {/* <ListItemAvatar>
          <Avatar
            alt={`Avatar n°${value + 1}`}
            src={`/static/images/avatar/${value + 1}.jpg`}
          />
        </ListItemAvatar>
        <div className="flex-col w-full">
          <ListItemText
            id={labelId}
            primary={
              <Typography
                type="body 2"
                style={{ fontSize: 19, fontWeight: "bold" }}
              >
                Name
              </Typography>
            }
          />
          <ListItemText
            id={labelId}
            secondary={
              <Typography style={{ fontSize: 12, fontStyle: "italic", color: "GrayText" }}>
                {coffeePhrases[
                    Math.trunc(Math.random() * coffeePhrases.length)
                  ]
                }
              </Typography>
            }
          />
        </div>
        <FaceIcon
          className={`${
            iconClicked ? "text-green-500" : "text-gray-500 hover:text-blue-400"
          } hover:cursor-pointer ml-6`}
          onClick={handleClick}
          fontSize="large"
        /> */}
    </div>
  );
}
