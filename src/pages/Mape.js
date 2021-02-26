import React, { useRef, useState } from 'react';
import L from 'leaflet';

import Page from 'components/Page';

import { MapContainer, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import bihgeojson from '../assets/geo-data/bihgeo.json';
import { MapFilters } from '../components/MapFilters/MapFilters';
import dataJSON from '../assets/data.json';
import './mape.scss';
import { ClearFilters } from '../components/MapFilters/ClearFilters';
import { humanize } from '../utils/humanize';
import GraphModal from '../components/GraphModal/GraphModal';

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

const getColor = v => {
  const value = parseFloat(v);
  if (value >= 0.9) {
    return COLOR_10;
  } else if (value >= 0.8) {
    return COLOR_9;
  } else if (value >= 0.7) {
    return COLOR_8;
  } else if (value >= 0.6) {
    return COLOR_7;
  } else if (value >= 0.5) {
    return COLOR_6;
  } else if (value >= 0.4) {
    return COLOR_5;
  } else if (value >= 0.3) {
    return COLOR_4;
  } else if (value >= 0.2) {
    return COLOR_3;
  } else if (value >= 0.1) {
    return COLOR_2;
  } else if (value >= 0) {
    return COLOR_1;
  }
  // switch (value) {
  //   case value >= 0.9:
  //     return COLOR_10;
  //   case value >= 0.8:
  //     return COLOR_9;
  //   case value >= 0.7:
  //     return COLOR_8;
  //   case value >= 0.6:
  //     return COLOR_7;
  //   case value >= 0.6:
  //     return COLOR_6;
  //   case value >= 0.4:
  //     return COLOR_5;
  //   case value >= 0.3:
  //     return COLOR_4;
  //   case value >= 0.2:
  //     return COLOR_3;
  //   case value >= 0.1:
  //     return COLOR_2;
  //   case value >= 0:
  //     return COLOR_1;
  // }
};

const position = [44, 18];
let mapRef;

const initSingleValues = { region: null, parametar: null, godina: null };
const initMultiValues = { parametar: [], godina: null };

const defaultStyle = {
  color: '#3388ff',
  fillColor: '#3388ff',
  fillOpacity: 0,
  weight: 2,
};

const getMinMaxNormSingle = values => {
  const region = dataJSON.find(d => d.pu_id === values.region.value);
  const godine = region.tip_statistike[values.parametar.value];
  const minMaxNorm = godine.find(g => g.godina === values.godina.value)
    .min_max_norm;

  return minMaxNorm;
};

const getKibsDummy = (values, feature) => {
  const id = feature.properties.PU_ID;
  const region = dataJSON.find(d => d.pu_id === id);

  return Math.random();
};

const applyStyleSingle = (values, feature) => {
  const minMaxNorm = getMinMaxNormSingle(values);

  return {
    fillColor: getColor(minMaxNorm),
    fillOpacity: minMaxNorm,
  };
};

const applyStylesMulti = (values, feature) => {
  const kibsDummy = getKibsDummy(values, feature);

  console.log(getColor(+kibsDummy.toFixed(2)));

  return {
    fillColor: getColor(+kibsDummy.toFixed(2)),
    fillOpacity: 0.7,
  };
};

const applyDefault = () => defaultStyle;

const isSelectedSingleRegion = (feature, values) =>
  feature.properties.PU_ID === values.region.value;

const applyStyles = (values, feature) => {
  if (!values.region && !values.godina) {
    return applyDefault();
  }

  if (values.region && isSelectedSingleRegion(feature, values)) {
    return applyStyleSingle(values);
  }

  if (values.godina && values.parametar && !values.region) {
    return applyStylesMulti(values, feature);
  }

  return applyDefault();
};

const Mape = () => {
  const [singleFilterValues, setSingleFilterValues] = useState(
    initSingleValues,
  );
  const [multiFilterValues, setMultiFilterValues] = useState(initMultiValues);
  const [selected, setSelected] = useState({});
  const [open, setOpen] = useState(false);

  const resetFilters = () => {
    setSingleFilterValues(initSingleValues);
    setMultiFilterValues(initMultiValues);
  };

  const onSingleChange = values => {
    setMultiFilterValues(initMultiValues);
    setSingleFilterValues(values);
  };

  const onMultiChange = values => {
    setSingleFilterValues(initSingleValues);
    setMultiFilterValues(values);
  };

  function highlightFeature(e) {
    var layer = e.target;
    const { NAME } = e.target.feature.properties;
    setSelected({
      province: `${NAME}`,
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
    e.target.setStyle(
      applyStyles(
        singleFilterValues.region ? singleFilterValues : multiFilterValues,
        e.target.feature,
      ),
    );
  }

  function onEachFeature(feature, layer) {
    if (
      singleFilterValues.region &&
      isSelectedSingleRegion(feature, singleFilterValues)
    ) {
      layer.bindTooltip(
        `${getMinMaxNormSingle(singleFilterValues)} (${humanize(
          feature.properties.NAME,
        )})`,
        {
          permanent: true,
          direction: 'center',
          className: 'countryLabel',
        },
      );
    }

    if (multiFilterValues.godina) {
      layer.bindTooltip(
        `${getKibsDummy(multiFilterValues, feature)} (${humanize(
          feature.properties.NAME,
        )})`,
        {
          permanent: true,
          direction: 'center',
          className: 'countryLabel',
        },
      );
    }

    if (!singleFilterValues.region && !multiFilterValues.godina) {
      layer.bindTooltip(humanize(feature.properties.NAME), {
        permanent: true,
        direction: 'center',
        className: 'countryLabel',
      });
    }

    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  }

  const getKey = () => {
    if (singleFilterValues.region) {
      return `${singleFilterValues.region.value} ${singleFilterValues.godina.value} ${singleFilterValues.parametar.value}`;
    }

    if (multiFilterValues.godina) {
      return `${multiFilterValues.godina.value} ${JSON.stringify(
        multiFilterValues.parametar,
      )}`;
    }

    return 'nesto';
  };

  return (
    <Page title="" breadcrumbs={[{ name: 'Mape', active: true }]}>
      <GraphModal
        singleValues={singleFilterValues}
        multiValues={multiFilterValues}
        open={open}
        toggleModal={setOpen}
      />
      <div style={{ position: 'relative' }}>
        <MapFilters
          isSingle
          values={singleFilterValues}
          onChange={onSingleChange}
        />
        <MapFilters values={multiFilterValues} onChange={onMultiChange} />
        <ClearFilters onClearFilters={resetFilters} />
        <MapContainer
          key={getKey()}
          mapRef={mapRef}
          center={position}
          zoom={8.4}
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
              <strong>{humanize(selected.province)}</strong>
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
                    if (
                      singleFilterValues.region &&
                      singleFilterValues.region.value ===
                        e.sourceTarget.feature.properties.PU_ID
                    ) {
                      setOpen(true);
                    } else if (multiFilterValues.parametar.value) {
                      setOpen(true);
                    }
                  },
                }}
                key={feature.id}
                onEachFeature={onEachFeature}
                data={feature}
                style={feature => {
                  return applyStyles(
                    singleFilterValues.region
                      ? singleFilterValues
                      : multiFilterValues,
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
