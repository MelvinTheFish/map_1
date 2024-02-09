import * as React from "react";
import { Component } from "react";
import * as L from 'leaflet'
import { RefObject } from 'react';
import { LatLng, LatLngBounds } from "leaflet";
import { TileLayer, ImageOverlay, MapContainer } from "react-leaflet";
import KakiUrl from '../icons/poop.png';

export default class MapExample2 extends Component {
  constructor(props) {
    super(props);
    this.originalTransformValue = null;
    this.rotateAngle = 45;
    this.imageOverlayRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { leafletElement: imageOverlay } = this.imageOverlayRef.current;
    this.rotateImage(imageOverlay.getElement(), this.rotateAngle);
    this.rotateAngle+=15;
  }

  rotateImage(image, angle) {
    if (!this.originalTransformValue) {
      this.originalTransformValue = image.style.transform;
    }
    image.style.transform = `${this.originalTransformValue} rotateZ(${angle}deg)`;
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Rotate</button>
        <Map center={[40.73, -74.15]} zoom={12}>
         <TileLayer url="http://localhost:8080/tile/{z}/{x}/{y}.png" />
          <ImageOverlay
            ref={this.imageOverlayRef}
            bounds={[[31.5, 34.75], [31.53, 34.78]]}
            url={KakiUrl}
          />
        </Map>
      </div>
    );
  }
}
