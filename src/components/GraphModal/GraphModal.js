import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';

import { getColor } from 'utils/colors';
import { randomNum } from 'utils/demos';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const genLineData = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
        ],
        ...moreData,
      },
      {
        label: 'Dataset 2',
        backgroundColor: getColor('secondary'),
        borderColor: getColor('secondary'),
        borderWidth: 1,
        data: [
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
        ],
        ...moreData2,
      },
    ],
  };
};

const GraphModal = (props) => {
  const {
    buttonLabel,
    className,
    open,
    toggleModal
  } = props;

  // const [modal, setModal] = useState(false);

  // const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal wrapClassName="backdropGraph" style={{ zIndex: 1213123123}} isOpen={true} toggle={() => {}} contentClassName="modalGraph">
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
        <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>Bar</CardHeader>
            <CardBody>
              <Bar data={genLineData()} />
            </CardBody>
          </Card>
        </Col>
        </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default GraphModal;
