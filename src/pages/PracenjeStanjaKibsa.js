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
import { info } from './texts';

const CardPage = () => {
  const { width, height, ref } = useResizeDetector();
  return (
    <Page
      title=""
      breadcrumbs={[
        { name: 'Praćenje stanja bezbednosti saobraćaja', active: true },
      ]}
    >
      <div
        ref={ref}
        style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
      >
        <div style={{ flex: 1, margin: '1rem' }}>
          <div style={{ width: '60%', float: 'left', marginRight: '1.6rem', marginBottom: '1.6rem' }}>
            <PyramidChart width={width} />
          </div>
          <h1>Pracenje stanja bezbednosti saobracaja</h1>
          {info}
        </div>
      </div>
    </Page>
  );
};

export default CardPage;
