export const mapStaticKeysLabels = {
  procenat_pojas_napred: {
    value: 'procenat_pojas_napred',
    label: 'Procenat pojas napred',
  },
  procenat_pojas_nazad: {
    value: 'procenat_pojas_nazad',
    label: 'Procenat pojas nazazd',
  },
  procenat_alkohol_dan: { value: 'procenat_alkohol_dan', label: 'Procenat alkohol dan' },
  procenat_alkohol_noc: { value: 'procenat_alkohol_noc', label: 'Procenat alkohol noc' },
  standarno_odstupanje_brzine_van_naselja: {
    value: 'standarno_odstupanje_brzine_van_naselja',
    label: 'Standardno odstupanje brzine van naselja',
  },
  procenat_prekoracenja_brzine_u_naselju: {
    value: 'procenat_prekoracenja_brzine_u_naselju',
    label: 'Procenat prekoracenja brzine unaselju',
  },
  procenat_prekoracenja_brzine_u_naselju_preko_10km_h: {
    value: 'procenat_prekoracenja_brzine_u_naselju_preko_10km_h',
    label: 'Procenat prekoracenja brzine u naselju preko 10km/h',
  },
  upotreba_dnevnih_svetala: {
    value: 'upotreba_dnevnih_svetala',
    label: 'Upotreba dnevnih svetala',
  },
};

export class Statistic {
  puid;
  policijskaUprava;
  region;
  tipStatistike;

  parseJSON(dto) {
    this.puid = dto.pu_id;
    this.policijskaUprava = dto.policijska_uprava;
    this.region = dto.region;
    this.tipStatistike = dto.tip_statistike;
  }
}

export class StatisticsEntites {
  data;

  parseJSON(dto) {
    this.data = dto.map(data => new Statistic(data));
  }
}
