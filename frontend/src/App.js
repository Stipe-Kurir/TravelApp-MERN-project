import React,{useEffect, useState} from 'react';
import Map,{Marker,Popup,NavigationControl} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import {Room,Star} from "@material-ui/icons";
import "./app.css";
import axios from "axios";
import { format} from "timeago.js";

function App() {
  const currentUser="josip";
  const [pins,setPins]=useState([]);
  const [currentPlaceId,setCurrentPlaceId]=useState(null);
  const [newPlace,setNewPlace]=useState(null);
  const [viewport, setViewport] = useState({
    longitude: 17,
    latitude:46,
    zoom: 4,
  });

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
 offsetLeft={-20}
 offsetRight={-10}
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
   <Star className="star"/>
   <Star className="star"/>
   <Star className="star"/>
   <Star className="star"/>
   <Star className="star"/>
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
      <form>
      <label>Title</label>
      <input placeholder="Enter a title"></input>
      <label>Review</label>
      <textarea placeholder="Describe this place"></textarea>
      <label>Rating</label>
      <select>
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

    </Map>
  </div>
  );
}

export default App;



