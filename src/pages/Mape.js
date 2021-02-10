import React, { useRef, useState } from 'react';

import Page from 'components/Page';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import bihgeojson from '../assets/geo-data/bihgeo.json';
import { MapFilters } from '../components/MapFilters/MapFilters';
import dataJSON from '../assets/data.json';

const position = [43, 17];

const initSingleValues = { region: null, parametar: null, godina: null };

const applyStyles = (isSingle, isMulti, values, feature) => {
  if (isSingle) {
    if (feature.properties.id_2 == values.region.value) {
      const region = dataJSON.find(d => d.pu_id === values.region.value);
      const godine = region.tip_statistike[values.parametar.value];
      const minMaxNorm = godine.find(g => g.godina === values.godina.value).min_max_norm;

      return {
        fillColor: `rgb(51, 136, 255)`,
        fillOpacity: minMaxNorm,
        opacity: 1,
      };
    }
  } else if (isMulti) {
  } else {
    return {};
  }
};

const Mape = () => {
  const [singleFilterValues, setSingleFilterValues] = useState(
    initSingleValues,
  );
  const mapRef = useRef(null);
  const [showSingle, setShowSingle] = useState(false);

  const onSingleChange = values => {
    setSingleFilterValues(values);
    setShowSingle(true);
  };

  return (
    <Page title="" breadcrumbs={[{ name: 'Mape', active: true }]}>
      <div style={{ position: 'relative' }}>
        <MapFilters
          isSingle
          values={singleFilterValues}
          onChange={onSingleChange}
        />
        <MapFilters />
        <MapContainer
          key={`${
            showSingle ? `${singleFilterValues.region.value} ${singleFilterValues.godina.value} ${singleFilterValues.parametar.value}` : 'neki_kurac'
          }__`}
          mapRef={mapRef}
          center={position}
          zoom={7.2}
          scrollWheelZoom={true}
        >
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
                style={feature => {
                  return applyStyles(
                    showSingle,
                    false,
                    singleFilterValues,
                    feature,
                  );
                }}
              ></GeoJSON>
            );
          })}
        </MapContainer>
      </div>
    </Page>
  );
};

export default Mape;
