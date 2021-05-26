import { Store } from 'simple-react-store';
import { appFirebase } from './firbase';
import storeJSON from '../assets/store.json';

// Create store with empty state
const store = new Store({
  pracenje: {},
  godine: [],
  sezone: [],
  osnovne: {
    oblast_text: '',
    oblast_slika: '',
    predmet_text: '',
    predmet_slika: '',
    rezultat_text: '',
    rezultat_slika: '',
    svrha: '',
  },
  zasto: {
    def: '',
    vaznost: '',
    ocena: '',
    slika: '',
  },
  model: {
    metodologija: '',
    model_slika: '',
  },
  nosioci: {
    luka_slika: '',
    milan_slika: '',
    suzana_slika: '',
    nikola_slika: '',
    publikacije: '',
    luka: {
      ln: '',
      twitter: '',
      rg: '',
    },
    nikola: {
      ln: '',
      twitter: '',
      rg: '',
    },
    suzana: {
      ln: '',
      twitter: '',
      rg: '',
    },
    milan: {
      ln: '',
      twitter: '',
      rg: '',
    },
  },
});

// appFirebase
//   .database()
//   .ref()
//   .get()
//   .then(res => {
//     store.setState(res.toJSON());
//     console.log(store);
//   });
store.setState(storeJSON);

export { store };
