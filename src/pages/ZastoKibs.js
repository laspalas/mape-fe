import React from 'react';

import { getColor } from 'utils/colors';
import { randomNum } from 'utils/demos';

import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';

import Page from 'components/Page';

import MathJax from 'react-mathjax';


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



const ChartPage = () => {
  return (
    <Page title="" breadcrumbs={[{ name: 'Zasto KIBS', active: true }]}>
      <MathJax.Provider>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h3>Metodologija</h3>
              </CardHeader>
              <CardBody>
                <ol>
                  <li>
                    Selecting the appropriate indicators to combine them in an
                    index.
                  </li>
                  <li>Collecting the data on indicators.</li>
                  <li>Making of data analyses</li>
                  <li>Assigning the weights to each indicator</li>
                  <li>Aggregating the values of indicators.</li>
                  <li>Testing the robustness of the index</li>
                  <li>
                    Computing, evaluating and visualizing the scores of the
                    final index.
                  </li>
                </ol>
                <h5>Weighting method</h5>
                <h5>Aggregating indicators</h5>
                <h5>Index methodology</h5>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <MathJax.Node formula={first_formula} />
                    <MathJax.Node formula={second_formula} />
                    <MathJax.Node formula={third_formula} />
                    <MathJax.Node formula={forth_formula} />
                  </Col>
                  <Col>
                    <MathJax.Node formula={description_1} />
                    <MathJax.Node formula={description_2} />
                    <MathJax.Node formula={description_3} />
                    <MathJax.Node formula={description_4} />
                    <MathJax.Node formula={description_5} />
                    <MathJax.Node formula={description_6} />
                    <MathJax.Node formula={description_7} />
                    <MathJax.Node formula={description_8} />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </MathJax.Provider>
    </Page>
  );
};

export default ChartPage;
