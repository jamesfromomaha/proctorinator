export default {
  write(prop, value) {
    setImmediate(() => localStorage.setItem(prop, value));
  },
  read(prop) {
    return new Promise(
      (resolve) => setImmediate(() => resolve(localStorage.getItem(prop))
    );
  },
};
