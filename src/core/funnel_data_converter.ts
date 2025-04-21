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
            (this.data[i - 1].value + this.data[i + 1].value) / 2
          );
        }
      }
    }
  }

  private constructPolygon(index: number, original: boolean) {
    let nextItem, thisItem, rightTop, leftTop;
    if (index < this.data.length - 1) {
      nextItem = this.data[index + 1];
      thisItem = this.data[index];

      rightTop =
        (100 -
          (original
            ? nextItem.orignalRelativePercentage
            : nextItem.relativePercentage)) /
        2;
      leftTop =
        (100 -
          (original
            ? thisItem.orignalRelativePercentage
            : thisItem.relativePercentage)) /
        2;
      return `polygon(
              0 ${leftTop}%,
              100% ${rightTop}%,
              100% ${
                rightTop +
                (original
                  ? nextItem.orignalRelativePercentage
                  : nextItem.relativePercentage)
              }%,
              0 ${
                leftTop +
                (original
                  ? thisItem.orignalRelativePercentage
                  : thisItem.relativePercentage)
              }%
            )`;
    } else {
      thisItem = this.data[index];
      leftTop =
        (100 -
          (original
            ? thisItem.orignalRelativePercentage
            : thisItem.relativePercentage)) /
        2;
      return `polygon(
                  0 ${leftTop}%,
                  100% ${leftTop}%,
                  100% ${
                    leftTop +
                    (original
                      ? thisItem.orignalRelativePercentage
                      : thisItem.relativePercentage)
                  }%,
                  0 ${
                    leftTop +
                    (original
                      ? thisItem.orignalRelativePercentage
                      : thisItem.relativePercentage)
                  }%
                )`;
    }
  }

  private assignRelativePercentages() {
    this.data = this.data.map((item) => {
      return new FunnelInput({
        ...item,
        relativePercentage: (100 / this.maxValue) * item.value,
        orignalRelativePercentage:
          (100 / this.maxOrignalValue) * item.originalValue,
      });
    });
  }

  private constructPolygons() {
    this.data = this.data.map((item, index) => {
      return new FunnelInput({
        ...item,
        polygon: this.constructPolygon(index, false),
        originalPolygon: this.constructPolygon(index, true),
      });
    });
  }

  private processData() {
    this.assignRelativePercentages();
    this.constructPolygons();
  }
}
