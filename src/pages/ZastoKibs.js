import React from 'react';

import { getColor } from 'utils/colors';
import { randomNum } from 'utils/demos';

import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';

import Page from 'components/Page';

import MathJax from 'react-mathjax';
import slika from '../assets/img/products/product_640-4.jpg';
import { store } from '../thrd/store';

const first_formula = `KIBS_{j}=\\frac{max} {\\overline {w_{ij}}} \\sum\\nolimits_{i=1}^l= \\overline {r_{ij}} \\ \\overline {w_{ij}}`;
const second_formula = `\\sum_{i=1}^l \\overline {w_{ij}} = 1 `;
const third_formula = `\\leq\\frac{1} {l-1} \\sum_{i=1}^l ({l-1})\\overline {w_{ij}} = 1 \\geq`;
const forth_formula = `\\sum_{i=1}^l \\overline {w_{ij}} = 1 `;
const description_1 = `Gde\\ je:`;
const description_2 = `I\\ =\\ broj\\ indikatora`;
const description_3 = `\\overline {}\\ =ordered\\ value\\ (ponderisanje\\ operatora\\ po\\ utvrdjenom\\ redosledu)`;
const description_4 = `r\\ =\\ normalizovana\\ vrednost`;
const description_5 = `w\\ =\\ težina`;
const description_6 = `m\\ =\\ \\{alkolol,\\ brzina,\\ zaštitni sistem,\\ upotreba\\ dnevnih\\ svetala\\}`;
const description_7 = `L\\ =\\ donja\\ granica`;
const description_8 = `U\\ =\\ gornja\\ granica`;

const ChartPage = ({ model }) => {
  return (
    <Page title="" breadcrumbs={[{ name: 'Zasto KIBS', active: true }]}>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h3>Metodologija</h3>
            </CardHeader>
            <CardBody style={{ minHeight: '800px' }}>
              {model.metodologija}
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody
              style={{ padding: 0, minHeight: '864px', height: '864px' }}
            >
              <img width="100%" height="100%" src={model.model_slika}></img>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default store.connect(s => s)(ChartPage);
