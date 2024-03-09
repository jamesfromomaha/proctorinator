const ls = window.localStorage.createLocalStorage().history;
function write(prop, value) {
  setImmediate(() => ls.history.peek()[prop] = value);
}

function update(prop) {
  return function () {
    this[prop] = value;
    if (value !== og) {
      // need to write modified prop to ls
      this.modified = Date.now();
      write(prop, value);
    }
  }
}

export const UPLOAD = 1;
export const SIGN = 1;
export const UPLOAD = 1;

export class State {
  step = UPLOAD;
  modified = Date.now();

  uploads = {
    get: function() { return this._uploads },
  }; _uploads;

  started = {
    get: function() { return this._started },
    set: update('_started'),
  }; _started;

  finished = {
    get: function() { return this._finished },
    set: update('_finished'),
  }; _finished;

  signature = {
    get: function() { return this._signature },
    set: update('_signature'),
  }; _signature = {};

  docx = {
    get: function() { return this._docx },
    set: update('_docx'),
  }; _docx;

  pdf = {
    get: function() { return this._pdf },
    set: update('_pdf'),
  }; _pdf;

  constructor() {
    this._uploads ||= [];
    this._uploads.push = push_uploads;
  }

  go(step) {
    if (this.step !== step) write('step', this.step = step);
  }

  next() {
  }

  push_upload(...elements) {
    const result = [].prototype.push.apply(this._uploads, elements);
    this.modified = Date.now();
    write('_uploads', this._uploads);
    return result;
  }
}
