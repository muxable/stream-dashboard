import { ModemModel } from "./modem";
import { DocumentData } from "@firebase/firestore";

export class StreamDatapointModel {
  readonly userId: string;
  readonly streamId: string;
  readonly modems: ModemModel[];
  readonly latitude: number;
  readonly longitude: number;
  readonly bitrate: number;
  readonly fps: number;
  readonly audioBitrate: number;
  readonly ping: number;
  readonly streamTitle: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly timestamp: Date;

  constructor(
    userId: string,
    streamId: string,
    modems: ModemModel[],
    latitude: number,
    longitude: number,
    bitrate: number,
    fps: number,
    audioBitrate: number,
    ping: number,
    streamTitle: string,
    startDate: Date,
    endDate: Date,
    timestamp: Date
  ) {
    this.userId = userId;
    this.streamId = streamId;
    this.modems = modems;
    this.latitude = latitude;
    this.longitude = longitude;
    this.bitrate = bitrate;
    this.fps = fps;
    this.audioBitrate = audioBitrate;
    this.ping = ping;
    this.streamTitle = streamTitle;
    this.startDate = startDate;
    this.endDate = endDate;
    this.timestamp = timestamp;
  }

  static fromJson(snapshot: DocumentData) {
    const modems = snapshot["modems"];
    const modemList = [];
    for (let i = 0; i < modems.length; i++) {
      modemList.push(ModemModel.fromJson(modems[i]));
    }
    return new StreamDatapointModel(
      snapshot.userId,
      snapshot.streamId,
      modemList,
      snapshot.latitude,
      snapshot.longitude,
      snapshot.bitrate,
      snapshot.fps,
      snapshot.audioBitrate,
      snapshot.ping,
      snapshot.streamTitle,
      snapshot.startDate,
      snapshot.endDate,
      snapshot.timestamp
    );
  }
}
