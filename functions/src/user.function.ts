import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { deleteCollectionByReference } from './utils/firebase.function';

admin.initializeApp();
const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    return db.doc(`users/${user.uid}`).set({
      uid: user.uid,
      name: user.displayName,
      avatarURL: user.photoURL,
      email: user.email,
      createdAt: new Date(),
    });
  });

export const deleteUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete((user) => {
    return db.doc(`users/${user.uid}`).delete();
  });

export const deleteUserAccount = functions
  .region(`asia-northeast1`)
  .auth.user()
  .onDelete(async (user: any, _: any) => {
    const users = db.collection(`users`).where('uid', '==', user.uid);
    await deleteCollectionByReference(users);
    return;
  });
