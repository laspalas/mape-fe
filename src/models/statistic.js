export const mapStaticKeysLabels = {
  POJAS_NAPRED: {
    value: 'procenat_pojas_napred',
    label: 'Procenat pojas napred',
  },
  POJAS_NAZAD: {
    value: 'procenat_pojas_nazad',
    label: 'Procenat pojas nazazd',
  },
  ALKOHOL_DAN: { value: 'procenat_alkohol_dan', label: 'Procenat alkohol dan' },
  ALKOHOL_NOC: { value: 'procenat_alkohol_noc', label: 'Procenat alkohol noc' },
  ODSTUPANJE_VAN_NASELJA: {
    value: 'standarno_odstupanje_brzine_van_naselja',
    label: 'Standardno odstupanje brzine van naselja',
  },
  PREKORANJE_NASELJE: {
    value: 'procenat_prekoracenja_brzine_u_naselju',
    label: 'Procenat prekoracenja brzine unaselju',
  },
  PREKORANJE_10: {
    value: 'procenat_prekoracenja_brzine_u_naselju_preko_10km_h',
    label: 'Procenat prekoracenja brzine u naselju preko 10km/h',
  },
  DNEVNA_SVETLA: {
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
