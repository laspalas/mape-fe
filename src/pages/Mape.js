import React, { useRef, useState } from 'react';
import L from 'leaflet';

import Page from 'components/Page';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import bihgeojson from '../assets/geo-data/bihgeo.json';
import { MapFilters } from '../components/MapFilters/MapFilters';
import dataJSON from '../assets/data.json';
import './mape.scss';


const COLOR_0 = '#F06E45';
const COLOR_1 = '#C9A83E';
const COLOR_24 = '#A1A436';
const COLOR_75 = '#789E2D';
const COLOR_140 = '#509923';
const COLOR_222 = '#3eb80e';

const position = [43, 17];
let mapRef;

const initSingleValues = { region: null, parametar: null, godina: null };

const applyStyles = (isSingle, isMulti, values, feature) => {
  if (isSingle) {
    if (feature.properties.id_2 == values.region.value) {
      const region = dataJSON.find(d => d.pu_id === values.region.value);
      const godine = region.tip_statistike[values.parametar.value];
      const minMaxNorm = godine.find(g => g.godina === values.godina.value)
        .min_max_norm;

      return {
        fillColor: `rgb(51, 136, 255)`,
        fillOpacity: minMaxNorm,
        opacity: 1,
      };
    }
  } else if (isMulti) {
  } else {
    return {
      weight: 2,
      color: 'black',
      dashArray: '',
      fillOpacity: 0,
    };
  }
};

const Mape = () => {
  const [singleFilterValues, setSingleFilterValues] = useState(
    initSingleValues,
  );
  const [selected, setSelected] = useState({});
  const [showSingle, setShowSingle] = useState(false);

  const onSingleChange = values => {
    setSingleFilterValues(values);
    setShowSingle(true);
  };

  function highlightFeature(e) {
    var layer = e.target;
    console.log(e.target.feature.properties);
    const { name_2 } = e.target.feature.properties;
    setSelected({
      province: `${name_2}`,
      // count: COUNT
    });
    layer.setStyle({
      weight: 5,
      color: 'black',
      dashArray: '',
      fillOpacity: 0.7,
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }
  function resetHighlight(e) {
    e.target.setStyle(
      applyStyles(showSingle, false, singleFilterValues, e.target.feature),
    );
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      // click: zoomToFeature
    });
  }

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
            showSingle
              ? `${singleFilterValues.region.value} ${singleFilterValues.godina.value} ${singleFilterValues.parametar.value}`
              : 'neki_kurac'
          }__`}
          mapRef={mapRef}
          center={position}
          zoom={7.2}
          scrollWheelZoom={true}
          whenReady={e => {
            mapRef = e.target;
          }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!selected.province && (
            <div className='hover-info'>Hover over an Area</div>
          )}
          {selected.province && (
            <div className='info'>
              <strong>{selected.province}</strong>
              <span>Placeholder for values</span>
            </div>
          )}
          <div className="legend">
            <div style={{ '--color': COLOR_222 }}>0.4+</div>
            <div style={{ '--color': COLOR_140 }}>0.3 - 0.4</div>
            <div style={{ '--color': COLOR_75 }}>0.2 - 0.3</div>
            <div style={{ '--color': COLOR_24 }}>0.1 - 0.2</div>
            <div style={{ '--color': COLOR_1 }}>0 - 0.1</div>
            <div style={{ '--color': COLOR_0 }}>0</div>
          </div>
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
                onEachFeature={onEachFeature}
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
