import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GoogleMaps from '../images/GoogleMaps.webp'; // hardcoded
import BeepAvatar from './BeepAvatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Stack from '@mui/material/Stack';

import { UserContext } from '../utils/UserContext';

export default function MediaCard({
  currentEvent,
  currentEvent: { name, creator, date, people, description, id },
}) {
  const { user } = React.useContext(UserContext);
  const dateType = new Date(date);
  const [hasJoined, setHasJoined] = React.useState(false);

  const handleClick = (id) => {
    console.log(people);
    console.log(user.name)
    let templist = people
    if(!hasJoined){
      templist.push(user.name);
    }else{
      const index = people.indexOf(name);
      templist.pop(index);
    }
    setHasJoined(!hasJoined)
    console.log(templist)
    var axios = require('axios');
    var data = JSON.stringify({
      "name": name,
      "creator": creator,
      "date": date,
      "people": templist,
      "description": description,
      "id": id
    });
    
    var config = {
      method: 'put',
      url: 'http://localhost:3001/api/events/62ca055fa7ec3b205e0c16c5',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    

  }

  React.useEffect(() => {
    setHasJoined(people.includes(user.name));
  }, [people, user]);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

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
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <div className="m-4 2xl:m-10 rounded-xl shadow-lg h-full">
      <Card sx={{ maxWidth: 345, borderRadius: '0.75rem', boxShadow: 0 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://www.qthotels.com/auckland/wp-content/uploads/sites/115/2020/10/Esther-Restaurant-QTA-1800x1120.jpg"
          alt="green iguana"
        />
        <div className="p-3 flex flex-col self-end">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              {dateType?.toDateString()}
              {", "}
              {('00' + dateType?.getHours()).slice(-2)}:
              {('00' + dateType?.getMinutes()).slice(-2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <div className="flex justify-between w-full px-2">
              <button
                className={`${
                  hasJoined ? 'bg-red-500' : 'bg-blue-500'
                } text-white py-2 px-3 rounded-md shadow-lg font-bold hover:bg-opacity-90`}
                variant="outlined"
                onClick={() => handleClick(id)}
              >
                {hasJoined ? 'Leave' : 'Join'}
              </button>
              <div>
                <AvatarGroup max={3}>
                  {people?.map((name) => (
                    <BeepAvatar {...stringAvatar(name)} />
                  ))}
                </AvatarGroup>
              </div>
            </div>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
