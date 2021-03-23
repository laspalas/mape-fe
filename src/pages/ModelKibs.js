import bg11Image from 'assets/img/bg/background_1920-11.jpg';
import bg18Image from 'assets/img/bg/background_1920-18.jpg';
import bg1Image from 'assets/img/bg/background_640-1.jpg';
import bg3Image from 'assets/img/bg/background_640-3.jpg';
import user1Image from 'assets/img/users/100_1.jpg';
import { UserCard } from 'components/Card';
import Page from 'components/Page';
import Container from 'react-bootstrap/Container';
import { select } from 'd3-selection';

import { bgCards, gradientCards, overlayCards } from 'demos/cardPage';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import PyramidChart from '../components/PyramidChart/PyramidChart';
import { useResizeDetector } from 'react-resize-detector';
import trafic from '../assets/trafic.jpeg';
import { info } from './texts';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CardHeader from 'reactstrap/lib/CardHeader';
import slika from '../assets/img/products/product_640-4.jpg';

const TabContent = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '1000px',
        padding: '1rem',
        border: '1px solid #dee2e6',
        background: 'white',
        borderTop: 'none',
      }}
    >
      {children}
    </div>
  );
};

const ModelKibs = () => {
  const { width, height, ref } = useResizeDetector();
  return (
    <Page title="" breadcrumbs={[{ name: 'Nosioci projekta', active: true }]}>
      <Tabs defaultActiveKey="Osnovne informacije" transition={false}>
        <Tab eventKey="Osnovne informacije" title="Zasto KIBS?">
          <TabContent>
            <Row>
              <Col>
                <Card>
                  <CardHeader>Definicija KIBS-a</CardHeader>
                  <CardBody style={{ minHeight: '300px' }}>Some text</CardBody>
                </Card>
                <Card style={{ marginTop: '30px' }}>
                  <CardHeader>Vaznost KIBS-a</CardHeader>
                  <CardBody style={{ minHeight: '300px' }}>Some text</CardBody>
                </Card>
              </Col>
              <Col>
                <Card>
                  <CardBody style={{ height: '750px', padding: 0 }}>
                    <img height="100%" width="100%" src={slika}></img>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabContent>
        </Tab>
        <Tab
          eventKey="Svrha i sadrzaj"
          title="Ocena pomocu zvezdica/Star rating"
        >
          <TabContent>{info}</TabContent>
        </Tab>
      </Tabs>
    </Page>
  );
};

export default ModelKibs;
