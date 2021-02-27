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

const getAllMinMaxSorted = values => {
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
      color: d.pu_id === values.region.value ? 'red' : 'blue',
    };
  });

  const selectedRegion = regions.find(r => r.id === values.region.value);

  return {
    regions: regions.sort((r1, r2) => r2.value - r1.value),
    selectedRegion,
  };
};

const getLineDataSingle = singleValues => {
  const { regions, selectedRegion } = getAllMinMaxSorted(singleValues);
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

const radarChartData = singleValues => {
  console.log(
    Object.keys(mapStaticKeysLabels).map(key => mapStaticKeysLabels[key]),
    'labels',
  );
  return {
    labels: Object.keys(mapStaticKeysLabels).map(
      key => mapStaticKeysLabels[key].label,
    ),
    dataset: [],
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
  } = props;

  const isSingle = !!singleValues;

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
                <Col xl={12} lg={12} md={12}>
                  <Card>
                    {isSingle && (
                      <CardHeader>
                        {isSingle
                          ? `Parametar chart (${singleValues.godina.value}) (${singleValues.parametar.label})`
                          : 'Kibs chart'}
                      </CardHeader>
                    )}
                    <CardBody>
                      {isSingle && (
                        <Bar
                          options={{
                            legend: {
                              display: false,
                            },
                          }}
                          data={getLineDataSingle(singleValues)}
                        />
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="radioChart" title="Radio chart">
              <Row>
                <Col xl={12} lg={12} md={12}>
                  <Card>
                    {isSingle && (
                      <CardHeader>
                        {singleValues.region && singleValues.region.value
                          ? `Parametar chart (${singleValues.godina.value}) (${singleValues.parametar.label})`
                          : 'Kibs chart'}
                      </CardHeader>
                    )}
                    <CardBody>
                      {isSingle && (
                        <Radar data={radarChartData(singleValues)} />
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GraphModal;
