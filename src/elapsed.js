import LS from './local_storage';

export default class Elapsed {
  uid;
  list;
  _name;

  constructor(name, data) {
    this._name = name;
    this.deserialize(data);
  }

  add(span) {
    this.uid = span.uid = Date.now();
    this.list.push(span);
    this.save();
    return this.uid;
  }

  update({ uid, start, end }) {
    const span = this.list.find((el) => el.uid === uid);
    if (!span) throw `No span has the uid ${uid}`;
    if (span.start !== start || span.end !== end) {
      this.uid = Date.now();
      span.start = start;
      span.end = end;
      this.save();
    }
  }

  remove(uid) {
    const index = this.list.findIndex((el) => el.uid === uid);
    if (!span) throw `No span has the uid ${uid}`;
    this.uid = Date.now();
    this.list.splice(index, 1);
    this.save();
  }

  save() {
    LS.write(this.name, this.serialize());
  }

  serialize() {
    return JSON.stringify(this.list.map(function ({start, stop}) {
      return { start: start?.getTime(), stop: stop?.getTime() };
    });
  }

  deserialize(data) {
    this.list = JSON.parse(data)?.map(function ({start, stop}) {
      return {
        uid: Date.now(),
        start: start && new Date(start),
        stop: stop && new Date(stop),
      };
    }) || [];
    this.uid = Date.now();
  }
}
