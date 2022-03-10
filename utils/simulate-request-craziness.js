export async function simulateServerCraziness() {
  const randomNumber = Math.random();

  if (randomNumber < .2) {
    throw new Error(`Hi! I'm Error! Wabi Babl!`);
  } else if (randomNumber < .4) {
    // infinity waiting
    await new Promise(() => null)
  }
}
