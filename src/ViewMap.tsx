import * as React from "react";
import { Component } from "react";
import * as L from 'leaflet'
import { RefObject } from 'react';
import { LatLng, LatLngBounds } from "leaflet";
import { TileLayer, ImageOverlay, MapContainer } from "react-leaflet";
import KakiUrl from '../icons/poop.png';
import { createControlComponent } from "@react-leaflet/core";


// interface CustomImageOverlay extends L.ImageOverlay {
//   leafletElement?: HTMLImageElement;
// }


export default class MapExample extends Component {
  originalTransformValue: null;
  rotateAngle: number;
  imageOverlayRef: React.RefObject<L.ImageOverlay>;
  constructor(props : any) {
    super(props);
    this.originalTransformValue = null;
    this.rotateAngle = 45;
    this.imageOverlayRef = React.createRef<L.ImageOverlay>();
    this.handleClick = this.handleClick.bind(this);
  }

 
  handleClick() {
    const imageOverlayRefCurrent = this.imageOverlayRef.current;
    if (imageOverlayRefCurrent) {
        const imageOverlay = imageOverlayRefCurrent;
        if (imageOverlay) {
            this.rotateImage(imageOverlay.getElement(), this.rotateAngle);
            this.rotateAngle += 15;
        } else {
            console.error("Leaflet element not found in image overlay ref.");
        }
    } else {
        console.error("Image overlay ref is not available.");
    }
  }

  rotateImage(image : any, angle : number) {
    // alert('in rotate Image');
    if (!this.originalTransformValue) {
      this.originalTransformValue = image.style.transform;
    }
    image.style.transformOrigin = '50% 50%';
    image.style.transform = `${this.originalTransformValue} rotateZ(${angle}deg)`;
  }

  render() {
    return (
      <>
        <h1>Hello, world!</h1>
        <button onClick={this.handleClick}>Spin The Poo!</button>
        {/* <MapComponent/> */}
        <MapContainer center={[31.5, 34.75]} zoom={13}>
        <TileLayer
            url="http://localhost:8080/tile/{z}/{x}/{y}.png"
        />
        {/* <Control position="topright" >
        <button 
          onClick={ () => this.setState({bounds: [51.3, 0.7]}) }
        >
          Reset View
        </button>
        </Control> */}
          <ImageOverlay
            ref={this.imageOverlayRef}
            bounds={[[31.5, 34.75], [31.53, 34.78]]}
            attribution='&amp;copy <a href="https://github.com/pubg/api-assets">pubg/api-assets</a> contributors'
            url={KakiUrl}
          />

          
    </MapContainer>
    </>
    );
  }
}
