export function write(prop, value) {
  setImmediate(() => localStorage.setItem(prop, value));
}
export function read(prop) {
  return new Promise(
    (resolve) => setImmediate(() => resolve(localStorage.getItem(prop))
  );
}
