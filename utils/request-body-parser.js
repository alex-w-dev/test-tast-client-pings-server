import stream from "stream";

export async function requestBodyParser(req) {
  if (!(req instanceof stream.Readable)) return;

  req.body = {};

  try {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();

    req.body = JSON.parse(data);
  } catch (e) {
    //
  }
}
