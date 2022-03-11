class Expect {
  constructor(value) {
    this._value = value;
  }

  toBeEqual(expected) {
    if (this._value !== expected) {
      throw new Error(
        `Existing value "${this._value}", is not equal expected value "${expected}"`
      );
    }

    return this;
  }
}

export function expect(value) {
  return new Expect(value);
}
