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

const CardPage = () => {
  const { width, height, ref } = useResizeDetector();
  return (
    <Page
      title=""
      breadcrumbs={[
        { name: 'Praćenje stanja bezbednosti saobraćaja', active: true },
      ]}
    >
      <div ref={ref} style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        <div style={{ flex: 1, margin: '1rem' }}>
          With the development and comprehension of road safety issues, methods
          for comparing road safety situations in specific areas have been also
          developed. Therefore, today’s methods for road safety comparisons
          encompass a multitude of factors (and consequently a multitude of
          indicators) while tending to reduce all those indicators to the same
          scale and allocate them as most accurate weights possible to represent
          the specific features of the compared area. Depending on the purpose
          of the composite index, the phase of selecting the representative road
          safety indicators on a territory should start from the analysis of all
          categories (levels) of indicators from the Koornstra et al. (2002) and
          LTSA (2000) pyramid.
        </div>
        <div style={{ flex: 1, margin: '1rem'}}>
          <PyramidChart width={width}/>
        </div>
      </div>
    </Page>
  );
};

export default CardPage;
