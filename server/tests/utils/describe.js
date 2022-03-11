export function describe(message, cb) {
  console.group(message);
  try {
    cb();
  } catch (e) {
    console.error(e);
  }
  console.groupEnd();
}
