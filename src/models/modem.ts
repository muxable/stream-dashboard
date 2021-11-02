import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";

export class ModemModel {
  constructor(
    readonly name: string,
    readonly temperature: number,
    readonly upstreamBandwidth: number,
    readonly downstreamBandwidth: number,
    readonly type: string
  ) {}

  toJson(): {
    name: string;
    temperature: number;
    upstreamBandwidth: number;
    downstreamBandwidth: number;
    type: string;
  } {
    return {
      name: this.name,
      temperature: this.temperature,
      upstreamBandwidth: this.upstreamBandwidth,
      downstreamBandwidth: this.downstreamBandwidth,
      type: this.type,
    };
  }

  static fromJson(snapshot: DocumentData) {
    return new ModemModel(
      snapshot.name,
      snapshot.temperature,
      snapshot.upstreamBandwidth,
      snapshot.downstreamBandwidth,
      snapshot.type
    );
  }
}

// not used at the moment
export const modemModelConverter = {
  toFirestore(modemModel: ModemModel): DocumentData {
    return modemModel.toJson();
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): ModemModel {
    const data = snapshot.data()!;
    return new ModemModel(
      data.name,
      data.temperature,
      data.upstreamBandwidth,
      data.downstreamBandwidth,
      data.type
    );
  },
};
