import { ModemModel } from "./modem";
import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";

export class StreamDatapointModel {
  constructor(
    readonly userId: string,
    readonly streamId: string,
    readonly modems: ModemModel[],
    readonly latitude: number,
    readonly longitude: number,
    readonly bitrate: number,
    readonly fps: number,
    readonly audioBitrate: number,
    readonly ping: number,
    readonly streamTitle: string,
    readonly startDate: Date,
    readonly endDate: Date,
    readonly timestamp: Date
  ) {}
}

export const streamDatapointModelConverter = {
  toFirestore(model: StreamDatapointModel): DocumentData {
    return model;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): StreamDatapointModel {
    const data = snapshot.data()!;
    const modems = data.modems;
    const modemList = [];
    for (let i = 0; i < modems.length; i++) {
      modemList.push(ModemModel.fromJson(modems[i]));
    }
    return new StreamDatapointModel(
      data.userId,
      data.streamId,
      modemList,
      data.latitude,
      data.longitude,
      data.bitrate,
      data.fps,
      data.audioBitrate,
      data.ping,
      data.streamTitle,
      data.startDate,
      data.endDate,
      data.timestamp
    );
  },
};
