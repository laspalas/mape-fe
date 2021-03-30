import { Store } from 'simple-react-store'
import { appFirebase } from './firbase';

// Create store with empty state
const store = new Store({
  pracenje: {}
})

appFirebase.database().ref().get().then((res) => {
  store.setState(res.toJSON());
});

export { store };