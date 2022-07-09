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
import PeopleSelector from './peopleSelector';
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
	const [description, setDescription] = useState("");
	const [resturantName, setResturantName] = useState("");
	const [selectedUsers, setSelectedUsers] = useState("");
    const [personName, setPersonName] = useState([]);
	const [value, setValue] = React.useState(new Date());
	const [allUsers, setAllUsers] = useState();

	const handleChange = (newValue) => {
	  	setValue(newValue);
	};

	const handleSend = () => {
		console.log(description)
		var axios = require('axios');
		var data = JSON.stringify({
			"name": resturantName,
			"date": value,
			"people": personName,
			"description": description
		});

		var config = {
		method: 'post',
		url: 'http://localhost:3001/api/events',
		headers: { 
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlZXAiLCJpZCI6IjYyYzhjNGUxZjlhMWUwZmE1MmY2NTQwYiIsImlhdCI6MTY1NzM1OTgyOH0.H_PFQ4gXMT7X6p9C5bpNXPt8IpzHJa53UqsZTcbN0hA', 
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
		console.log(personName)
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

            <div>

				<Box
					sx={{
						width: 500,
						maxWidth: '100%',
						marginTop: "30px"
					}}
					>
					<TextField fullWidth label="Resturant Name" id="fullWidth" onChange={(event) => setResturantName(event.target.value)} />
					</Box>
					<Box
					sx={{
						width: 500,
						maxWidth: '100%',
						marginTop: "30px"
					}}
					>
						<TextField
							id="outlined-multiline-static"
							label="Description"
							fullWidth
							multiline
							onChange={(event) => setDescription(event.target.value)}
							rows={4}
						/>
				</Box>
            </div>

			<PeopleSelector personName={personName} setPersonName={setPersonName} setAllUsers={setAllUsers} />

			<Button variant="contained" sx={{width: 500,maxWidth: '100%',marginTop: "30px"}} endIcon={<SendIcon />} onClick={ () => handleSend()}>
				Send
			</Button>
          </Box>
		  
        </div>
      </Modal>
    </div>
  );
}