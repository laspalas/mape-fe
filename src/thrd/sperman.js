import { omit } from 'lodash';
import { SpearmanRHO } from './spermanBase';

const calc = (data, kibsArray) => {
  const d = Object.values(data);
  return d
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

const caclulateSperman = (data) => {
  const dataKibs = data.kibs;
  const kibsArray = Object.keys(dataKibs)
    .sort()
    .map(key => dataKibs[key]);
  return {
    Comb3: calc(data['Comb3'], kibsArray),
    Comb4: calc(data['Comb4'], kibsArray),
    Comb5: calc(data['Comb5'], kibsArray),
  };
};

export { caclulateSperman };
