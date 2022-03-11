export function it(message, cb) {
  try {
    cb();
    console.log(`PASSED: ${message}`);
  } catch (e) {
    console.log(`ERROR: ${message}`);
    console.error(e);
  }
}
