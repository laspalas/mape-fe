import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyAZvxgyS5P3Q2nQLHrRAtB7mmGR06jLs1w',
  authDomain: 'mape-b8720.firebaseapp.com',
  databaseURL: 'https://mape-b8720-default-rtdb.firebaseio.com',
  projectId: 'mape-b8720',
  storageBucket: 'mape-b8720.appspot.com',
  messagingSenderId: '989717855099',
  appId: '1:989717855099:web:95593e7c8f8308977c1bde',
};
// Initialize Firebase
const appFirebase = firebase.initializeApp(firebaseConfig);

export { appFirebase };
