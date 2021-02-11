import React, { useRef, useState } from 'react';
import L from 'leaflet';

import Page from 'components/Page';
import { MapContainer, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import bihgeojson from '../assets/geo-data/bihgeo.json';
import { MapFilters } from '../components/MapFilters/MapFilters';
import dataJSON from '../assets/data.json';
import './mape.scss';

const COLOR_1 = "#F7FBFF";
const COLOR_2 = "#DEEBF7";
const COLOR_3 = "#C6DBEF";
const COLOR_4 = "#9ECAE1";
const COLOR_5 =  "#6BAED6";
const COLOR_6 = "#4292C6";
const COLOR_7 = "#2171B5";
const COLOR_8 = "#08519C";
const COLOR_9 =  "#08306B";
const COLOR_10 =  "#08306B";



const position = [43, 17];
let mapRef;

const initSingleValues = { region: null, parametar: null, godina: null };

const defaultStyle = {
  color: '#3388ff',
  fillColor: '#3388ff',
  fillOpacity: 0,
  weight: 2,
};

const applyStyleSingle = values => {
  const region = dataJSON.find(d => d.pu_id === values.region.value);
  const godine = region.tip_statistike[values.parametar.value];
  const minMaxNorm = godine.find(g => g.godina === values.godina.value)
    .min_max_norm;

  return {
    fillColor: `rgb(51, 136, 255)`,
    fillOpacity: minMaxNorm,
  };
};

const applyStylesMulti = values => {
  return {};
};

const applyDefault = () => defaultStyle;

const isSelectedSingleRegion = (feature, values) =>
  feature.properties.id_2 === values.region.value;

const applyStyles = (values, feature) => {
  if (!values.region) {
    return applyDefault();
  }

  if (isSelectedSingleRegion(feature, values)) {
    return applyStyleSingle(values);
  }

  return applyDefault();
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
      color: '#3388ff',
      dashArray: '',
      fillOpacity: 0.7,
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  function resetHighlight(e) {
    e.target.setStyle(applyStyles(singleFilterValues, e.target.feature));
  }

  function onEachFeature(feature, layer) {
    // layer.bindTooltip(feature.properties.name_2, {
    //   permanent: true,
    //   direction: 'center',
    //   className: 'countryLabel',
    // });
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
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
            <div className="hover-info">Hover over an Area</div>
          )}
          {selected.province && (
            <div className="info">
              <strong>{selected.province}</strong>
              <span>Placeholder for values</span>
            </div>
          )}
          <div className="legend">
            <div style={{ '--color': COLOR_10 }}>0.9 - 10</div>
            <div style={{ '--color': COLOR_9 }}>0.8 - 0.9</div>
            <div style={{ '--color': COLOR_8 }}>0.7 - 0.8</div>
            <div style={{ '--color': COLOR_7 }}>0.6 - 0.7</div>
            <div style={{ '--color': COLOR_6 }}>0.5 - 0.6</div>
            <div style={{ '--color': COLOR_5 }}>0.4 - 0.5</div>
            <div style={{ '--color': COLOR_4 }}>0.3 - 0.4</div>
            <div style={{ '--color': COLOR_3 }}>0.2 - 0.3</div>
            <div style={{ '--color': COLOR_2 }}>0.1 - 0.2</div>
            <div style={{ '--color': COLOR_1 }}>0 - 0.1</div>
          </div>
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
                  return applyStyles(singleFilterValues, feature);
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
