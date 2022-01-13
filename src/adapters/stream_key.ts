import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  setDoc,
  doc
} from "@firebase/firestore";
import { StreamKeyModel, streamKeyModelConverter } from "../models/stream_key";
require("../firebaseSetup");

const db = getFirestore();

/**
 * @param userId the email address
 * @returns a list of string, stream keys, that belongs to the user
 */
export async function filterByUserId(userId: string) {
  const q = query(
    collection(db, "stream-key"),
    where("userId", "==", userId)
  ).withConverter(streamKeyModelConverter);

  const querySnapshot = await getDocs(q);
  const keyList: StreamKeyModel[] = [];
  querySnapshot.forEach((doc) => {
    keyList.push(doc.data());
    console.log(doc.id, " => ", doc.data());
  });
  return keyList;
}

/**
 * 
 * @param userId email address of user
 * @param streamKey the generated uuid from an external library
 */
export async function writeStreamKey(userId: string, streamKey: string) {
  await setDoc(doc(db, "stream-key", streamKey), {
    userId: userId,
    streamKey: streamKey,
    timestamp: new Date(),
  })
}
