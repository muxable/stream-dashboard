import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  orderBy,
} from "@firebase/firestore";
import firebaseSetup from "../firebaseSetup";
import { StreamModel, streamModelConverter } from "../models/stream_sessions";

const app = firebaseSetup;

const db = getFirestore();
export async function filterByUserId(userId: string) {
  const q = query(
    collection(db, "stream-sessions"),
    where("userId", "==", userId)
  ).withConverter(streamModelConverter);

  const querySnapshot = await getDocs(q);
  const streamList: StreamModel[] = [];
  querySnapshot.forEach((doc) => {
    streamList.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });
  return streamList;
}
