import Page from 'components/Page';

import React from 'react';
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
      <div
        ref={ref}
        style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
      >
        <div style={{ flex: 1, margin: '1rem' }}>
          <PyramidChart width={width} height={700}/>
        </div>
      </div>
    </Page>
  );
};

export default CardPage;
