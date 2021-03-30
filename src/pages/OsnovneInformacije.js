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

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <Page
        className="DashboardPage"
        title=""
        breadcrumbs={[{ name: 'Osnove informacije', active: true }]}
      >
        <Tabs defaultActiveKey="Osnovne informacije" transition={false}>
          <Tab eventKey="Osnovne informacije" title="Osnovne informacije">
            <TabContent>{info}</TabContent>
          </Tab>
          <Tab eventKey="Svrha i sadrzaj" title="Svrha i sadrzaj">
            <TabContent>{info}</TabContent>
          </Tab>
          <Tab eventKey="Cilj projekta" title="Cilj projekta">
            <TabContent>{info}</TabContent>
          </Tab>
        </Tabs>
      </Page>
    );
  }
}
export default DashboardPage;
