import React,{useState} from 'react';
import ReactMapGL,{Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Room} from "@material-ui/icons";



function App() {
  const [viewport, setViewport] = useState({
    latitude:46,
    longitude: 17,
    zoom: 4,
  });

  return (
  <div>
  <ReactMapGL
    initialViewState={viewport}
    style={{width: '100vw', height: '100vh'}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    onViewportChange={nextViewport=>setViewport(nextViewport)}
  >
    <Marker latitude={48.858093} 
    longitude={2.294694}
    offsetLeft={-20}
    offsetRight={-10}
    >
      <Room style={{fontSize:viewport.zoom*10, color:"slateblue"}} />
    </Marker>
    </ReactMapGL>
  </div>
  )
}

export default App;





