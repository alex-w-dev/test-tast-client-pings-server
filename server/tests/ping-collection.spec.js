import { PingCollection } from "../utils/ping-collection.js";
import { expect } from "./utils/expect.js";
import { it } from "./utils/it.js";
import { describe } from "./utils/describe.js";

describe("different 4 pings", () => {
  PingCollection.clear();
  PingCollection.addPing(1);
  PingCollection.addPing(5);
  PingCollection.addPing(7);
  PingCollection.addPing(15);

  it("should correct mean", function () {
    expect(PingCollection.getMean()).toBeEqual(7);
  });
  it("should correct median", function () {
    expect(PingCollection.getMedian()).toBeEqual(6);
  });
});

describe("different 3 pings", () => {
  PingCollection.clear();
  PingCollection.addPing(5);
  PingCollection.addPing(8);
  PingCollection.addPing(14);

  it("should correct mean", function () {
    expect(PingCollection.getMean()).toBeEqual(9);
  });
  it("should correct median", function () {
    expect(PingCollection.getMedian()).toBeEqual(8);
  });
});

describe("difficult pings", () => {
  PingCollection.clear();
  PingCollection.addPing(5);
  PingCollection.addPing(5);
  PingCollection.addPing(5);
  PingCollection.addPing(14);
  PingCollection.addPing(14);
  PingCollection.addPing(14);
  PingCollection.addPing(14);
  PingCollection.addPing(8);
  PingCollection.addPing(8);

  it("should correct mean", function () {
    expect(Math.round(PingCollection.getMean())).toBeEqual(10);
  });
  it("should correct median", function () {
    expect(PingCollection.getMedian()).toBeEqual(8);
  });
});
