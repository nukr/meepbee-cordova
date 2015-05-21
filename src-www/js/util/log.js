export default (str) => {
  // return () => {};
  return (...args) => {
    console.log(`[${str}]`, ...args);
  }
}

