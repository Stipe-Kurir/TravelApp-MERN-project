import React,{useEffect, useState} from 'react';
import Map,{Marker,Popup,NavigationControl} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import {Room,Star} from "@material-ui/icons";
import "./app.css";
import axios from "axios";
import { format} from "timeago.js";
import Register from './components/Register';
import Login from "./components/Login";

function App() {
  const [currentUser,setCurrentUser]=useState(null);
  const [pins,setPins]=useState([]);
  const [currentPlaceId,setCurrentPlaceId]=useState(null);
  const [newPlace,setNewPlace]=useState(null);
  const [viewport, setViewport] = useState({
    longitude: 17,
    latitude:46,
    zoom: 4,
  });
  const [title,setTitle]=useState(null);
  const [desc,setDesc]=useState(null);
  const [rating,setRating]=useState(1);
  const [showRegister,setShowRegister]=useState(false);
  const[showLogin,setShowLogin]=useState(false);
  



  useEffect(()=>{
    const getPins=async ()=>{
      try{
        const res=await axios.get("/pins");
        setPins(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getPins();
  },[]);

const handleMarkerClick=(id, lat, long)=>{
  setCurrentPlaceId(id);
  setViewport({...viewport,
    latitude:lat,
    longitude: long,
  });
};


const handleAddClick=(e)=>{
  
  const kordinateLat=e.lngLat.lat;
  const kordinateLong=e.lngLat.lng;
  setNewPlace({
    lat:kordinateLat,
    long:kordinateLong,
  });

 console.log(e);
}

const handleSubmit= async (e)=>{
  e.preventDefault();
  const newPin={
    username:currentUser,
    title,
    desc,
    rating,
    lat:newPlace.lat,
    long:newPlace.long,
  }
  try{
    const res=await axios.post("/pins",newPin);
    setPins([...pins,res.data]);
    setNewPlace(null);
  }catch(err)
  {
    console.log(err);
  }
};


  return (
  <div>
  <Map
    {...viewport}
    style={{width: '100vw', height: '100vh'}}
    mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    onViewportChange={(viewport)=>setViewport(viewport)}
    onDblClick={handleAddClick}
    transitionDuration="500"
  >

{pins.map((p)=>(
<>
 <Marker latitude={p.lat} 
 longitude={p.long}
 offsetLeft={-viewport.zoom*5}
 offsetRight={-viewport.zoom*10}
 >
   <Room style={{fontSize:viewport.zoom*10, 
   color: p.username===currentUser? "tomato":"slateblue",
    cursor:"pointer",
  }}
    onClick={()=>handleMarkerClick(p._id,p.lat,p.long)}
   />
 </Marker>

{p._id === currentPlaceId && (

   <Popup   
    latitude={p.lat}
    longitude={p.long}
    closeButton={true}
    closeOnClick={false}
    anchor="left"
    onClose={()=>setCurrentPlaceId(null)}
  >
  <div className="card">
   <label> Place</label>
   <h4 className="place">{p.title}</h4>
   <label> Review</label>
   <p className="desc"> {p.desc}</p>
   <label> Rating</label>
   <div className="stars">
    {
    Array(p.rating).fill(<Star className="star"/>)
    }
   </div>
   <label> Information</label>
   <span className="username">Created by: <b>{p.username} </b></span>
   <span className="date">{format(p.createdAt)}</span>
  </div>

  </Popup>
)}
</>
))}

{newPlace && (
<Popup   
    latitude={newPlace.lat}
    longitude={newPlace.long}
    closeButton={true}
    closeOnClick={false}
    anchor="left"
    onClose={()=>setNewPlace(null)}
  >
    <div>
      <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input placeholder="Enter a title" onChange={(e)=>setTitle(e.target.value)}></input>
      <label>Review</label>
      <textarea placeholder="Describe this place" onChange={(e)=>setDesc(e.target.value)}></textarea>
      <label>Rating</label>
      <select onChange={(e)=>setRating(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
  <button className="submitButton" type="submit">ADD pin</button>
      </form>
    </div>

  </Popup>

)}
{currentUser ? ( <button className="button logout">Log out</button>):( 
  <div className="buttons">
  <button className="button login" onClick={()=>setShowLogin(true)}>Login</button>
  <button className="button register" onClick={()=>setShowRegister(true)}>Register</button>
  </div>)}
  
  {showRegister &&
  <Register setShowRegister={setShowRegister}/>
  }
  {showLogin &&
  <Login setShowLogin={setShowLogin}/>
  }
    </Map>
  </div>
  );
}

export default App;



