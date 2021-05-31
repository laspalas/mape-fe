import { omit } from 'lodash';
import data from '../assets/store.json';
import { SpearmanRHO } from './spermanBase';

const calc = (data, kibsArray) => {
  return data
    .map(combData => {
      const keyIndicator = combData.Indicators;
      const regionValues = omit(combData, ['Indicators']);
      const x = Object.keys(regionValues)
        .sort()
        .map(key => regionValues[key]);

      const spearmanRHO = new SpearmanRHO(x, Object.values(kibsArray));

      const spearmanValue = spearmanRHO.calc();

      return {
        Indicators: keyIndicator,
        spearmanValue,
      };
    })
    .sort((s1, s2) => s2.spearmanValue - s1.spearmanValue);
};

const caclulateSperman = () => {
  const data1 = data.result_2019.data;
  const dataKibs = data1.kibs;
  const kibsArray = Object.keys(dataKibs)
    .sort()
    .map(key => dataKibs[key]);
  return {
    Comb3: calc(data1['Comb3'], kibsArray),
    Comb4: calc(data1['Comb4'], kibsArray),
    Comb5: calc(data1['Comb5'], kibsArray),
  };
};

console.log(caclulateSperman());

export { caclulateSperman };
