import LS from './local_storage';
import Elapsed from './elapsed';

function upsert(prop, serialize) {
  return serialize ?
    function (value) {
      if (value !== this[prop] && !value?.eq(this[prop])) {
        this.modified = Date.now();
        LS.write(prop, (this[prop] = value)?.serialize());
      }
    } :
    function (value) {
      if (value !== this[prop]) {
        this.modified = Date.now();
        LS.write(prop, this[prop] = value);
      }
    };
}

export class State {
  _step = State.UPLOAD;
  _modified = Date.now();

  title = {
    get: function() { return this._title },
    set: upsert('_title'),
  }; _title;

  uploads = {
    get: function() { return this._uploads },
  }; _uploads;

  times = {
    get: function() { return this._started },
    set: upsert('_times', serialize_times),
  }; _times;

  signature = {
    get: function() { return this._signature },
    set: upsert('_signature'),
  }; _signature;

  docx = {
    get: function() { return this._docx },
    set: upsert('_docx'),
  }; _docx;

  pdf = {
    get: function() { return this._pdf },
    set: upsert('_pdf'),
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
State.UPLOAD = 1;
State.SIGN = 2;
State.EXPORT = 3;

