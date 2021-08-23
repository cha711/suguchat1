import _firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

if (!_firebase.apps.length) {
  _firebase.initializeApp({
    apiKey: 'AIzaSyALArbLWA5p_3M6mlSdy-hBwjCsrx0OH3Y',
    authDomain: 'dddd-327c8.firebaseapp.com',
    databaseURL: 'https://dddd-327c8-default-rtdb.firebaseio.com',
    projectId: 'dddd-327c8',
    storageBucket: 'dddd-327c8.appspot.com',
    messagingSenderId: '565306433120',
    appId: '1:565306433120:web:dab08cb322ccd7d6f5ad05',
    measurementId: 'G-Y52ELPZMZW',
  });
}

export const firebase = _firebase;

export const db = firebase.database();

export const getUid = async (): Promise<string> => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(async () => {
      const uid = await firebase.auth().currentUser?.uid;
      if (uid != null) {
        resolve(uid);
        return;
      }
      await firebase.auth().signInAnonymously();
      resolve(firebase.auth().currentUser?.uid as string);
    });
  });
};

export const create_dm_id = async (id: string): Promise<string> => {
  const uid = await getUid();
  if (uid < id) {
    return uid + '@' + id;
  }

  return id + '@' + uid;
};
