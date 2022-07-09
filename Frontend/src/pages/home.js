import React from 'react';
import "./home.css"
import CardGrid from '../Components/CardGrid';
import { Card } from '@mui/material';
import FormPropsTextFields from '../Components/formPropsTextFields';

function Home() {
  return (
    <div>


      <div className="eventCreation"><FormPropsTextFields/></div>
      <p>Home</p>
      <CardGrid />

    </div>
  );
}

export default Home;
