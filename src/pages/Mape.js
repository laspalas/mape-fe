import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { L } from '../thrd/bigimage';

import Page from 'components/Page';

import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { MapContainer, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import bihgeojson from '../assets/geo-data/bihgeo.json';
import { MapFilters } from '../components/MapFilters/MapFilters';
import dataJSON from '../assets/data.json';
import './mape.scss';
import { ClearFilters } from '../components/MapFilters/ClearFilters';
import { humanize } from '../utils/humanize';
import GraphModal from '../components/GraphModal/GraphModal';
import 'leaflet-easyprint';
import policija from '../assets/policija.jpeg';
import { Legend, legendValues } from '../components/Legend/Legend';
import { store } from '../thrd/store';
import { caclulateSperman } from '../thrd/sperman';

const COLOR_1 = '#F7FBFF';
const COLOR_2 = '#DEEBF7';
const COLOR_3 = '#C6DBEF';
const COLOR_4 = '#9ECAE1';
const COLOR_5 = '#6BAED6';
const COLOR_6 = '#4292C6';
const COLOR_7 = '#2171B5';
const COLOR_8 = '#08519C';
const COLOR_9 = '#08306B';
const COLOR_10 = '#08306B';

const mapColors = [
  { pu_id: 28, color: '#B8BA00' },
  { pu_id: 29, color: '#B00000' },
  { pu_id: 30, color: '#A54AFF' },
  { pu_id: 31, color: '#00AAAA' },
  { pu_id: 32, color: '#CC4201' },
  { pu_id: 33, color: '#3635FF' },
  { pu_id: 34, color: '#B65B00' },
  { pu_id: 35, color: '#FF5959' },
  { pu_id: 36, color: '#68016C' },
  { pu_id: 37, color: '#808040' },
];

const getColor = v => {
  const value = parseFloat(v);
  if (+value >= legendValues.SAFEST_GREEN.min_value) {
    return legendValues.SAFEST_GREEN.color;
  } else if (value >= legendValues.YELLOW.min_value) {
    return legendValues.YELLOW.color;
  } else if (value >= legendValues.ORANGE.min_value) {
    return legendValues.ORANGE.color;
  } else if (value >= legendValues.RED.min_value) {
    return legendValues.RED.color;
  } else if (value >= legendValues.BLACK.min_value) {
    return legendValues.BLACK.color;
  } else {
    return legendValues.NOT_RATED.color;
  }
};

const position = [44, 18];
let mapRef;

const initSingleValues = { parametar: null, godina: null };
const initMultiValues = { godina: null, sezona: null };

const defaultStyle = {
  color: '#3388ff',
  fillColor: '#3388ff',
  fillOpacity: 0.5,
  weight: 2,
};

const getMinMaxNormSingle = (values, feature) => {
  const region = dataJSON.find(d => d.pu_id === feature.properties.PU_ID);

  if (!region) {
    return 0;
  }

  const godine = region.tip_statistike[values.parametar.value];
  const minMaxNorm =
    godine.find(g => g.godina === values.godina.value).min_max_norm || 0;

  return minMaxNorm.toFixed(3);
};

const getKibs = (values, feature, state) => {
  const id = feature.properties.PU_ID;
  const region = dataJSON.find(d => d.pu_id === id);
  if (!values || !values.godina) {
    return 0;
  }

  const result =
    state[
      `result_${values.godina.value}${values.sezona ? values.sezona.value : ''}`
    ];

  const mapRegionIndexToPuId = result.mapRegionIndexToPuId;
  const kibs = result.data.kibs;

  const regionId = mapRegionIndexToPuId[`${id}`];

  return kibs[regionId].toFixed(3);
};

const applyStyleSingle = (values, feature) => {
  const minMaxNorm = getMinMaxNormSingle(values, feature);

  return {
    fillColor: getColor(minMaxNorm),
    fillOpacity: 0.5,
  };
};

const applyStylesMulti = (values, feature, state) => {
  const kibsDummy = getKibs(values, feature, state);

  return {
    fillColor: getColor(+kibsDummy),
    fillOpacity: 0.5,
  };
};

const applyDefault = backgroundColor => ({
  ...defaultStyle,
  color: backgroundColor,
  fillColor: backgroundColor,
});

const applyStyles = (values, feature, isSingle, isMulti, state) => {
  if (feature.properties.PU_ID === 0) {
    return {
      backgroundColor: '#bbbbbb',
      color: '#bbbbbb',
      fillOpacity: '0.6',
    };
  }

  if (!isSingle && !isMulti && feature.properties.PU_ID !== 0) {
    const mapColor = mapColors.find(m => m.pu_id === feature.properties.PU_ID);
    return applyDefault(mapColor.color);
  }

  if (isSingle && values && feature.properties.PU_ID !== 0) {
    return applyStyleSingle(values, feature);
  }

  if (isMulti) {
    return applyStylesMulti(values, feature, state);
  }

  return applyDefault();
};

const MapeC = ({ ...props }) => {
  const [singleFilterValues, setSingleFilterValues] = useState(null);
  const [multiFilterValues, setMultiFilterValues] = useState(null);
  const [selected, setSelected] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [isSingle, setIsSingle] = useState(false);
  const [isMulti, setIsMulti] = useState(false);
  const [open, setOpen] = useState(false);

  const resetFilters = () => {
    setIsMulti(false);
    setIsSingle(false);
    setSingleFilterValues(initSingleValues);
    setMultiFilterValues(initMultiValues);
  };

  const onSingleChange = values => {
    setMultiFilterValues(null);
    setSingleFilterValues(values);
    setIsSingle(true);
    setIsMulti(false);
  };

  const onMultiChange = values => {
    setIsMulti(true);
    setIsSingle(false);
    setSingleFilterValues(null);
    setMultiFilterValues(values);
  };

  function highlightFeature(e) {
    var layer = e.target;
    const { NAME } = e.target.feature.properties;
    setSelected({
      province: `${NAME}`,
    });
    if (e.target.feature.properties.PU_ID !== 0) {
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
  }

  function onEachFeature(feature, layer) {
    if (!isSingle && !isMulti) {
      layer.bindTooltip(humanize(feature.properties.NAME), {
        permanent: true,
        direction: 'center',
        className: 'countryLabel',
      });
    }

    if (isSingle && feature.properties.PU_ID !== 0) {
      layer.bindTooltip(
        `${getMinMaxNormSingle(singleFilterValues, feature)} (${humanize(
          feature.properties.NAME,
        )})`,
        {
          permanent: true,
          direction: 'center',
          className: 'countryLabel',
        },
      );
    }

    if (isMulti && feature.properties.PU_ID !== 0) {
      layer.bindTooltip(
        `${getKibs(multiFilterValues, feature, props)} (${humanize(
          feature.properties.NAME,
        )})`,
        {
          permanent: true,
          direction: 'center',
          className: 'countryLabel',
        },
      );
    }

    if (feature.properties.PU_ID === 0) {
      layer.bindTooltip(feature.properties.NAME, {
        permanent: true,
        direction: 'center',
        className: 'countryLabel',
      });
    }
  }

  const getKey = () => {
    if (isSingle) {
      return `single-map-bro ${JSON.stringify(singleFilterValues)}`;
    }

    if (isMulti) {
      return `multi-map-bro ${JSON.stringify(multiFilterValues)}`;
    }

    return 'nesto';
  };

  return (
    <Page title="" breadcrumbs={[{ name: 'Mape', active: true }]}>
      {selectedId && (singleFilterValues || multiFilterValues) && (
        <GraphModal
          singleValues={singleFilterValues}
          multiValues={multiFilterValues}
          open={open && !!selectedId}
          toggleModal={setOpen}
          selectedId={selectedId}
          state={props}
        />
      )}
      <div style={{ position: 'relative' }} id="luka">
        <MapFilters
          isSingle
          values={singleFilterValues}
          onChange={onSingleChange}
        />
        <MapFilters values={multiFilterValues} onChange={onMultiChange} />
        <ClearFilters onClearFilters={resetFilters} />
        <MapContainer
          key={getKey()}
          center={position}
          zoom={8.4}
          scrollWheelZoom={false}
          whenReady={e => {
            mapRef = e.target;
            L.easyPrint({
              title: 'My awesome print button',
              position: 'topright',
              sizeModes: ['A4Portrait', 'A4Landscape'],
              hideClasses: ['legend-2'],
            }).addTo(e.target);
          }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <div className="legend">
            <Legend />
          </div>
          <div className="legend-2">
            <img width={200} height={250} src={policija} />
          </div>
          {bihgeojson.features.map(feature => {
            return (
              <GeoJSON
                eventHandlers={{
                  click: e => {
                    if (isSingle) {
                      setOpen(true);
                      setSelectedId(feature.properties.PU_ID);
                    } else if (isMulti) {
                      setOpen(true);
                      setSelectedId(feature.properties.PU_ID);
                    }
                  },
                }}
                key={feature.id}
                onEachFeature={onEachFeature}
                data={feature}
                style={feature => {
                  return applyStyles(
                    isSingle ? singleFilterValues : multiFilterValues,
                    feature,
                    isSingle,
                    isMulti,
                    props,
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

const Mape = store.connect(state => state)(MapeC);

export default Mape;
