export class FunnelInput {
  value: number;
  relativePercentage: number;
  polygon: string;

  originalValue: number;
  originalPolygon: string;

  constructor(params: Partial<FunnelInput>) {
    this.value = params?.value ?? 0;
    this.relativePercentage = params?.relativePercentage ?? 0;
    this.polygon = params?.polygon ?? "";

    this.originalValue = params?.originalValue ?? this.value;
    this.originalPolygon = params?.originalPolygon ?? this.polygon;
  }

  isCompensated() {
    return this.originalValue !== this.value;
  }
}
