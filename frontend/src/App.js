import React,{useEffect, useState} from 'react';
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Room,Star} from "@material-ui/icons";
import "./app.css";
import axios from "axios";
import {fomrat, format} from "timeago.js";

function App() {
  const currentUser="josip";
  const [pins,setPins]=useState([]);
  const [currentPlaceId,setCurrentPlaceId]=useState(null);
  const [viewport, setViewport] = useState({
    latitude:46,
    longitude: 17,
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
  },[])

const handleMarkerClick=(id)=>{
  setCurrentPlaceId(id)
}



  return (
  <div>
  <ReactMapGL
    initialViewState={viewport}
    style={{width: '100vw', height: '100vh'}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    onViewportChange={nextViewport=>setViewport(nextViewport)}
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
    onClick={()=>handleMarkerClick(p._id)}
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
)
}
</>

))}

    </ReactMapGL>
  </div>
  );
}

export default App;



/*{
    "username":"stipe",
    "title":"split",
    "desc":"lipo sam se proveo",
    "rating":5,
    "lat":123,
    "long":123
} */

