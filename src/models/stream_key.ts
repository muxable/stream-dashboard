import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";

export class StreamKeyModel {
  constructor(
    readonly userId: string,
    readonly streamKey: string,
    readonly timestamp: Date
  ) {}
}

export const streamKeyModelConverter = {
  toFirestore(model: StreamKeyModel): DocumentData {
    return model;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): StreamKeyModel {
    const data = snapshot.data()!;

    return new StreamKeyModel(
      data.userId,
      data.streamKey,
      data.timestamp.toDate()
    );
  },
};
