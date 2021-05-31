import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';

import { getColor } from 'utils/colors';
import { randomNum } from 'utils/demos';
import dataJSON from '../../assets/data.json';
import { mapStaticKeysLabels } from '../../models/statistic';

const getAllMinMaxSorted = (values, selectedId) => {
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
      `result_${values.godina.value}${values.sezona ? values.sezona.value : ''}`
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
  } = props;

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
                        {isSingle && singleValues && singleValues.godina && singleValues.godina.parametar
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
                          {isSingle
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
          </Tabs>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GraphModal;
