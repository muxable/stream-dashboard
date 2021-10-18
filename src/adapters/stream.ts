import {
  StreamDatapointModel,
  streamDatapointModelConverter,
} from "../models/stream_datepoint";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  orderBy,
} from "@firebase/firestore";

const db = getFirestore();

export async function filterByStreamId(streamId: string) {
  const q = query(
    collection(db, "streams"),
    where("streamId", "==", streamId),
    orderBy("timestamp")
  ).withConverter(streamDatapointModelConverter);

  const querySnapshot = await getDocs(q);
  const datapoints: StreamDatapointModel[] = [];
  querySnapshot.forEach((doc) => {
    datapoints.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });
  return datapoints;
}

export async function filterByUserId(userId: string) {
  const q = query(
    collection(db, "streams"),
    where("userId", "==", userId)
  ).withConverter(streamDatapointModelConverter);

  const querySnapshot = await getDocs(q);
  const datapoints: StreamDatapointModel[] = [];
  querySnapshot.forEach((doc) => {
    datapoints.push(doc.data());
  });
  return datapoints;
}
