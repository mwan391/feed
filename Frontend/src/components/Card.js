import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GoogleMaps from '../images/GoogleMaps.webp'; // hardcoded
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple, pink } from '@mui/material/colors';

import { UserContext } from '../utils/UserContext';

export default function MediaCard({
  currentEvent: { name, creator, date, people, description },
}) {
  const { user } = React.useContext(UserContext);

  const hasJoined =
    people.filter((person) => person.username === user.username).length > 0;

  return (
    <div className="m-4 2xl:m-10 rounded-xl shadow-lg">
      <Card sx={{ maxWidth: 345, borderRadius: '0.75rem', boxShadow: 0 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://www.qthotels.com/auckland/wp-content/uploads/sites/115/2020/10/Esther-Restaurant-QTA-1800x1120.jpg"
          alt="green iguana"
        />
        <div className="p-3">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {creator}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <button
              className={`${
                hasJoined ? 'bg-red-500' : 'bg-blue-500'
              } text-white py-2 px-3 rounded-md shadow-lg font-bold hover:bg-opacity-90`}
              variant="outlined"
            >
              {hasJoined ? 'Leave' : 'Join'}
            </button>
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
                <Avatar
                  alt="Trevor Henderson"
                  src="/static/images/avatar/5.jpg"
                />
              </AvatarGroup>
            </div>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
