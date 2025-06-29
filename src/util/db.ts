import { auth, db } from '../config/firebase.ts';
import { collection, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';
import { LogBook, LogEntry } from '../models/entry.ts';

const COLLECTION_NAME = 'logbook';

const userData = () => ({
  uid: auth.currentUser?.uid || '',
  name: auth.currentUser?.displayName || '',
  email: auth.currentUser?.email || '',
});

const empty = (): LogBook => ({
  entriesByDay: {},
  goals: [],
  targets: [],
  motivation: '',
  user: userData(),
});

export const fetchFromDb = async (uid: string) => {
  const docRef = doc(collection(db, COLLECTION_NAME), uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...empty(), ...(docSnap.data() as LogBook) };
  } else {
    return empty();
  }
};

export const setEntryData = async (
  uid: string,
  dateKey: string,
  entry: Partial<LogEntry>
) => {
  const docRef = doc(collection(db, COLLECTION_NAME), uid);
  await setDoc(docRef, { entriesByDay: { [dateKey]: entry } }, { merge: true });
  return (prev: LogBook | null): LogBook => ({
    ...(prev || empty()),
    entriesByDay: { ...(prev || {}).entriesByDay, [dateKey]: entry },
  });
};

export const setData = async (uid: string, data: Partial<LogBook>) => {
  const docRef = doc(collection(db, COLLECTION_NAME), uid);
  data = { ...data, user: userData() };
  await setDoc(docRef, data, { merge: true });
  return (prev: LogBook | null): LogBook => ({
    ...(prev || empty()),
    ...data,
  });
};

export const fetchAllUsers = async () => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map((doc) => doc.data().user);
};
