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

const NosiociProjekta = () => {
  const { width, height, ref } = useResizeDetector();
  return (
    <Page title="" breadcrumbs={[{ name: 'Nosioci projekta', active: true }]}>
      <div
        ref={ref}
        style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
      >
        <UserCard
          title="Suzana Tešić"
          subtitle="PhD College of Traffic Engineering"
          text="Info about Milan Tesic"
        />
        <UserCard
          style={{ marginLeft: '20px' }}
          title="Milan Tešić"
          subtitle="PhD College of Traffic Engineering"
          text="Info about Milan Tesic"
        />
        <UserCard
          style={{ marginLeft: '20px' }}
          title="Nikola Nonkovic"
          subtitle="BE Engineer"
          text="Info about Nikola Nonkovic"
        />
        <UserCard
          style={{ marginLeft: '20px' }}
          title="Luka Jovanovic"
          subtitle="FE Engineer"
          text="Info about Luka Jovanovic"
        />
      </div>
    </Page>
  );
};

export default NosiociProjekta;