import MapComponent from './ViewMap'; // Adjust path if needed
import Message from './test.tsx';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { ImageOverlay } from 'leaflet';
import { render } from 'react-dom';
import "leaflet/dist/leaflet.css";
import './styles.css'
import KakiUrl from '../icons/poop.png';

// function handleClick() {
//   alert('You clicked the button!');
//   // rotateImage(imageOverlay.getElement(), 45);
// }

// function rotateImage(this: any, img: any, angle: number) {
//   img.style.transform = `${this.originalTransformValue} rotateZ(${angle}deg)`;
// }


function App() {
  const custumIcon = new ImageOverlay(KakiUrl, [
    [40.712, -74.227],
    [40.774, -74.125]
  ]);

  return (
    <MapComponent/>
    // <>
    // <h1>Hello, world!</h1>
    // <button onClick={handleClick}>Spin The Poo!</button>
    // {/* <MapComponent/> */}
    // <MapContainer center={[31.5, 34.75]} zoom={13}>
    //  <TileLayer
    //     url="http://localhost:8080/tile/{z}/{x}/{y}.png"
    //  />
    
    // {/* <ImageOverlay
    //         bounds={[[40.71222,-74.22655], [40.77394,-74.12544]]}
    //         attribution='&amp;copy <a href="https://github.com/pubg/api-assets">pubg/api-assets</a> contributors'
    //         url={"https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"}
    //       /> */}


    //  {/* {marker.map(marker => (
    //     <Marker position={marker.geocode} icon={custumIcon}>
    //     </Marker>
    //  )) */}

     
    // </MapContainer>
    // </>
    );
}

export default App;