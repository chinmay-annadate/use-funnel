import { FunnelInput } from "./funnel_input";

export class FunnelDataConverter {
  data: FunnelInput[];
  maxOrignalValue: number;
  maxValue: number;

  constructor(data: FunnelInput[]) {
    this.data = data;
    this.maxOrignalValue = Math.max(...data.map((item) => item.value));

    this.compensateValues();
    this.maxValue = Math.max(...data.map((item) => item.value));
    this.processData();
  }

  private compensateValues() {
    for (let i = 0; i < this.data.length - 1; i++) {
      if (this.data[i].value < this.data[i + 1].value) {
        if (i > 0) {
          this.data[i].value = Math.ceil(
            (this.data[i - 1].value + this.data[i + 1].value) / 2,
          );
        }
      }
    }
  }

  private constructPolygon(index: number) {
    const thisItem = this.data[index];
    const nextItem = this.data[index + 1];

    const thisPortion = (thisItem.value / this.maxValue) * 100;
    const nextPortion = nextItem
      ? (nextItem.value / this.maxValue) * 100
      : thisPortion;

    const leftOffset = (100 - thisPortion) / 2;
    const rightOffset = (100 - nextPortion) / 2;

    const topLeft = leftOffset;
    const topRight = rightOffset;
    const bottomRight = rightOffset + nextPortion;
    const bottomLeft = leftOffset + thisPortion;

    return `polygon(
      0 ${topLeft}%,
      100% ${topRight}%,
      100% ${bottomRight}%,
      0 ${bottomLeft}%
    )`;
  }

  private constructPartialPolygon(index: number) {
    const thisItem = this.data[index];
    const nextItem = this.data[index + 1];

    const thisPortion = (thisItem.value / this.maxValue) * 100;
    const nextPortion = nextItem
      ? (nextItem.value / this.maxValue) * 100
      : thisPortion;

    const leftOffset = (100 - thisPortion) / 2;
    const rightOffset = (100 - nextPortion) / 2;

    const originalThisPortion =
      (thisPortion / thisItem.value) * thisItem.originalValue;

    const topLeft = 100 - originalThisPortion - leftOffset;
    const topRight = 100 - originalThisPortion - rightOffset;
    const bottomRight = rightOffset + nextPortion;
    const bottomLeft = leftOffset + thisPortion;

    return `polygon(
      0 ${topLeft}%,
      100% ${topRight}%,
      100% ${bottomRight}%,
      0 ${bottomLeft}%
    )`;
  }

  private assignRelativePercentages() {
    this.data = this.data.map((item) => {
      return new FunnelInput({
        ...item,
        relativePercentage: (100 / this.maxValue) * item.value,
      });
    });
  }

  private constructPolygons() {
    this.data = this.data.map((item, index) => {
      const polygon = this.constructPolygon(index);

      return new FunnelInput({
        ...item,
        polygon,
        originalPolygon: item.isCompensated()
          ? this.constructPartialPolygon(index)
          : polygon,
      });
    });
  }

  private processData() {
    this.assignRelativePercentages();
    this.constructPolygons();
  }
}