import React, { useRefy } from 'react';

import Page from 'components/Page';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import bihgeojson from '../assets/geo-data/bihgeo.json';

const position = [43, 17];

const Mape = () => {
  return (
    <Page title="" breadcrumbs={[{ name: 'Mape', active: true }]}>
      <MapContainer center={position} zoom={7.2} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>
        {bihgeojson.features.map(feature => {
          return (
            <GeoJSON
              eventHandlers={{
                click: e => {
                  console.log('CLIKE', e);
                },
              }}
              key={feature.id}
              data={feature}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                {JSON.stringify(feature.properties)}
              </Popup>
            </GeoJSON>
          );
        })}
      </MapContainer>
    </Page>
  );
};

export default Mape;
