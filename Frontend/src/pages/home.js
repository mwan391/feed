import * as React from "react";
import ReactDOM from "react-dom/client";
import MediaCard from "../Components/tempCard";
import "./home.css"

function Home() {
	return (
        <div className="cardGrid">
            <MediaCard/>
            <MediaCard/>
            <MediaCard/>
            <MediaCard/>
        </div>
        
	);
  }

export default Home;
