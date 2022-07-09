import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import SendIcon from '@mui/icons-material/Send';
import { stepConnectorClasses } from '@mui/material';
import { useState } from 'react';


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};


export default function BasicModal({open, handleOpen, handleClose}) {
	const [description, setDescription] = useState()
	const [dateTime, setDateTime] = useState();
	const [resturantName, setResturantName] = useState();
	const [value, setValue] = React.useState(new Date()); //DateTime

	const handleChange = (newValue) => {
		setValue(newValue);
	  };

	const handleSend = () => {
		var axios = require('axios');
		var data = JSON.stringify({
			"name": description,
			"date": value,
			"description": description
		});

		var config = {
		method: 'post',
		url: 'http://localhost:3001/api/events',
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
		handleClose();
	}

  	return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
    	aria-describedby="modal-modal-description"
      >
        <div className='modalWrapper'>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              	Create An Event
            </Typography>
			<div style={{ paddingTop: 30 }}>
				<LocalizationProvider dateAdapter={AdapterDateFns} >
				<DateTimePicker
					label="Date&Time picker"
					value={value}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
				</LocalizationProvider>
			</div>

            <Paper
				component="form"
				sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 435, marginTop:"20px" }}
            >
              <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Search Google Maps"
					inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <DirectionsIcon />
              </IconButton>
            </Paper>

            <div>

				<Box
					sx={{
						width: 500,
						maxWidth: '100%',
						marginTop: "30px"
					}}
					>
					<TextField 
						fullWidth label="Resturant Name" 
						id="fullWidth"  
						onChange={(event) => {setResturantName(event.target.value)}}
					/>
					</Box>
					<Box
					sx={{
						width: 500,
						maxWidth: '100%',
						marginTop: "30px"
					}}
					>
						<TextField
							id="description"
							label="Description"
							fullWidth
							multiline
							rows={4}
							onChange={(event) => {setDescription(event.target.value)}}
						/>
				</Box>
            </div>
			<Button variant="contained" sx={{width: 500,maxWidth: '100%',marginTop: "30px"}} endIcon={<SendIcon />} onClick={ () => handleSend()}>
				Send
			</Button>
          </Box>
		  
        </div>
      </Modal>
    </div>
  );
}