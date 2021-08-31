import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import GoogleMapReact from 'google-map-react';

/*const Mapx = () => {
  const mapStyles = {
    height: "60vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyB7VBY6KfTHo4p_O-Oo_R3KuIXVmktjbcY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      />
    </LoadScript>
  );
};
export default Mapx;*/




const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

const Mapx = (locations) => {
  let defaultProps = {
    center: {
      lat: 30.34,
      lng: 40.34
    },
    zoom: 11
  };

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBuhUomyWxQBTEeyXUr_7xvq5kU_ghUxE0" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat= {30.34}
            lng={40.34}
            text="My pet"
          />
        </GoogleMapReact>
      </div>
    );
}

export default Mapx;
