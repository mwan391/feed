import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GoogleMaps from "../images/GoogleMaps.webp"; // hardcoded
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple, pink } from "@mui/material/colors";

export default function MediaCard() {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://www.qthotels.com/auckland/wp-content/uploads/sites/115/2020/10/Esther-Restaurant-QTA-1800x1120.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Restaurant
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sub text
        </Typography>
      </CardContent>
      <CardActions>
        <Button className="joinButton" variant="outlined">
          Join
        </Button>
        <div className="Avatar">
          <AvatarGroup max={4}>
            <Avatar
              sx={{ bgcolor: deepOrange[500] }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Avatar
              sx={{ bgcolor: deepPurple[500] }}
              alt="Travis Howard"
              src="/static/images/avatar/2.jpg"
            />
            <Avatar
              sx={{ bgcolor: pink[500] }}
              alt="Cindy Baker"
              src="/static/images/avatar/3.jpg"
            />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </div>
      </CardActions>
    </Card>
  );
}
