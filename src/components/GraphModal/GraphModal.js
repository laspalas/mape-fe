import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';

import { getColor } from 'utils/colors';
import { randomNum } from 'utils/demos';
import dataJSON from '../../assets/data.json';

// blue, red

// const getMinMaxNormSingle = values => {
//   const region = dataJSON.find(d => d.pu_id === values.region.value);
//   const godine = region.tip_statistike[values.parametar.value];
//   const minMaxNorm = godine.find(g => g.godina === values.godina.value)
//     .min_max_norm;

//   return minMaxNorm;
// };

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

  return { regions: regions.sort((r1, r2) => r2.value - r1.value), selectedRegion }
};

const getLineDataSingle = singleValues => {
  const { regions, selectedRegion } = getAllMinMaxSorted(singleValues);
  return {
    labels: regions.map(d => d.name),
    datasets: [
      {
        backgroundColor: regions.map((r) => r.color),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: regions.map(d => d.value),
      },
    ],
  };
};

// return {
//   labels: MONTHS,
//   datasets: [
//     {
//       backgroundColor: getColor('primary'),
//       borderColor: getColor('primary'),
//       borderWidth: 1,
//       data: [
//         randomNum(),
//         randomNum(),
//         randomNum(),
//         randomNum(),
//         randomNum(),
//         randomNum(),
//         randomNum(),
//       ],
//       ...moreData,
//     },
//     {
//       backgroundColor: getColor('secondary'),
//       borderColor: getColor('secondary'),
//       borderWidth: 1,
//       data: [
//         randomNum(),
//         randomNum(),
//         randomNum(),
//         randomNum(),
//         randomNum(),
//         randomNum(),
//         randomNum(),
//       ],
//       ...moreData2,
//     },
//   ],
// };

const GraphModal = props => {
  const {
    buttonLabel,
    className,
    open,
    toggleModal,
    singleValues,
    multiValues,
  } = props;

  const isSingle = singleValues.region && singleValues.region.value;

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
          <Row>
            <Col xl={12} lg={12} md={12}>
              <Card>
                <CardHeader>
                  {singleValues.region && singleValues.region.value
                    ? `Parametar chart (${singleValues.godina.value}) (${singleValues.parametar.label})`
                    : 'Kibs chart'}
                </CardHeader>
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
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GraphModal;
