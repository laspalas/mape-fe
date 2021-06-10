import axios from 'axios';
import { appFirebase } from '../thrd/firbase';

export const getMeta = worksheet => {
  const headers = worksheet
    .getRow(1)
    .values.filter(l => typeof l === 'number' || typeof l === 'string');
  const lower_limit = worksheet
    .getRow(2)
    .values.filter(l => typeof l === 'number' || typeof l === 'string')
    .slice(1);
  const upper_limit = worksheet
    .getRow(3)
    .values.filter(l => typeof l === 'number' || typeof l === 'string')
    .slice(1);
  const puId = worksheet
    .getColumn(1)
    .values.filter(l => typeof l === 'number' || typeof l === 'string')
    .slice(2);

  console.log(puId);

  return {
    parametersOrder: headers.map(h => ({ value: h, label: h })),
    lower_limit: lower_limit.map(l => +l),
    upper_limit: upper_limit.map(l => +l),
    mapRegionIndexToPuId: puId.reduce((acc, id, index) => {
      return {
        ...acc,
        [id]: `Region ${index}`,
      };
    }, {}),
  };
};

export const getData = worksheet => {
  const rowsCount = worksheet.rowCount;
  const data = [];
  for (let i = 4; i <= rowsCount; i++) {
    data.push(
      worksheet
        .getRow(i)
        .values.filter(l => typeof l === 'number' || typeof l === 'string')
        .slice(1).map(d => +d)
    );
  }
  return data;
};

export const fetchData = (req) => {
  return axios.post('http://localhost:7000/calculate',  req).then(res => {
    return Promise.resolve(res.data);
  });
} 
