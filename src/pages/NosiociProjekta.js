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
  CardHeader,
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
import { store } from '../thrd/store';

const NosiociProjekta = ({ nosioci }) => {
  const { width, height, ref } = useResizeDetector();
  return (
    <Page title="" breadcrumbs={[{ name: 'Nosioci projekta', active: true }]}>
      <div
        ref={ref}
        style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
      >
        <UserCard
          avatar={nosioci.milan_slika}
          title="Milan Tešić"
          subtitle="PhD College of Traffic Engineering"
          text="Info about Milan Tesic"
        />
        <UserCard
          avatar={nosioci.suzana_slika}
          title="Suzana Miladić-Tešić"
          subtitle="PhD College of Traffic Engineering"
          text="Info about Milan Tesic"
          style={{ marginLeft: '20px' }}
        />
        <UserCard
          avatar={nosioci.nikola_slika}
          style={{ marginLeft: '20px' }}
          title="Nikola Nonkovic"
          subtitle="BE Engineer"
          text="Info about Nikola Nonkovic"
        />
        <UserCard
          avatar={nosioci.luka_slika}
          style={{ marginLeft: '20px' }}
          title="Luka Jovanovic"
          subtitle="FE Engineer"
          text="Info about Luka Jovanovic"
        />
      </div>
      <div style={{ marginTop: '30px' }}>
        <Card>
          <CardHeader>
            <h4>Publikacije</h4>
          </CardHeader>
          <CardBody
            dangerouslySetInnerHTML={{ __html: nosioci.publikacije }}
            style={{ minHeight: '300px', wordBreak: 'breal-all' }}
          ></CardBody>
        </Card>
      </div>
    </Page>
  );
};

export default store.connect(s => s)(NosiociProjekta);
