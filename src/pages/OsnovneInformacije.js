import React from 'react';
import Page from 'components/Page';

import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';

import { Bar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';
import { info } from './texts';
import { appFirebase } from '../thrd/firbase';
import slika from '../assets/img/products/product_640-4.jpg';
import { store } from '../thrd/store';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

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

const DashboardPage = ({ osnovne = {} }) => {
  return (
    <Page
      className="DashboardPage"
      title=""
      breadcrumbs={[{ name: 'Osnove informacije', active: true }]}
    >
      <Tabs defaultActiveKey="Osnovne informacije" transition={false}>
        <Tab eventKey="Osnovne informacije" title="Osnovne informacije">
          <TabContent>
            <Row
              style={{
                minHeight: '270px',
                maxHeight: '270px',
              }}
            >
              <Col xs={9}>
                <Card style={{ height: '100%' }}>
                  <CardHeader>
                    <h3>Oblast projekta</h3>
                  </CardHeader>
                  <CardBody style={{ height: '100%' }}>
                    {osnovne.oblast_text}
                  </CardBody>
                </Card>
              </Col>
              <Col xs={3}>
                <img
                  style={{ maxWidth: '100%', maxHeight: '250px' }}
                  src={osnovne.oblast_slika}
                ></img>
              </Col>
            </Row>
            <Row style={{ minHeight: '270px'}}>
              <Col xs={3}>
                <img
                  style={{ maxHeight: '250px' }}
                  src={osnovne.predmet_slika}
                ></img>
              </Col>
              <Col xs={9}>
                <Card style={{ height: '100%' }}>
                  <CardHeader>
                    <h3>Predmet projekta</h3>
                  </CardHeader>
                  <CardBody style={{ height: '100%' }}>
                    {osnovne.predmet_text}
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row style={{ minHeight: '270px'}}>
              <Col xs={9}>
                <Card style={{ height: '100%',  maxHeight: '250px' }}>
                  <CardHeader>
                    <h3>Ocekivani rezultati</h3>
                  </CardHeader>
                  <CardBody style={{ height: '100%' }}>
                    {osnovne.rezultat_text}
                  </CardBody>
                </Card>
              </Col>
              <Col xs={3}>
                <img
                  style={{ maxHeight: '250px' }}
                  src={osnovne.rezultat_slika}
                ></img>
              </Col>
            </Row>
          </TabContent>
        </Tab>
        <Tab eventKey="Svrha i cilj projekta" title="Svrha i cilj projekta">
          <TabContent>{osnovne.svrha}</TabContent>
        </Tab>
      </Tabs>
    </Page>
  );
};

export default store.connect(state => state)(DashboardPage);
