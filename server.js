import http from 'http';
import { simulateServerCraziness } from './utils/simulate-request-craziness.js';
import { requestBodyParser } from './utils/request-body-parser.js';
import {PingCollection} from './utils/ping-collection.js';

const server = http.createServer(async (req, res) => {
  try {
    await simulateServerCraziness();

    if (req.url === "/data" && req.method === "POST") {
      await requestBodyParser(req);

      console.log(req.body);

      res.writeHead(200);
      res.end("OK");
    } else {
      res.writeHead(404);
      res.end("Route not found");
    }
  } catch (e) {
    res.writeHead(500);
    console.log(e, 'e');
    res.end();
  }
});
server.listen(8080);


process.on('exit', () => {
  console.group(`Ping results:`)
  console.info(`Median: ${PingCollection.getMedian()}`)
  console.info(`Mean: ${PingCollection.getMean()}`)
  console.groupEnd();
})
process.on('SIGINT', () => {
  process.exit(1);
})
