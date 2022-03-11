import http from "http";
import { simulateServerCraziness } from "./utils/simulate-request-craziness.js";
import { requestBodyParser } from "./utils/request-body-parser.js";
import { PingCollection } from "./utils/ping-collection.js";

const server = http.createServer(async (req, res) => {
  try {
    await simulateServerCraziness();

    if (req.url === "/data" && req.method === "POST") {
      await requestBodyParser(req);

      console.log(req.body);
      PingCollection.addPing(req.body.responseTime);

      res.writeHead(200);
      res.end("OK");
    } else {
      res.writeHead(404);
      res.end("Route not found");
    }
  } catch (e) {
    res.writeHead(500);
    console.log(e, "e");
    res.end();
  }
});
server.listen(8080);

process.on("exit", () => {
  console.group(`Ping results:`);
  console.info(`Median: ${Math.round(PingCollection.getMedian() * 10) / 10}`);
  console.info(`Mean: ${Math.round(PingCollection.getMean() * 10) / 10}`);
  console.groupEnd();
});
process.on("SIGINT", () => {
  process.exit(1);
});
