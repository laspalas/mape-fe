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

const getAllKibsSorted = (values, selectedId) => {
  const regions = dataJSON.map((d, index) => {
    return {
      name: d.policijska_uprava,
      id: d.pu_id,
      value: Math.random().toFixed(3),
      color: +d.pu_id === +selectedId ? 'red' : 'blue',
    };
  });

  return {
    regions: regions.sort((r1, r2) => r2.value - r1.value)
  }
}

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

const getKibsLineData = (multiValues, selectedId) => {
  const { regions } = getAllKibsSorted(
    multiValues,
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
    selectedId,
  } = props;

  const isSingle = !!singleValues;
  const isMulti = !!multiValues;

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
                    {(isSingle | isMulti) && (
                      <CardHeader>
                        {isSingle
                          ? `Parametar chart (${singleValues.godina.value}) (${singleValues.parametar.label})`
                          : 'Kibs chart'}
                      </CardHeader>
                    )}
                    <CardBody>
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
                              : getKibsLineData(multiValues, selectedId)
                          }
                        />
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Tab>
            {/* <Tab eventKey="radioChart" title="Radio chart">
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
            </Tab> */}
          </Tabs>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GraphModal;
