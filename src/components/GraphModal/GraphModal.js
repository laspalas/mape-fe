import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';
import { max } from 'lodash';

import { getColor } from 'utils/colors';
import { randomNum } from 'utils/demos';
import dataJSON from '../../assets/data.json';
import { mapStaticKeysLabels } from '../../models/statistic';
import DataGrid from './Table';
import { store } from '../../thrd/store';
import { caclulateSperman } from '../../thrd/sperman';

function zip() {
  var out = [];
  for (var i = 0; i < arguments[0].length; i++) {
    var item = [];
    for (var j in arguments) {
      item.push(arguments[j][i]);
    }
    out.push(item);
  }
  return out;
}

const getAllMinMaxSorted = (values, selectedId) => {
  if (!values.parametar || !values.godina) {
    return [];
  }
  const godine = dataJSON.map(d => d.tip_statistike[values.parametar.value]);

  const mapByMinMaxNorm = godine.map(godina => {
    const res = godina.find(g => g.godina === values.godina.value);
    return res.min_max_norm;
  });

  const regions = dataJSON.map((d, index) => {
    return {
      name: d.policijska_uprava,
      id: d.pu_id,
      value: mapByMinMaxNorm[index],
      color: +d.pu_id === +selectedId ? 'red' : 'blue',
    };
  });

  return {
    regions: regions.sort((r1, r2) => r2.value - r1.value),
  };
};

const getKibs = (values, id, state) => {
  if (!values || !values.godina) {
    return 0;
  }

  const result =
    state[
      `results_${values.godina.value}${
        values.sezona ? `_${values.sezona.value}` : ''
      }`
    ];

  const mapRegionIndexToPuId = result.mapRegionIndexToPuId;
  const kibs = result.data.kibs;

  const regionId = mapRegionIndexToPuId[`${id}`];

  return kibs[regionId];
};

const getAllKibsSorted = (values, selectedId, state) => {
  const regions = dataJSON.map((d, index) => {
    return {
      name: d.policijska_uprava,
      id: d.pu_id,
      value: getKibs(values, d.pu_id, state),
      color: +d.pu_id === +selectedId ? 'red' : 'blue',
    };
  });

  return {
    regions: regions.sort((r1, r2) => r2.value - r1.value),
  };
};

const getLineDataSingle = (singleValues, selectedId) => {
  const { regions, selectedRegion } = getAllMinMaxSorted(
    singleValues,
    selectedId,
  );
  return {
    labels: (regions || []).map(d => d.name),
    datasets: [
      {
        backgroundColor: (regions || []).map(r => r.color),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: (regions || []).map(d => d.value),
      },
    ],
  };
};

const getKibsLineData = (multiValues, selectedId, state) => {
  const { regions } = getAllKibsSorted(multiValues, selectedId, state);
  return {
    labels: regions.map(d => d.name),
    datasets: [
      {
        backgroundColor: regions.map(r => r.color),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: regions.map(d => d.value),
      },
    ],
  };
};

const radarChartData = (singleValues, selectedId) => {
  const data = dataJSON.map(region => {
    const dataset = Object.keys(region.tip_statistike).map(key => {
      const godina = region.tip_statistike[key].find(
        stat => stat.godina === singleValues.godina.value,
      );
      const minMaxNorm = (godina && godina.min_max_norm) || 0;

      return minMaxNorm;
    });

    return {
      data: dataset,
      label: region.policijska_uprava,
      hidden: region.pu_id !== selectedId,
    };
  });

  const labels = Object.keys(mapStaticKeysLabels).map(
    key => mapStaticKeysLabels[key].label,
  );

  return {
    labels,
    datasets: data.map(d => ({
      data: d.data,
      label: d.label,
      hidden: d.hidden,
    })),
  };
};

