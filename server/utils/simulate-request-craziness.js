export async function simulateServerCraziness() {
  const randomNumber = Math.random();

  if (randomNumber < 0.2) {
    throw new Error(`Hi! I'm Error! Wabi Babl!`);
  } else if (randomNumber < 0.4) {
    // infinity waiting
    await new Promise(() => null);
  }
}
