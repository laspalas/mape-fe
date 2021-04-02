import { Store } from 'simple-react-store';
import { appFirebase } from './firbase';

// Create store with empty state
const store = new Store({
  pracenje: {},
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
  }
});

appFirebase
  .database()
  .ref()
  .get()
  .then(res => {
    store.setState(res.toJSON());
  });

export { store };
