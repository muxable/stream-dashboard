export class ModemModel {
  readonly name: string;
  readonly temperature: number;
  readonly upstreamBandwidth: number;
  readonly downstreamBandwidth: number;
  readonly type: string;

  constructor(
    name: string,
    temperature: number,
    upstreamBandwidth: number,
    downstreamBandwidth: number,
    type: string
  ) {
    this.name = name;
    this.temperature = temperature;
    this.upstreamBandwidth = upstreamBandwidth;
    this.downstreamBandwidth = downstreamBandwidth;
    this.type = type;
  }

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

  static fromJson(snapshot: any) {
    return new ModemModel(
      snapshot.name,
      snapshot.temperature,
      snapshot.upstreamBandwidth,
      snapshot.downstreamBandwidth,
      snapshot.type
    );
  }
}
