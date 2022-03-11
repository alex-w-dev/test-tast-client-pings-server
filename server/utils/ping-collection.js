export class PingCollection {
  // _propertyName as private in typescript ;-)
  static _collection = {};

  static addPing(ping) {
    ping = +ping;

    if (isNaN(ping)) return;

    if (!this._collection[ping]) {
      this._collection[ping] = 1;
    } else {
      this._collection[ping]++;
    }
  }

  static clear() {
    this._collection = {};
  }

  static getMedian() {
    const sortedKeys = Object.keys(this._collection)
      .map((ping) => +ping)
      .sort((a, b) => a - b);

    if (!sortedKeys.length) return 0;

    const cycleLimit = this._getTotalCount() / 2 - 1;

    let mLeft = sortedKeys[0];
    let mLeftCount = this._collection[sortedKeys[0]];
    let mRight = sortedKeys[sortedKeys.length - 1];
    let mRightCount = this._collection[sortedKeys[sortedKeys.length - 1]];

    for (let i = 0; i < cycleLimit; i++) {
      mLeftCount--;
      if (mLeftCount === 0) {
        const mLeftIndex = sortedKeys.indexOf(mLeft) + 1;
        mLeft = sortedKeys[mLeftIndex];
        mLeftCount = this._collection[mLeftIndex];
      }

      mRightCount--;
      if (mRightCount === 0) {
        const mRightIndex = sortedKeys.indexOf(mRight) - 1;
        mRight = sortedKeys[mRightIndex];
        mRightCount = this._collection[mRightIndex];
      }
    }

    return (mLeft + mRight) / 2;
  }

  static getMean() {
    const totalCount = this._getTotalCount();

    return (totalCount && this._getPingSum() / totalCount) || 0;
  }

  static _getPingSum() {
    return Object.entries(this._collection).reduce(
      (sum, [ping, count]) => (sum += ping * count),
      0
    );
  }
  static _getTotalCount() {
    return Object.values(this._collection).reduce(
      (sum, count) => (sum += count),
      0
    );
  }
}
