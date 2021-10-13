import { initializeApp } from "firebase/app";
import { StreamDatapointModel } from "../models/stream_datepoint";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  orderBy,
} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZ7_3bd2CYP2FjWvxCNsNo8o4wy8V6F7Y",
  authDomain: "mediatunnel-325914.firebaseapp.com",
  databaseURL: "https://mediatunnel-325914-default-rtdb.firebaseio.com",
  projectId: "mediatunnel-325914",
  storageBucket: "mediatunnel-325914.appspot.com",
  messagingSenderId: "756529949727",
  appId: "1:756529949727:web:b180c3ddebaa46c52e792a",
  measurementId: "G-MLWZFWT6D9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

const db = getFirestore();

export async function filterByStreamId(streamId: string) {
  const q = query(
    collection(db, "streams"),
    where("streamId", "==", streamId),
    orderBy("timestamp")
  );

  const querySnapshot = await getDocs(q);
  const datapoints: StreamDatapointModel[] = [];
  querySnapshot.forEach((doc) => {
    datapoints.push(StreamDatapointModel.fromJson(doc.data()));
    console.log(doc.id, " => ", doc.data());
  });
  return datapoints;
}

export async function filterByUserId(userId: string) {
  const q = query(collection(db, "streams"), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  const datapoints: StreamDatapointModel[] = [];
  querySnapshot.forEach((doc) => {
    datapoints.push(StreamDatapointModel.fromJson(doc.data()));
    console.log(doc.id, " => ", doc.data());
  });
  return datapoints;
}
