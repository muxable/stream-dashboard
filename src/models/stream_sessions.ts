import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";

export class StreamModel {
  constructor(
    readonly userId: string,
    readonly streamId: string,
    readonly videoCodec: string,
    readonly audioCodec: string,
    readonly videoResolution: string,
    readonly server: string,
    readonly duration: number,
    readonly modemCount: number,
    readonly unstableEvents: number,
    readonly startDate: Date,
    readonly endDate: Date
  ) {}

  toJson() {
    return {
      userId: this.userId,
      streamId: this.streamId,
      videoCodec: this.videoCodec,
      audioCodec: this.audioCodec,
      videoResolution: this.videoResolution,
      server: this.server,
      duration: this.duration,
      modemCount: this.modemCount,
      unstableEvents: this.unstableEvents,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}

export const streamModelConverter = {
  toFirestore(model: StreamModel): DocumentData {
    return model.toJson();
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): StreamModel {
    const data = snapshot.data()!;
    return new StreamModel(
      data.userId,
      data.streamId,
      data.videoCodec,
      data.audioCodec,
      data.videoResolution,
      data.server,
      data.duration,
      data.modemCount,
      data.unstableEvents,
      data.startDate.toDate(),
      data.endDate.toDate()
    );
  },
};