const GraphModal = props => {
  const {
    buttonLabel,
    className,
    open,
    toggleModal,
    singleValues,
    multiValues,
    selectedId,
    state,
    setIndicators,
    ...stateRest
  } = props;

  if (!singleValues && !multiValues) {
    return null;
  }

  const [rows, setRows] = useState([]);
  const [params, setParams] = useState([]);

  useEffect(() => {
    if (multiValues && multiValues.godina) {
      const data =
        stateRest[
          `results_${multiValues.godina.value}${
            multiValues.sezona ? `_${multiValues.sezona.value}` : ''
          }`
        ];

      if (!data) {
        return;
      }

      setParams(Object.values(data.parametersOrder));

      const kibs = caclulateSperman(data.data);

      const comb3 = kibs.Comb3.slice(0, 5);
      const comb4 = kibs.Comb4.slice(0, 5);
      const comb5 = kibs.Comb5.slice(0, 5);

      setRows(zip(comb3, comb4, comb5));
    }
  }, [multiValues]);

  const isSingle = !!singleValues;
  const isMulti = !!multiValues;

  const options = {
    legend: {
      position: 'top',
    },
    scale: {
      reverse: false,
      gridLines: {
        color: [
          'black',
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'indigo',
          'violet',
        ],
      },
      ticks: {
        beginAtZero: true,
      },
    },
  };

  const onClickCell = indicators => {
    setIndicators(indicators);
    toggleModal(false);
  };

  return (
    <div>
      <Modal
        wrapClassName="backdropGraph"
        style={{ zIndex: 1213123123 }}
        isOpen={open}
        toggle={() => {
          toggleModal(!open);
        }}
        contentClassName="modalGraph"
      >
        <ModalHeader>Statistics</ModalHeader>
        <ModalBody
          className="modal-body-graph"
          style={{ width: '100%', height: '100%' }}
        >
          <Tabs defaultActiveKey="BarChart" transition={false}>
            <Tab eventKey="BarChart" title="Bar chart">
              <Row>
                <Col xl={12} lg={12} md={12} style={{ padding: '1.6rem' }}>
                  <Card>
                    {isSingle | isMulti && (
                      <CardHeader>
                        {isSingle &&
                        singleValues &&
                        singleValues.godina &&
                        singleValues.godina.parametar
                          ? `Parametar chart (${singleValues.godina.value}) (${singleValues.parametar.label})`
                          : 'Kibs chart'}
                      </CardHeader>
                    )}
                    <CardBody style={{ wordBreak: 'break-all' }}>
                      {(isSingle || isMulti) && (
                        <Bar
                          options={{
                            legend: {
                              display: false,
                            },
                          }}
                          data={
                            isSingle
                              ? getLineDataSingle(singleValues, selectedId)
                              : getKibsLineData(multiValues, selectedId, state)
                          }
                        />
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Tab>
            {isSingle && (
              <Tab eventKey="radioChart" title="Radio chart">
                <Row>
                  <Col xl={12} lg={12} md={12} style={{ padding: '1.6rem' }}>
                    <Card>
                      {(isSingle || isMulti) && (
                        <CardHeader>
                          {isSingle && singleValues.godina
                            ? `Parametar chart (${singleValues.godina.value})`
                            : 'Kibs chart'}
                        </CardHeader>
                      )}
                      <CardBody>
                        {(isSingle || isMulti) && (
                          <Radar
                            options={options}
                            data={radarChartData(singleValues, selectedId)}
                          />
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Tab>
            )}
            {isMulti && (
              <Tab eventKey="statKibs" title="Kibs">
                <Row>
                  <Col xs={12} style={{ padding: '1.6rem' }}>
                    <DataGrid rows={rows} onClickCell={onClickCell} />
                  </Col>
                </Row>
              </Tab>
            )}
            {isMulti && (
              <Tab eventKey="params" title="Indikatori">
                <Row>
                  <Col xs={12} style={{ padding: '1.6rem' }}>
                    <ListGroup>
                      {params.map((p, index) => {
                        return (
                          <ListGroupItem>
                            {index} - {p.label}
                          </ListGroupItem>
                        );
                      })}
                    </ListGroup>
                  </Col>
                </Row>
              </Tab>
            )}
          </Tabs>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default store.connect((state, props) => ({ ...state, ...props }))(
  GraphModal,
);
